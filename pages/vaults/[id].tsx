import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';

import Blockies from 'react-blockies';
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';

import Select from '../../components/Select';
import Modal from '../../components/Modal';
import { RenderTab } from '../dashboard';
import { getEllipsisTxt } from '../../utils';
import { OrdersState } from '../../components/Orders';
import networks from '../../networks';
import { SocketContext } from '../../contexts/socketContext';
import { TransactionContext } from '../../contexts/transactionContext';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';
import { DataContext } from '../../contexts/dataContext';
import { bnToString, dtToString, ipfsParse, fixTokenURI } from '../../utils';
import SelectChain from '../../components/SelectChain';

import { darkTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { BigNumber } from 'ethers';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";

export enum VaultDashboardTabs {
    Information = 'INFORMATION',
    Owners = 'OWNERS',
    Orders = 'ORDERS'
}
interface selectedChain {
    chainId: number;
    icon: string;
    name: string;
    asset: object;
}

interface selectedToken {
    symbol: string;
    address: string | undefined;
    currentPrice: BigNumber;
    chainId: number;
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
    // {
    //     name: 'ORDERS',
    //     value: VaultDashboardTabs.Orders
    // },
]

const myDarkTheme: Theme = {
    ...darkTheme, // Extend the darkTheme
    fontFamily: 'Sora'
}

const VaultDetail: React.FC = () => {
    const router = useRouter();

    const { connectallet, currentAccount, logout, getProvider } = useContext(TransactionContext);
    const { fetchFromTokens, transaction, chains, handleNetworkSwitch, } = useContext(SocketContext);
    const { getTokens } = useContext(NftContext);
    const { formData, setFormData } = useContext(DataContext);


    const [selectedToken, setSelectedToken] = useState<selectedToken>()
    const [selectedChain, setSelectedChain] = useState<selectedChain>()
    const [coins, setCoins] = useState([]);
    const [tokenAmount, setTokenAmount] = useState<number>(0)
    const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = useState<boolean>(false)
    const [currentOrderView, setCurrentOrderView] = useState<OrdersState>(OrdersState.ACTIVE);
    const [isFunded, setIsFunded] = useState(true);
    const [visible, setVisible] = useState(false);
    const [nfts, setNfts] = useState<any>([]);
    const [provider, setProvider] = useState();
    const [uniModal, setUniModal] = useState(false);

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
    }


    // setIsFunded(true)

    const fetchTokens = async (chainId: number | undefined) => {

        try {
            const res = await fetchFromTokens(chainId);
            setCoins(res);

        } catch (error) {
            console.error(error);
        }
    }

    const bridge = async () => {
        const fromChainId = selectedToken?.chainId
        const fromToken = selectedToken?.address
        const amount = tokenAmount
        const userAddress = currentAccount

        const txHash = await transaction(fromChainId, fromToken, amount, userAddress);

        console.log('Destination Socket Tx', txHash)
    }

    const getNFTs = async () => {

        try {

            const data = await getTokens(currentAccount);

            data.forEach((e: any) => {
                let metadata = JSON.parse(e.metadata)
                // setNfts([...nfts, metadata]);
                setNfts((prev: any) => ([...prev, metadata]));
            });

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false);
        }
    }
    console.log('NFTS:', nfts);

    useEffect(() => {
        fetchTokens(selectedChain?.chainId);
        handleNetworkSwitch(selectedChain?.chainId);
    }, [selectedChain])

    const jsonRpcEndpoint = `https://rinkeby.infura.io/v3/195d30bd1c384eafa2324e0d6baab488`;
    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
    }, [currentAccount])

    useEffect(() => {
        getNFTs();
        getProviderFrom();
    }, [])

    const sliderRef = useRef() as any;

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className='text-white max-w-7xl mx-auto font-montserrat md:flex md:flex-row-reverse pb-16 min-h-screen overflow-y-scroll scrollbar-hide'>
            {true && <div className='flex flex-[0.6]  items-start justify-center mt-4'>
                <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 mt-64'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
                <div className='flex-[0.8]  p-4'>
                    <div>
                        {/* <img src={fixTokenURI(nfts[0]?.image)} className='w-full rounded-lg' />
                        <p className='!bg-input p-2 w-36 rounded-2xl text-center mt-2 mx-auto z-50'>{nfts[0]?.name}</p> */}
                        <Swiper
                            ref={sliderRef}
                            effect={"fade"}
                            pagination={true}
                            loop={true}
                            autoplay={{
                                delay: 10000,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectFade, Navigation, Autoplay, Pagination]}
                            className="w-[18rem] lg:w-[24rem] xl:w-[30rem] h-[18rem] lg:h-[24rem] xl:h-[30rem] !rounded-lg !rounded-b-lg"
                        >
                            {nfts?.map((nft: any) => (
                                <div>
                                    <SwiperSlide>
                                        <img src={fixTokenURI(nft?.image)} />
                                        <p className='!bg-input text-white p-2 w-36 mt-36 rounded-2xl text-center mx-auto z-50'>Name: {nft?.name}</p>
                                    </SwiperSlide>

                                </div>

                            ))}
                        </Swiper>
                    </div>
                </div>
                <div onClick={handleNext} className='cursor-pointer mt-64  bg-gray-300 rounded-full p-2 '><ChevronRightIcon className='text-white h-7 w-7' /></div>
            </div>}
            <div className=' p-6 flex-[0.4] '>
                <div className='bg-input rounded-lg flex items-center justify-center p-3 w-max'>
                    <Blockies
                        seed='need to be changed'
                        size={7}
                        scale={3}
                        className='rounded-full mr-3'
                    />
                    <p className='text-sm'>MakerdockDAO</p>
                </div>
                <div className='mt-5 mb-5'>
                    <h2 className='text-2xl font-semibold text-[#2bffb1]  mb-2'>{`Bored Ape <> RTFKT`}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eget sagittis, libero morbi consequat lacus tempor mattis nunc
                    </p>
                </div >
                {isFunded ? <div className='mt-4 mb-6'>
                    <div className='mb-5 bg-input rounded-lg flex space-x-3 p-3 w-full items-center justify-center' >
                        <p className='text-sm text-gray-300'>You have deposited: </p>
                        <p className='text-[#2bffb1] text-sm'>5000 ETH</p>
                    </div >
                    <div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-sm'>Fund raised: </p><span className='text-sm font-semibold'>1000 ETH</span>
                            </div>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-sm'>Funding goal: </p><span className='text-sm font-semibold'>1300 ETH</span>
                            </div>
                        </div>
                        <ProgressBar completed={60} bgColor='#2bffb1' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                    </div>
                    <div>
                        {/* <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} /> */}
                        <div className='bg-input p-3 text-center rounded-lg text-lg cursor-pointer mt-4 ' onClick={e => setUniModal(true)}>
                            <p className='text-red-500'>We only accept funds in ETH</p>
                            <p className='text-green-500'>Have funds in different token ! Swap here !</p>
                        </div>

                    </div>
                    <div className='mt-3'>
                        <div className='flex justify-between text-sm text-gray-300 mb-2'>
                            <p>Enter amount</p>
                            {/* <p>Balance: 32 ETH</p> */}
                        </div>
                        <input required type='number' step="0" placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} onFocus={() => setIsPurchaseButtonVisible(true)} className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                    </div>

                    <div className='text-center' >
                        <button onClick={bridge} className='bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                            <p>Purchase {tokenAmount} {selectedToken?.symbol}</p>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                        {/* <p className='text-gray-300 text-xs mt-2'>15 MATIC = 5000 BORE</p> */}
                    </div>


                </div > :
                    <div className='mt-4 mb-6' onClick={e => setVisible(true)}>
                        <div className='mb-5 bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
                            <p className='text-black'>Set Funding Cycle</p>
                        </div>
                    </div>
                }
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
                                                        <p className='text-gray-300 text-xs'>{getEllipsisTxt('0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd')}</p>
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
                            {/* <Tab.Panel>
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
                                                <p className='text-gray-300 text-xs'>{getEllipsisTxt('0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd')}</p>
                                            </div>
                                        </div>
                                        <button className='px-4 text-xs py-2 bg-white text-gray-900 rounded-full'>
                                            Buy Token
                                        </button>
                                    </div>
                                </div>
                            </Tab.Panel> */}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div >

            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                showCTA={false}
            >
                <div className='font-montserrat p-6'>
                    {/* <Image src={walletmodal} /> */}
                    <p className='text-2xl mt-4 mb-6 text-white'>Start Fundraising</p>
                    <div className='flex flex-col text-white space-y-4'>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Target Fundraise</p>
                                <p>Max Amount: 50 ETH</p>
                            </div>
                            <input required type='number' step="0" placeholder='Enter Target Fundraise Amount' min={0} className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Fundraise Duration</p>
                            </div>
                            <input required type='date' placeholder='Enter Duration of Fundraise' className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                        </div>
                        <p className='text-green-500 text-xs font-bold'>You will have to put atleast 10% of the target fundraise to start the funding cycle. </p>
                        <div>
                            {/* <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} /> */}
                            <div className='bg-input p-3 text-center rounded-lg text-sm cursor-pointer mt-4 ' onClick={e => setUniModal(true)}>
                                <p className='text-red-500'>We only accept funds in ETH</p>
                                <p className='text-green-500'>Have funds in different token ! Swap here !</p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Enter amount</p>
                                <p>Min Investment: 5 ETH</p>
                            </div>
                            <input required type='number' step="0" placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} onFocus={() => setIsPurchaseButtonVisible(true)} className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                        </div>

                        <div className='text-center !pb-6' >
                            <button onClick={e => { setIsFunded(true); setVisible(false); }} className='bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                <p>Purchase {tokenAmount} {selectedToken?.symbol}</p>
                                <ArrowRightIcon className='w-4 h-4' />
                            </button>
                            {/* <p className='text-gray-300 text-xs mt-2'>15 MATIC = 5000 BORE</p> */}
                        </div>


                    </div>
                </div>
            </Modal>
            <Modal
                open={uniModal}
                onClose={() => setUniModal(false)}
                showCTA={false}
                title="Swap Tokens"
            >
                <div className="Uniswap p-6 flex items-center justify-center">
                    <SwapWidget
                        provider={provider}
                        jsonRpcEndpoint={jsonRpcEndpoint}


                        defaultOutputTokenAddress='NATIVE'
                        theme={darkTheme}
                        width={512}
                    />
                </div>
            </Modal>
        </div >
    )
}

export default VaultDetail