import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import cerateDaoPeopleImage from '../assets/create-dao-people.png';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';

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
        value: TabNames;
    }[]
}

const tabs = [
    {
        name: 'MY INVESTMENTS',
        value: TabNames.MyInvestments
    },
    {
        name: 'MY GULLAKS',
        value: TabNames.MyGullaks
    },
    {
        name: 'NFTS',
        value: TabNames.NFTS
    },
    {
        name: 'ORDERS',
        value: TabNames.Orders
    },
    {
        name: 'PROPOSALS',
        value: TabNames.Proposals
    }
]

const RenderTab: React.FC<TabProps> = ({
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

    const [{ data: connectData }] = useConnect()

    const router = useRouter();

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className='text-white font-sora max-w-7xl mx-auto'>
            <div className='flex px-2 items-center justify-between bg-[#F5E58F] rounded-lg text-black cursor-pointer' onClick={() => router.push('/create-dao')}>
                <div className='flex items-center space-x-6'>
                    <Image src={cerateDaoPeopleImage} />
                    <div>
                        <h1 className='text-2xl font-semibold'>Create your own DAO</h1>
                        <p className='text-base mt-2'>Make a DAO to start investing with your frens in Gullaks</p>
                    </div>
                </div>
                <ArrowRightIcon className='w-6 h-6' />
            </div>
            <div className='bg-[#0F0F13] flex items-center justify-around rounded-lg px-4 py-10 mt-4'>
                <div className='flex space-x-2'>
                    <p className='opacity-70'>Total flips: </p><span className='font-bold opacity-100'>200</span>
                </div>
                <div className='flex space-x-2'>
                    <p className='opacity-70'>Hit rate: </p><span className='font-bold opacity-100'>80%</span>
                </div>
                <div className='flex space-x-2'>
                    <p className='opacity-70'>Curent Value: </p><span className='font-bold opacity-100'>600 ETH</span>
                </div>
                <div className='flex space-x-2'>
                    <p className='opacity-70'>Active Gullaks: </p><span className='font-bold opacity-100'>50</span>
                </div>
            </div>
            <div className="w-full px-2 py-16 sm:px-0">
                <Tab.Group>
                    <Tab.List className="flex border-b-4 border-solid border-[#1B1B1B] p-1 !pb-0 w-full space-x-1">
                        <div className='flex w-full max-w-4xl'>
                            <RenderTab tabs={tabs} />
                        </div>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel>
                            Content to be added
                        </Tab.Panel>
                        <Tab.Panel>
                            Content to be added
                        </Tab.Panel>
                        <Tab.Panel>
                            Content to be added
                        </Tab.Panel>
                        <Tab.Panel>
                            Content to be added
                        </Tab.Panel>
                        <Tab.Panel>
                            Content to be added
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                </div>
        </div>
    )
}

export default Dashboard;