import React, { Children, ReactElement, useContext } from 'react'
import Head from 'next/head'

import { CookiesProvider } from "react-cookie"

import { ConnectModalProvider } from '../../contexts/connectwallet'
import { NftContextProvider } from '../../contexts/NftContext'
import { TransactionContext, TransactionProvider } from '../../contexts/transactionContext'
import { DataContextProvider } from '../../contexts/dataContext'
import { ProposalContextProvider } from '../../contexts/proposalContext'

import Logo from '../logo'
import ConnectModal from '../ConnectModal'
import Account from '../Account'
import PageLoader from '../PageLoader'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar'
import { parseCookies } from '../../utils/cookie'
import LifiWidget from '../LifiWidget'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli],
    [publicProvider()],
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [new MetaMaskConnector({ chains })],
})

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

    const router = useRouter();

    return (
        <CookiesProvider>
            <WagmiConfig client={client}>
                <TransactionProvider>
                    <ConnectModalProvider>
                        <DataContextProvider>
                            <ProposalContextProvider>
                                <NftContextProvider>
                                    <Head>
                                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                                        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
                                    </Head>
                                    <div className='bg-[url("https://website-bg.s3.ap-south-1.amazonaws.com/appbg-min.png")] h-screen bg-center bg-fixed bg-cover  font-montserrat !overflow-y-scroll' >

                                        <Navbar />
                                        {children}
                                        <ConnectModal />
                                        <LifiWidget />
                                        <ToastContainer
                                            position="top-right"
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="dark"
                                        />
                                    </div>
                                </NftContextProvider>
                            </ProposalContextProvider>
                        </DataContextProvider>
                    </ConnectModalProvider>
                </TransactionProvider>
            </WagmiConfig>
        </CookiesProvider>
    )
}

export default Layout