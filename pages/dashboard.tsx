import { useRouter } from 'next/router';
import React, { useEffect, useContext, useState } from 'react';
// import { useConnect } from 'wagmi';
import cerateDaoPeopleImage from '../assets/People.png';
import Image from 'next/image';
import { ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';

import Orders from '../components/Orders';
import Proposals from '../components/Proposals';
import { TransactionContext } from '../contexts/transactionContext';
import { ethers } from 'ethers';
import { getEllipsisTxt } from '../utils';
import PageLoader from '../components/PageLoader';
import MyInvestment from "../components/MyInvestments"
import MyGullaks from "../components/MyGullaks"
import NFTList from "../components/NFTList"
import { DataContext } from '../contexts/dataContext';


declare var window: any;

export enum TabNames {
    MyInvestments = 'MY_INVESTMENTS',
    MyGullaks = 'MY_GULLAKS',
    NFTS = 'NFTS',
    Orders = 'ORDERS',
    Proposals = 'PROPOSALS'
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export interface TabProps {
    tabs: {
        name: string;
        value: string;
    }[]
}

const tabs = [
    {
        name: 'MY FRAGMENTS',
        value: TabNames.MyInvestments
    },
    {
        name: 'VAULTS CREATED',
        value: TabNames.MyGullaks
    },
    {
        name: 'MY NFTS',
        value: TabNames.NFTS
    },
    // {
    //     name: 'ORDERS',
    //     value: TabNames.Orders
    // },
    {
        name: 'PROPOSALS',
        value: TabNames.Proposals
    }
]

export const RenderTab: React.FC<TabProps> = ({
    tabs
}) => {


    return (
        <>
            {
                tabs.map(({ name, value }) => (
                    <Tab
                        key={name}
                        className={({ selected }) =>
                            classNames(
                                selected
                                    ? 'text-white !opacity-100 border-b-white border-b-2'
                                    : 'text-white hover:text-white',
                                'w-full font-bold py-2.5 text-sm leading-5 text-white opacity-50 transition-all delay-200',
                                '!focus:outline-hidden border-0'
                            )
                        }
                    >
                        {name}
                    </Tab>
                ))
            }
        </>
    )
}

const Dashboard: React.FC = () => {

    const { connectallet, currentAccount, ens } = useContext(TransactionContext);
    const { vaults, creatorVaults } = useContext(DataContext);

    const [valuation, setValuation] = useState(0)

    const router = useRouter();

    const handleValuation = async () => {
        if (!vaults) {
            console.log("no vaults")
            return
        }
        let value = 0.00;
        vaults.forEach(async (vault: any) => {
            const vaultValuation = Number(vault.amountPledged)
            console.log({ valuation, vaultValuation })
            value += vaultValuation
        }
        )
        setValuation(value);
    }

    useEffect(() => {
        handleValuation();
    }, [currentAccount, vaults])


    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
    }, [currentAccount])

    useEffect(() => {
        router.prefetch('/create-gullak')
        router.prefetch('/create-dao')
    })

    return (
        <div className='text-white font-montserrat max-w-7xl xl:mx-auto mx-2 md:mx-4 lg:mx-6'>
            <div className='flex px-2 items-center justify-between bg-white bg-opacity-20 bg-cover bg-[url("/Button.png")] rounded-lg text-white shadow-lg cursor-pointer' onClick={() =>
                router.push({
                    pathname: '/create-gullak',
                    query: { user: currentAccount },
                })}>

                <div className='flex items-center space-x-6 p-4'>
                    <Image src={cerateDaoPeopleImage} height={100} width={130} />
                    <div>
                        <h1 className='text-2xl font-semibold'>CREATE YOUR OWN VAULT</h1>
                        <p className='text-base mt-2'>Make a vault to start investing with your frens</p>
                    </div>
                </div>
                <ArrowRightIcon className='w-6 h-6 mr-6' />
            </div>
            <div className='bg-white bg-opacity-20 bg-cover flex items-center justify-around rounded-lg px-4 py-10 mt-4 w-full'>
                <div className=''>
                    <div className='text-white font-montserrat flex space-x-3 bg-white bg-opacity-20 p-3 rounded-md'>
                        {/* {accountData.ens?.avatar && <img src={accountData.ens.avatar} alt="ENS Avatar" className='rounded-sm' width={25} height={25} />} */}
                        <div className='text-white text-lg'>
                            {ens !== "" ? ens : getEllipsisTxt(currentAccount)}
                        </div>
                    </div>
                </div>
                <div className='flex space-x-10 '>
                    <div className='flex  space-x-2 items-center'>
                        <p className='opacity-70'>Curent Value: </p>
                        <span className='font-bold text-xl opacity-100 -mt-1'>{(valuation).toFixed(2)} ETH </span>
                        {/* <span className='text-green-500 text-xl flex'> 5 % <ArrowUpIcon className='h-5 w-5 my-auto' /></span> */}
                    </div>
                    <div className='flex space-x-2'>
                        <p className='opacity-70'>Active Vaults: </p><span className='font-bold opacity-100'>{creatorVaults.length}</span>
                    </div>
                </div>
            </div>
            <div className="w-full px-2 py-10 sm:px-0 text-white">
                <Tab.Group>
                    <Tab.List className="flex  p-1 !pb-0 w-full space-x-1">
                        <div className='flex w-full  '>
                            <RenderTab tabs={tabs} />
                        </div>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel>
                            <MyInvestment />
                        </Tab.Panel>
                        <Tab.Panel>
                            <MyGullaks />
                        </Tab.Panel>
                        <Tab.Panel>
                            <NFTList />
                        </Tab.Panel>
                        {/* <Tab.Panel>
                            <Orders />
                        </Tab.Panel> */}
                        <Tab.Panel>
                            <Proposals />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default Dashboard;