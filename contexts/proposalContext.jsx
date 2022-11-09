import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Component, useContext, useState } from 'react'
import { ProposalValues } from '../pages/create-proposal'
import { TransactionContext } from './transactionContext'



export const defaultProposalData = {
    origin: "",
    toToken: {},
    fromToken: {},
    toChain: "",
    fromChain: "",
    listingPrice: 0,
    listingExpireAt: 0,
    listingCreatedAt: 0,
    transferTo: "",
    owner: "",
    nfts: [""],
}

export const ProposalContext = React.createContext({})

export const ProposalContextProvider = ({ children }) => {
    const router = useRouter();

    const { currentAccount } = useContext(TransactionContext);

    const [proposals, setProposals] = useState([])
    const [proposalData, setProposalData] = useState(defaultProposalData)


    // console.log({ proposalData });

    const handleChangePropsal = (e, name) => {
        setProposalData(prevState => ({ ...prevState, [name]: e.target.value }))
    }


    const getVaultData = async (vaultAddress) => {

        let data = {}

        const body = JSON.stringify({
            "vaultAddress": vaultAddress
        })
        // const response = {}
        const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/get`, body, {
            headers: {
                'content-Type': 'application/json',
            },
        });

        response.data.Items?.forEach((element) => {

            for (let i in element) {
                data[i] = Object.values(element[i])[0]
            }
        })

        return data;
    }

    const getVaultsByWallet = async () => {
        if (!currentAccount) { return }

        try {
            setProposals([])

            const options = {
                method: 'POST',
                url: 'https://2phfi2xsn5.execute-api.ap-south-1.amazonaws.com/dev/api/associations/getbyuser',
                data: { address: currentAccount }
            };

            const response = await axios.request(options)

            console.log("response now", response.data.Items);
            response.data.Items?.forEach((element) => {
                // console.log(element);
                let d = {}
                for (let i in element) {
                    d[i] = Object.values(element[i])[0]
                }

                setProposals((prev) => [...prev, element]);
            })

        } catch (error) {
            console.error(error); toast.error(error);
        }
    }

    const handleCreateProposal = async (values, id, vault) => {
        try {

            console.log("FormData", values);

            const vaultData = await getVaultData(vault);

            const data = JSON.stringify({
                "id": vault + "-" + id,
                "origin": values.origin,
                "toToken": values.toToken,
                "fromToken": values.fromToken,
                "toChain": values.toChain,
                "fromChain": values.fromChain,
                "listingPrice": values.listingPrice,
                "listingExpireAt": values.listingExpireAt,
                "listingCreatedAt": new Date().getTime(),
                "transferTo": values.transferTo,
                "owner": values.owner,
                "nfts": values.nfts,
                "vaultName": vaultData.vaultName,
                "creator": vaultData.creator,
                "vaultAddress": vault,
                "managementFees": vaultData.managementFees,
            });

            const response = await axios.post(`https://lxw5w0see5.execute-api.ap-south-1.amazonaws.com/dev/api/proposals/add`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });


            console.log("aws res proposal:", response, data);

            router.push({
                pathname: `/proposals/${vault + "-" + id}`,
                query: { user: currentAccount, type: "new" },
            })

            await getVaultsByWallet();

            setProposalData(defaultProposalData)
        } catch (error) {
            console.error(error); toast.error(error);
        }
    }

    return (
        <ProposalContext.Provider value={{ proposalData, setProposalData, handleChangePropsal, handleCreateProposal, getVaultData }}>
            {children}
        </ProposalContext.Provider>
    )
}