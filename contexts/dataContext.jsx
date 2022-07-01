import axios from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, useState, useContext, useEffect } from 'react'

import { TransactionContext } from './transactionContext';


export const DataContext = createContext();

export const defaultFormData = {
    origin: '',
    vaultName: '',
    type: '',
    description: '',
    tokenName: '',
    creator: '',
    numOfTokens: 0,
    managementFees: 0,
    votingPeriod: 0,
    quorum: 0,
    minFavor: 0,
    nftsImported: [""],
    nftsPurchased: [""],
    target: 0,
    fundraiseDuration: 0,
    myContribution: 0,
    amount: 0,
}

export const DataContextProvider = ({ children }) => {

    const { currentAccount, setIsLoading, sendTx } = useContext(TransactionContext);
    const router = useRouter();

    const [formData, setFormData] = useState(defaultFormData)
    const [vaults, setVaults] = useState([]);
    const [vaultModal, setVaultModal] = useState(false);
    const [vaultLink, setVaultLink] = useState("")
    // console.log('FormData : ', formData);

    const handleChange = (e, name) => {
        setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    const getVaultsByWallet = async () => {
        if (!currentAccount) { return }
        setVaults([])

        const data = JSON.stringify({
            "walletAddress": currentAccount
        });
        const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/get`, data, {
            headers: {
                'content-Type': 'application/json',
            },
        }
        );


        response.data.Items.forEach((element) => {
            // console.log(element);
            let d = {}
            for (let i in element) {
                d[i] = Object.values(element[i])[0]
            }

            setVaults(prev => [...prev, d]);
        })

    }
    console.log(vaults);

    const deploySafe = async () => {
        try {
            setIsLoading(true);
            // const address = "0x67407721B109232BfF825F186c8066045cFefe7F"
            console.log("Deploying Safe");
            const vaultData = await axios.get(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults/createsafe`);
            console.log("Deployed safe address:", vaultData.data.address)
            const address = vaultData.data.address;
            return address;
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleCreateVault = async (values, address) => {
        try {
            setIsLoading(true);
            console.log("FormData", values);
            if (values.myContribution > 0) {

                const tx = await sendTx(address, values.myContribution);
                console.log("Transaction reciept", tx);
                if (!tx) {
                    alert("Please complete the transaction");
                    return;
                }
            }

            const contractAddress = await axios.get(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/contract`, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log("Contract Address:", contractAddress.data);

            const data = JSON.stringify({
                "vaultAddress": address,
                "vaultStatus": 1,
                "contractAddress": contractAddress.data,
                "origin": values.origin,
                "vaultName": values.vaultName,
                "type": values.type,
                "description": values.description,
                "tokenName": values.tokenName,
                "numOfTokens": values.numOfTokens,
                "managementFees": values.managementFees,
                "votingPeriod": values.votingPeriod,
                "quorum": values.quorum,
                "minFavor": values.minFavor,
                "nftsImported": values.nftsImported,
                "nftsPurchased": values.nftsPurchased,
                "target": values.target,
                "fundraiseDuration": values.fundraiseDuration,
                "amount": values.myContribution,
                "creator": currentAccount
            })

            const data2 = JSON.stringify({
                "walletAddress": currentAccount,
                "amountPledged": 20,
                "timestamp": new Date().getTime(),
                "transactions": [""],
                "vaultAddress": address,
                "vaultName": values.vaultName,
                "target": values.target,
                "vaultStatus": 1
            });

            console.log("aws res 1:", data);
            console.log("aws res 2:", data2);

            const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            const response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                headers: {
                    'content-Type': 'application/json',
                },
            });



            console.log("aws res 1:", response);
            console.log("aws res 2:", response2);
            router.push({
                pathname: `/vaults/${address}`,
                query: { user: currentAccount },
            })

            await getVaultsByWallet();
            setFormData(defaultFormData)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getVaultsByWallet();
    }, [currentAccount])


    return (
        <DataContext.Provider value={{ formData, setFormData, handleChange, vaults, getVaultsByWallet, handleCreateVault, deploySafe }}>
            {children}
        </DataContext.Provider>
    )
}