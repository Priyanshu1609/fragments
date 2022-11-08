import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../contexts/transactionContext';
import Account from './Account';
import Logo from './logo';
import { parseCookies } from '../utils/cookie'
import { useCookies } from 'react-cookie';

import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useNetwork } from 'wagmi';
import { useSwitchNetwork } from 'wagmi'

const Navbar: React.FC = () => {

    const router = useRouter();
    const { currentAccount } = useContext(TransactionContext);
    const [cookies, setCookie] = useCookies(['user']);

    const { chain, chains } = useNetwork()
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors } = useConnect();
    const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()


    return (
        <div className="overflow-y-scroll scrollbar-hide ">
            <div className=" mx-auto lg:px-8 py-3">
                <div className="flex items-center w-full justify-between pt-1 pb-5 px-4">
                    <div className="flex px-2 lg:px-0">
                        <div className="flex-shrink-0 flex items-center text-sm text-gray-300 cursor-pointer space-x-8">
                            <div className="inline-flex items-center" onClick={e => router.push({
                                pathname: '/dashboard'
                            })}>
                                <Logo />
                            </div>
                            <div suppressHydrationWarning>
                                {cookies?.user?.issuer && <div className='flex space-x-5'>
                                    <p onClick={e => router.push({
                                        pathname: '/dashboard'
                                    })} className={`${router.pathname === "/dashboard" && "text-button"}`} >MY DASHBOARD</p>
                                    <p onClick={e => router.push({
                                        pathname: '/livevaults'
                                    })} className={`${router.pathname === "/livevaults" && "text-button"}`} >EXPLORE LIVE VAULTS</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div suppressHydrationWarning className="flex space-x-6 items-center">
                        {
                            connectors.map((connector) => {
                                if (isConnected) return null;
                                return <button key={connector.id} suppressHydrationWarning className='text-white cursor-pointer flex space-x-2 items-center p-4 rounded-md bg-white bg-opacity-20' onClick={() => connect({ connector })}>Connect Wallet</button>

                            })
                        }
                        {chain?.id !== 5 && isConnected && <button suppressHydrationWarning onClick={() => switchNetwork?.(5)} className='text-white cursor-pointer flex space-x-2 items-center p-4 rounded-md bg-white bg-opacity-20' >Switch To Goerli Testnet</button>}

                        {cookies?.user?.currentAccount &&
                            <Account />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar