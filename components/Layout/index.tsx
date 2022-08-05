import React, { Children, ReactElement, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { ConnectModalProvider } from '../../contexts/connectwallet'
import { SocketProvider } from '../../contexts/socketContext'
import { OpenseaContextProvider } from '../../contexts/opensesContext'
import { NftContextProvider } from '../../contexts/NftContext'
import { TransactionContext, TransactionProvider } from '../../contexts/transactionContext'
import { DataContextProvider } from '../../contexts/dataContext'

import Logo from '../logo'
import ConnectModal from '../ConnectModal'
import Account from '../Account'
import PageLoader from '../PageLoader'
import { useRouter } from 'next/router'
import SelectChain from '../SelectChain'

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

    const router = useRouter();

    return (
        <>
            <TransactionProvider>
                <ConnectModalProvider>
                    <DataContextProvider>
                        <NftContextProvider>
                            <OpenseaContextProvider>
                                <SocketProvider>
                                    <Head>
                                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                                        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
                                    </Head>
                                    <div className='bg-[url("https://landing-video.s3.ap-south-1.amazonaws.com/appbg.png")] h-screen bg-center bg-fixed bg-cover  font-britanica !overflow-y-scroll' >

                                        <header className="overflow-y-scroll scrollbar-hide ">
                                            <div className=" mx-auto lg:px-8 py-3">
                                                <div className="flex items-center w-full justify-between pt-1 pb-5 px-4">
                                                    <div className="flex px-2 lg:px-0">
                                                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                                                            <div className="inline-flex items-center" onClick={e => router.push({
                                                                pathname: '/dashboard'
                                                            })}>
                                                                <Logo />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-6 items-center">
                                                        {/* <Chains /> */}
                                                        {/* <CreateDAOButton /> */}
                                                        <Account />
                                                    </div>
                                                </div>
                                            </div>
                                        </header>
                                        {children}
                                        <ConnectModal />
                                        <SelectChain />
                                    </div>
                                </SocketProvider>
                            </OpenseaContextProvider>
                        </NftContextProvider>
                    </DataContextProvider>
                </ConnectModalProvider>
            </TransactionProvider>
        </>
    )
}

export default Layout