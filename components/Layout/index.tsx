import React, { Children, ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { ConnectModalProvider } from '../../contexts/connectwallet'
import { SocketProvider } from '../../contexts/socketContext'
import { OpenseaContextProvider } from '../../contexts/opensesContext'
import { NftContextProvider } from '../../contexts/NftContext'
import { TransactionProvider } from '../../contexts/transactionContext'
import { DataContextProvider } from '../../contexts/dataContext'

import Logo from '../logo'
import ConnectModal from '../ConnectModal'
import Account from '../Account'
import CreateDAOButton from '../CreateDAOButton'
import bg2 from '../../assets/bg2.png'

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
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
                                    <div className='min-h-screen bg-[url("/g10.png")] bg-cover bg-repeat-y font-montserrat' >
                                        <header className="">
                                            <div className=" mx-auto lg:px-8">
                                                <div className="flex items-center w-full justify-between py-5 px-4">
                                                    <div className="flex px-2 lg:px-0">
                                                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                                                            <Link href="/">
                                                                <div className="inline-flex items-center">
                                                                    <Logo />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-6 items-center">
                                                        {/* <Chains /> */}
                                                        <CreateDAOButton />
                                                        <Account />
                                                    </div>
                                                </div>
                                            </div>
                                        </header>
                                        {children}
                                        <ConnectModal />
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