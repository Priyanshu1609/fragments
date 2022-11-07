import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import ERC_20 from '../abis/ERC_20.json'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from 'web3';
import { AwsClient } from 'aws4fetch';
import axios from 'axios';
import { useCookies } from "react-cookie"
import { magic } from "../utils/magic"

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
    goerli: {
        chainId: `0x${Number(4).toString(16)}`,
        chainName: "goerli",
        rpcUrls: [
            'https://goerli.infura.io/v3/'
        ],
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerUrls: [
            "https://goerli.etherscan.io",
        ]
    },
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [clientId, setClientId] = useState('');
    const [awsClient, setAwsClient] = useState();
    const router = useRouter();
    const [ens, setEns] = useState("");
    const [cookie, setCookie, removeCookie] = useCookies(["user"])

    console.log({ currentAccount })

    const web3 = new Web3(Web3.givenProvider);

    let walletConnectProvider;


    const checkWalletCookie = async () => {
        console.log("checkWalletCookie", cookie.user);
        if (cookie.user) {
            setCurrentAccount(cookie.user?.currentAccount);
        }
    }

    useEffect(() => {
        checkWalletCookie();
    }, [cookie])


    const signUpMain = async (address) => {
        try {
            setIsLoading(true)
            console.log("Email Fetched During Sign Up", cookie.user.userMetadata);

            var data = JSON.stringify({
                "email": cookie.user.userMetadata.email,
                "referredId": "00000000",
                "address": address
            });

            var config = {
                method: 'post',
                url: 'https://r7d9t73qaj.execute-api.ap-south-1.amazonaws.com/dev/api/auth/signupmain',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios(config)
            console.log("SignUp Main", res.data)
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false);
        }
    }
    const checkIfWalletIsConnected = async () => {
        try {

            setIsLoading(true);

            const accounts = await eth.request({ method: 'eth_accounts' })

            if (accounts.length) {
                let address = accounts[0];
                // console.log("address", address);

            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const getProvider = async () => {
        const provider = new ethers.providers.Web3Provider(eth);
        return provider;
    }

    const validateSig = async (address, signature, customerId) => {
        const message = `zqbfbzmawv8i6vqq8exfyseuydusrjrju5ueey2zs5lejwg52bfo4fuptp64,nonce: ${customerId}`;
        console.log('Message', message);
        const hash = web3.utils.sha3(message);
        console.log('Hash:', hash);
        const signing_address = await web3.eth.accounts.recover(hash, signature);
        console.log("Address:", signing_address);
        return signing_address.toLowerCase() === address.toLowerCase();
    };

    const connectWallet = async (type) => {
        try {
            setIsLoading(true);

            let accounts;

            if (type === 'metamask') {
                setIsLoading(true)
                console.log('Is returning', isReturningUser)
                accounts = await eth.request({ method: 'eth_requestAccounts' })
                let address = accounts[0];
                const res = await signUpMain(address);
                let obj = cookie;
                obj.currentAccount = address;
                setCookie("user", JSON.stringify({ user: obj }), {
                    path: "/",
                    maxAge: 2592000, // Expires after 1hr
                    sameSite: true,
                })
                checkWalletCookie();
                console.log(res);
                if (!res) { return }
            }

            else {
                console.log('WalletConnect')
                walletConnectProvider = new WalletConnectProvider({
                    infuraId: 'f82688ca72f84274a38556f3c643ea96'
                });
                accounts = await walletConnectProvider.enable();

                const web3Provider = new providers.Web3Provider(provider);
                console.log('Accounts:', accounts)
            }

            // setCurrentAccount(accounts[0])

        } catch (error) {
            console.error(error)
            // throw new Error('No ethereum object.')
        } finally {
            setIsLoading(false)
        }
    }

    const logoutWallet = async () => {
        try {

            setIsReturningUser(true);
            await magic.user.logout();

            setCurrentAccount('');
            setAwsClient(null);
            removeCookie("user", {
                path: "/",
                sameSite: true,
            })
            router.push("/")

        } catch (error) {
            console.error(error)
        }
    }

    const getBalanace = async () => {
        const provider = new ethers.providers.Web3Provider(eth);
        const balance = await provider.getBalance(currentAccount)
        let balanceInEth = ethers.utils.formatEther(balance);
        balanceInEth = parseFloat(balanceInEth).toFixed(4);

        return balanceInEth;
    }

    const getContractBalance = async (contractAddress) => {
        const provider = new ethers.providers.Web3Provider(eth);
        const balance = await provider.getBalance(contractAddress);
        let balanceInEth = ethers.utils.formatEther(balance);
        // balanceInEth = parseFloat(balanceInEth).toFixed(4);

        console.log('Balance Contract:', balanceInEth, balance);

        return balanceInEth;
    }

    const getTokenBalance = async (tokenContractAddress) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(tokenContractAddress, ERC_20, provider);
        const balance = (await contract.balanceOf(currentAccount)).toString();

        return balance;

    }

    const fetchEns = async () => {
        if (!currentAccount) { return }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let name = await provider?.lookupAddress(currentAccount);
            name = name.toString();
            setEns(name);
            console.log('ENS Name', name);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchEns();
    }, [currentAccount])



    const sendTx = async (
        receiver,
        amount,
    ) => {
        try {
            setIsLoading(true);
            const provider = new ethers.providers.Web3Provider(eth);
            console.log(provider);
            const signer = provider.getSigner();
            ethers.utils.getAddress(receiver);
            // const hexaMessage = ethers.utils.formatBytes32String(message);
            const tx = await signer.sendTransaction({
                to: receiver,
                value: ethers.utils.parseEther(amount.toString())
            });
            await tx.wait();
            return tx;

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    // useEffect(() => {
    //     async function listenMMAccount() {
    //         window.ethereum.on("accountsChanged", async function () {
    //             eth.on('accountsChanged', function () {
    //                 console.log('accounts changed')
    //                 logoutWallet();
    //             })
    //             logoutWallet();
    //         });
    //     }
    //     listenMMAccount();
    // }, []);

    // useEffect(() => {
    //     async function listenMMAccount() {
    //         window.ethereum.on("chainChanged", async function () {
    //             getProvider();
    //         });
    //     }
    //     listenMMAccount();
    // }, []);

    useEffect(() => {
        checkIfWalletIsConnected()
        // getTransactionRecByHash();
    }, [])

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                isLoading,
                logoutWallet,
                getBalanace,
                getContractBalance,
                getTokenBalance,
                getProvider,
                setIsLoading,
                sendTx,
                ens,
                awsClient,
                setAwsClient,
                checkWalletCookie
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
