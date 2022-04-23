import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import Blockies from 'react-blockies';
import ProgressBar from "@ramonak/react-progress-bar";
import Select from '../../components/Select';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';
import { RenderTab } from '../dashboard';
import { getEllipsisTxt } from '../../utils';
import { OrdersState } from '../../components/Orders';

export enum VaultDashboardTabs {
    Information = 'INFORMATION',
    Owners = 'OWNERS',
    Orders = 'ORDERS'
}

const tabs = [
    {
        name: 'INFO',
        value: VaultDashboardTabs.Information
    },
    {
        name: 'OWNERS',
        value: VaultDashboardTabs.Owners
    },
    {
        name: 'ORDERS',
        value: VaultDashboardTabs.Orders
    },
]

const VaultDetail: React.FC = () => {

    const [{ data: connectData }] = useConnect()
    const [selectedToken, setSelectedToken] = React.useState<string>("matic")
    const [selectedChain, setSelectedChain] = React.useState<string>("eth")
    const [tokenAmount, setTokenAmount] = React.useState<number>(0)
    const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = React.useState<boolean>(false)
    const [currentOrderView, setCurrentOrderView] = React.useState<OrdersState>(OrdersState.ACTIVE);

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className='text-white max-w-7xl mx-auto font-sora grid grid-cols-2 gap-4'>
            <div className='bg-[#0F0F13] p-6'>
                <div className='bg-[#1E1E24] rounded-lg flex items-center justify-center p-3 w-max'>
                    <Blockies 
                        seed='need to be changed'
                        size={7}
                        scale={3}
                        className='rounded-full mr-3'
                    />
                    <p className='text-sm'>MakerdockDAO</p>
                </div>
                <div className='mt-5 mb-5'>
                    <h2 className='text-2xl font-semibold text-[#FFE55B] mb-2'>{`Bored Ape <> RTFKT`}</h2>
                    <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eget sagittis, libero morbi consequat lacus tempor mattis nunc 
                    </p>
                </div>
                <div className='mb-5 bg-[#1E1E24] rounded-lg flex space-x-3 p-3 w-full items-center justify-center'>
                    <p className='text-sm text-[#70707C]'>You Own: </p>
                    <p className='text-[#FFE55B] text-sm'>5000 BORE</p>
                </div>
                <div>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='flex space-x-2'>
                            <p className='text-[#70707C] text-sm'>Fund raised: </p><span className='text-sm font-semibold'>1000 BORE</span>
                        </div>
                        <div className='flex space-x-2'>
                            <p className='text-[#70707C] text-sm'>Funding goal: </p><span className='text-sm font-semibold'>1300 BORE</span>
                        </div>
                    </div>
                    <ProgressBar completed={60} bgColor='#24CA49' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                </div>
                <div className='mt-4 mb-6'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p className='text-xs text-[#70707C]'>Select Token</p>
                            <Select 
                                options={[{
                                    key: 'matic',
                                    label: 'MATIC'
                                }]}
                                value={selectedToken}
                                onChange={(value) => setSelectedToken(value)}
                            />
                        </div>
                        <div>
                            <p className='text-xs text-[#70707C]'>Select Chain</p>
                            <Select 
                                options={[{
                                    key: 'eth',
                                    label: 'Ethereum'
                                }]}
                                value={selectedChain}
                                onChange={(value) => setSelectedChain(value)}
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='flex justify-between text-sm text-[#70707C] mb-2'>
                            <p>Enter amount</p>
                            <p>Balance: 32 ETH</p>
                        </div>
                        <input type='number' placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} onFocus={() => setIsPurchaseButtonVisible(true)} className='bg-[#1E1E24] p-4 w-full rounded-lg focus:outline-none' />
                    </div>
                    {
                        isPurchaseButtonVisible && (
                            <div className='text-center'>
                                <button className='bg-[#FFE55B] flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                    <p>Purchase {tokenAmount} BORE</p>
                                    <ArrowRightIcon className='w-4 h-4' />
                                </button>
                                <p className='text-[#70707C] text-xs mt-2'>15 MATIC = 5000 BORE</p>
                            </div>
                        )
                    }
                </div>
                <div>
                    <Tab.Group>
                        <Tab.List className='flex border-b-4 border-solid border-[#1B1B1B] p-1 !pb-0 w-full space-x-1'>
                            <div className='flex w-full max-w-4xl'>
                                <RenderTab tabs={tabs} />
                            </div>
                        </Tab.List>
                        <Tab.Panels className='mt-2'>
                            <Tab.Panel>
                                <div className='p-4'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Valuations</p>
                                            <p className='text-xl font-semibold'>600 ETH</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>No. of tokens</p>
                                            <p className='text-xl font-semibold'>1000000</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-6'>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Management fee</p>
                                            <p className='text-xl font-semibold'>1%</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Unique owners</p>
                                            <p className='text-xl font-semibold'>4364</p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='py-4'>
                                    <div className='flex justify-between items-center mb-4'>
                                        <p>Vault owners</p>
                                        <button className='bg-white rounded-lg p-2 text-sm text-gray-900'>Add owner</button>
                                    </div>
                                    <div>
                                        <div className='py-4 flex justify-between border-y-2 border-[#1E1E24]'>
                                            <div className='flex items-center w-full justify-between'>
                                                <div className='flex space-x-3'>
                                                    <Blockies 
                                                        seed='need to be changed'
                                                        size={19}
                                                        scale={2}
                                                        className='rounded-full mr-3'
                                                    />
                                                    <div>
                                                        <p className='font-semibold text-base'>
                                                            rungta.eth
                                                        </p>
                                                        <p className='text-[#70707C] text-xs'>{getEllipsisTxt('0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd')}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-sm'>3913 BORED</p>
                                                    <p className='text-[#D0D0DA] text-xs'>$ 341,315</p>
                                                </div>
                                                <div>
                                                    <p>37.53%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='py-4'>
                                    <div className='flex justify-between mb-4'>
                                        <p className='font-semibold text-lg'>Orders</p>
                                        <div className='flex space-x-2'>
                                            <div 
                                                className={`text-sm cursor-pointer px-4 py-2 bg-[#0F0F13] rounded-full ${currentOrderView === OrdersState.ACTIVE ? 'bg-white text-gray-900' : ''}`}
                                                onClick={() => setCurrentOrderView(OrdersState.ACTIVE)}
                                            >
                                                Active
                                            </div>
                                            <div 
                                                className={`text-sm cursor-pointer px-4 py-2 bg-[#0F0F13] rounded-full ${currentOrderView === OrdersState.CLOSED ? 'bg-white text-gray-900' : ''}`}
                                                onClick={() => setCurrentOrderView(OrdersState.CLOSED)}
                                            >
                                                Closed
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-4 flex justify-between border-y-2 border-[#1E1E24]'>
                                        <div className='flex'>
                                            <Blockies 
                                                seed='need to be changed'
                                                size={8}
                                                scale={5}
                                                className='rounded-full mr-3'
                                            />
                                            <div>
                                                <p className='font-semibold text-base'>
                                                    rungta.eth is selling <span className='text-[#F5E58F]'>5000 BORE</span>
                                                </p>
                                                <p className='text-[#70707C] text-xs'>{getEllipsisTxt('0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd')}</p>
                                            </div>
                                        </div>
                                        <button className='px-4 text-xs py-2 bg-white text-gray-900 rounded-full'>
                                            Buy Token
                                        </button>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default VaultDetail