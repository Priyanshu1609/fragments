import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
// import { useConnect } from 'wagmi';
import cerateDaoPeopleImage from '../assets/create-dao-people.png';
import Image from 'next/image';
import { ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';
import MyInvestment from '../components/MyInvestments';
import Orders from '../components/Orders';
import Proposals from '../components/Proposals';
import NFTList from '../components/NFTList';
import MyGullaks from '../components/MyGullaks';
import { TransactionContext } from '../contexts/transactionContext';
import { ethers } from 'ethers';
import { getEllipsisTxt } from '../utils';

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
        name: 'MY INVESTMENTS',
        value: TabNames.MyInvestments
    },
    {
        name: 'GULLAK CREATED',
        value: TabNames.MyGullaks
    },
    {
        name: 'NFTS',
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
                        key={value}
                        className={({ selected }) =>
                            classNames(
                                selected
                                    ? 'text-white !opacity-100 border-b-white border-b-2'
                                    : 'text-white hover:text-white',
                                'w-full font-bold py-2.5 text-sm leading-5 text-white opacity-50 transition-all delay-200',
                                'focus:outline-hidden'
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

    // const [{ data: connectData }] = useConnect()

    const { connectallet, currentAccount } = useContext(TransactionContext);
    const [name, setName] = React.useState('');

    const router = useRouter();

    const fetchEns = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var name = await provider?.lookupAddress(currentAccount);
        setName(name ?? '');
        console.log('ENS Name', name);
    }

    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
        { currentAccount && fetchEns() }
    }, [currentAccount])

    useEffect(() => {
        router.prefetch('/create-gullak')
        router.prefetch('/create-dao')
    })

    return (
        <div className='text-black font-montserrat max-w-7xl lg:mx-auto mx-2 md:mx-4'>
            <div className='flex px-2 items-center justify-between bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  rounded-lg text-black shadow-lg cursor-pointer' onClick={() => router.push('/create-dao')}>
                <div className='flex items-center space-x-6'>
                    <Image src={cerateDaoPeopleImage} />
                    <div>
                        <h1 className='text-2xl font-semibold'>Create your own DAO</h1>
                        <p className='text-base mt-2'>Make a DAO to start investing with your frens in Gullaks</p>
                    </div>
                </div>
                <ArrowRightIcon className='w-6 h-6 mr-6' />
            </div>
            <div className='bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] flex items-center justify-around rounded-lg px-4 py-10 mt-4 w-full'>
                <div className=''>
                    <div className='text-black font-montserrat flex space-x-3 bg-white bg-opacity-20 p-3 rounded-md'>
                        {/* {accountData.ens?.avatar && <img src={accountData.ens.avatar} alt="ENS Avatar" className='rounded-sm' width={25} height={25} />} */}
                        <div className='text-black text-lg'>
                            {name !== '' ? name : getEllipsisTxt(currentAccount)}
                        </div>
                    </div>
                </div>
                <div className='flex space-x-10 '>
                    <div className='flex  space-x-2 items-center'>
                        <p className='opacity-70'>Curent Value: </p>
                        <span className='font-bold text-xl opacity-100 -mt-1'>600 ETH </span>
                        {/* <span className='text-green-500 text-xl flex'> 5 % <ArrowUpIcon className='h-5 w-5 my-auto' /></span> */}
                    </div>
                    <div className='flex space-x-2'>
                        <p className='opacity-70'>Active Gullaks: </p><span className='font-bold opacity-100'>50</span>
                    </div>
                </div>
            </div>
            <div className="w-full px-2 py-16 sm:px-0 text-white">
                <Tab.Group>
                    <Tab.List className="flex border-b-4 border-solid border-[#1B1B1B] p-1 !pb-0 w-full space-x-1">
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