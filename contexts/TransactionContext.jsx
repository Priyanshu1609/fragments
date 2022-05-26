import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import ERC_20 from '../ERC_20.json'

const contractAddress = 0x0000000000000000000000;

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
    eth = window.ethereum
}

const networks = {
    eth: {
        chainId: `0x${Number(1).toString(16)}`,
        chainName: "Ethereum Mainnet",
        rpcUrls: [
            "https://eth-mainnet.public.blastapi.io",
            "https://cloudflare-eth.com",
            "https://ethereumnodelight.app.runonflux.io",
            "https://main-light.eth.linkpool.io",
        ],
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerUrls: [
            "https://etherscan.io",
        ]
    },
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isReturningUser, setIsReturningUser] = useState(false);
    const router = useRouter();


    const checkIfWalletIsConnected = async () => {
        try {
            if (!eth) return alert('Please install metamask ')

            const accounts = await eth.request({ method: 'eth_accounts' })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getProvider = async () => {
        const provider = new ethers.providers.Web3Provider(eth);
        return provider;
    }


    const connectWallet = async () => {
        try {
            if (!eth) return alert('Please install metamask ')

            const provider = new ethers.providers.Web3Provider(eth);
            // if (provider.network !== "matic") {
            //     await window.ethereum.request({
            //         method: "wallet_addEthereumChain",
            //         params: [
            //             {
            //                 ...networks["polygon"],
            //             },
            //         ],
            //     });
            // }
            setIsLoading(true)
            console.log('Is returning', isReturningUser)
            // const accounts = await eth.request({ method: 'eth_requestAccounts' })
            let accounts;

            accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });
            if (isReturningUser) {
                // Runs only they are brand new, or have hit the disconnect button
                console.log('brand new ran')
                await window.ethereum.request({
                    method: "wallet_requestPermissions",
                    params: [
                        {
                            eth_accounts: {}
                        }
                    ]
                });
            }


            setCurrentAccount(accounts[0])
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            throw new Error('No ethereum object.')
        }
    }

    const logoutWallet = async () => {
        try {
            if (!eth) return alert('Please install metamask ')
            setIsReturningUser(true);

            setCurrentAccount('');

        } catch (error) {
            console.error(error)
        }
    }

    const getBalanace = async () => {
        const provider = new ethers.providers.Web3Provider(eth);
        const balance = await provider.getBalance(address)
        const balanceInEth = ethers.utils.formatEther(balance);

        return balanceInEth;
    }

    const getTokenBalance = async (tokenContractAddress) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(tokenContractAddress, ERC_20, provider);
        const balance = (await contract.balanceOf(currentAccount)).toString();

        return balance;

    }

    useEffect(() => {
        async function listenMMAccount() {
            window.ethereum.on("accountsChanged", async function () {
                eth.on('accountsChanged', function () {
                    console.log('accounts changed')
                    logoutWallet();
                })
                logoutWallet();
            });
        }
        listenMMAccount();
    }, []);

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                isLoading,
                logoutWallet,
                getBalanace,
                getTokenBalance,
                getProvider,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}