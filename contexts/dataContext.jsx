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
    nfts: [""],
    target: 0,
    fundraiseDuration: 0,
    fundraiseCreatedAt: 0,
    myContribution: 0,
    amount: 0,
    email: '',
    minApproval: 0,
    commiteeMembers: [""],
}



export const DataContextProvider = ({ children }) => {

    const { currentAccount, setIsLoading, sendTx } = useContext(TransactionContext);
    const router = useRouter();

    const [formData, setFormData] = useState(defaultFormData)
    const [vaults, setVaults] = useState([]);
    const [vaultModal, setVaultModal] = useState(false);
    const [vaultLink, setVaultLink] = useState("")
    const [creatorVaults, setCreatorVaults] = useState([]);
    const [liveVaults, setLiveVaults] = useState([]);
    // console.log('FormData : ', formData);

    const handleChange = (e, name) => {
        setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    const getVaultsByWallet = async () => {
        if (!currentAccount) { return }

        try {
            setIsLoading(true);
            setVaults([])

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

                setVaults(prev => [...prev, element]);
            })

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    // console.log(vaults);

    const getVaultsByCreator = async () => {
        if (!currentAccount) { return }

        try {

            setCreatorVaults([])

            const data = JSON.stringify({
                "creator": currentAccount
            });
            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/getbycreator`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );

            console.log("response creator vault", response, data);
            response.data.Items?.forEach((element) => {
                // console.log(element);
                let d = {}
                for (let i in element) {
                    d[i] = Object.values(element[i])[0]
                }

                setCreatorVaults(prev => [...prev, d]);
            })

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }

    const deploySafe = async () => {
        try {
            setIsLoading(true);
            // return "0x67407721B109232BfF825F186c8066045cFefe7F"
            // const address = "0x67407721B109232BfF825F186c8066045cFefe7F"
            // const address = "0x1e5A80704a2130A47866A350cEc9D71fAe2E9439"
            console.log("Deploying Safe");
            const vaultData = await axios.get(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/getsafe`);

            console.log("Deployed safe address:", vaultData.data.address)
            const address = vaultData.data.address;
            return address;

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }
    const deployContract = async (tokenName, tokenSymbol, endtime) => {
        try {
            setIsLoading(true);
            // return "0x67407721B109232BfF825F186c8066045cFefe7F"
            // const address = "0x67407721B109232BfF825F186c8066045cFefe7F"
            // const address = "0x1e5A80704a2130A47866A350cEc9D71fAe2E9439"

            const data = JSON.stringify({
                "tokenName": tokenName,
                "tokenSymbol": tokenSymbol,
                "endtime": endtime
            });

            const config = {
                method: 'post',
                url: 'https://360gdsymqf.execute-api.ap-south-1.amazonaws.com/dev/api/contract/get',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            console.log("Deploying Contract");
            const res = await axios(config)

            console.log("Deployed Contract address:", res, data)
            
            return res.data;

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
            let tx;
            if (values.myContribution > 0) {

                tx = await sendTx(address, values.myContribution);
                console.log("Transaction reciept", tx);
                if (!tx) {
                    alert("Please complete the transaction");
                    return;
                }
            }

            // const contractAddress = "0x07ae982eB736D11633729BA47D9F8Ab513caE3Fd";
            const contractAddress = await deployContract(values.tokenName, values.tokenName, values.fundraiseDuration);
            console.log("Contract Address:", contractAddress);

            const data = JSON.stringify({
                "vaultAddress": address,
                "vaultStatus": "RUNNING",
                "contractAddress": contractAddress,
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
                "nfts": values.nfts,
                "target": values.target,
                "fundraiseDuration": values.fundraiseDuration,
                "fundraiseCreatedAt": new Date().getTime(),
                "amount": values.myContribution,
                "creator": currentAccount,
                "email": values.email,
                "commiteeMembers": values.commiteeMembers,
                "minApproval": values.minApproval,
            })

            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/put`, data, {
                // const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            let response2, data2;
            if (values.myContribution > 0) {

                data2 = JSON.stringify({
                    "walletAddress": currentAccount,
                    "amountPledged": values.myContribution,
                    "timestamp": new Date().getTime(),
                    "transactionHash": tx.hash,
                    "vaultAddress": address,
                    "vaultName": values.vaultName,
                    "target": values.target,
                    "vaultStatus": "RUNNING",
                });

                response2 = await axios.post(`https://2phfi2xsn5.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                    // response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                    headers: {
                        'content-Type': 'application/json',
                    },
                });
            }

            console.log("aws res 1:", response, data);
            console.log("aws res 2:", response2, data2);
            
            router.push({
                pathname: `/vaults/${address}`,
                query: { user: currentAccount, type: "new" },
            })

            await getVaultsByWallet();
            await getVaultsByCreator();

            setFormData(defaultFormData)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }


    const fetchAllVaults = async () => {
        try {
            if (!currentAccount) { return }
            setLiveVaults([])
            setIsLoading(true);

            const data = JSON.stringify({
                "vaultStatus": "RUNNING"
            });
            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/getall`, data, {
                // const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/getall`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            console.log("Data fetched for all vaults", response);
            response.data.Items?.forEach((element) => {
                // console.log(element);
                let d = {}
                for (let i in element) {
                    d[i] = Object.values(element[i])[0]
                }

                setLiveVaults(prev => [...prev, d]);
            })

            // setLiveVaults(data);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    // console.log("LIve Vualts", liveVaults);

    useEffect(() => {
        getVaultsByWallet();
        getVaultsByCreator();
        fetchAllVaults();
    }, [currentAccount])


    return (
        <DataContext.Provider value={{ formData, setFormData, handleChange, vaults, getVaultsByWallet, handleCreateVault, deploySafe, creatorVaults, getVaultsByCreator, liveVaults }}>
            {children}
        </DataContext.Provider>
    )
}