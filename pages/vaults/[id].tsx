import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { GetServerSideProps } from 'next'
import { BigNumber } from 'ethers';
import dynamic from 'next/dynamic'

const SelectChain = dynamic(
    () => import('../../components/SelectChain'),
    { ssr: false }
)

import { unmarshall } from "@aws-sdk/util-dynamodb";
import Blockies from 'react-blockies';
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRightIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';

import Modal from '../../components/Modal';
import { RenderTab } from '../dashboard';
import { getEllipsisTxt, minDtTime } from '../../utils';
import { OrdersState } from '../../components/Orders';
import { TransactionContext } from '../../contexts/transactionContext';
import { NftContext } from '../../contexts/NftContext';
import { DataContext } from '../../contexts/dataContext';
import { fixTokenURI } from '../../utils';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import axios from 'axios';
import { CreateVaultFormValues } from '../../components/CreateVaultForm';


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
        name: 'LAST TRANSACTIONS',
        value: VaultDashboardTabs.Owners
    },
]


const VaultDetail: React.FC = () => {
    const router = useRouter();

    const { connectallet, currentAccount, logout, getProvider, setIsLoading, sendTx, getBalanace } = useContext(TransactionContext);
    // const { fetchFromTokens, transaction, chains, handleNetworkSwitch, } = useContext(SocketContext);
    const { getTokens, getTokenIdMetadata } = useContext(NftContext);
    const { getVaultsByWallet, getVaultsByCreator } = useContext(DataContext);
    const [modal, setModal] = useState(false);
    const [countDown, setCountDown] = useState("");
    const [balance, setBalance] = useState("");
    // const [selectedToken, setSelectedToken] = useState<selectedToken>()
    // const [selectedChain, setSelectedChain] = useState<selectedChain>()
    // const [coins, setCoins] = useState([]);
    const [ownerData, setOwnerData] = useState<any>([]);
    const [tokenAmount, setTokenAmount] = useState<number>(0)
    const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = useState<boolean>(false)
    const [currentOrderView, setCurrentOrderView] = useState<OrdersState>(OrdersState.ACTIVE);
    const [visible, setVisible] = useState(false);
    const [nfts, setNfts] = useState<any>([]);
    const [provider, setProvider] = useState();
    const [uniModal, setUniModal] = useState(false);
    const [modalForm, setModalForm] = useState<any>({
        target: 0,
        fundraiseDuration: 0,
        amount: 0
    })
    const [data, setData] = useState<CreateVaultFormValues | any>();

    const { id } = router.query

    // console.log("owners", ownerData);

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
    }

    // setIsFunded(true)

    // const fetchTokens = async (chainId: number | undefined) => {

    //     try {
    //         const res = await fetchFromTokens(chainId);
    //         setCoins(res);

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const bridge = async () => {
    //     const fromChainId = selectedToken?.chainId
    //     const fromToken = selectedToken?.address
    //     const amount = tokenAmount
    //     const userAddress = currentAccount

    //     const txHash = await transaction(fromChainId, fromToken, amount, userAddress);

    //     console.log('Destination Socket Tx', txHash)
    // }

    const getVaultData = async () => {
        try {

            setIsLoading(true);
            console.log("getVaultData", id)
            let data: any = {}

            const body = JSON.stringify({
                "vaultAddress": id,
            })
            // const response = {}
            const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults/get`, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );
            console.log("FETCH RES", response.data.Item);


            for (let i in response.data.Item) {
                // console.log(i, Object.values(response.data.Item[i])[0])
                data[i] = Object.values(response.data.Item[i])[0]
            }

            let body2 = JSON.stringify({
                "vaultAddress": id
            });

            const response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/getbyvault`, body2, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            let owners = [] as any;
            for (let i in response2.data.Items) {
                // console.log(i, Object.values(response2.data.Items[i])[0])
                const regularObject = unmarshall(response2.data.Items[i]);
                owners.push(regularObject);
            }
            // owners[i] = temp;

            console.log("FETCH OWNER RES", response2.data.Items)


            setData(data);
            setOwnerData(owners);

            setTokenAmount(0);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    console.log({ nfts })
    // console.log(data?.nfts)
    const getNFTs = async () => {

        if (!data?.nfts) return;

        try {
            setIsLoading(true);

            const nfts = data?.nfts;
            console.log("nfts fetched", data?.nfts);

            nfts?.forEach(async (link: string) => {

                const tokenId = link.split('/')[6]
                const tokenAddress = link.split('/')[5]

                console.log({ tokenId, tokenAddress })
                if (tokenAddress && tokenId) {

                    let data = await getTokenIdMetadata(tokenId, tokenAddress);
                    setNfts((prev: any) => ([...prev, data]));
                }

                // data.forEach((e: any) => {
                //     let metadata = JSON.parse(e.metadata)
                // });
            });


        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getNFTs();
    }, [data])

    // console.log('NFTS:', nfts);

    const handleModalSubmit = async (e: any) => {
        e.preventDefault();

        if (modalForm.amount <= 0) {
            alert(`Please enter a valid amount`)
            return;
        }
        if (data?.target > 0) {
            if (modalForm.amount > (data?.target) - (data?.amount)) {
                alert(`Please enter a valid amount, ${data?.amount}, ${data?.target}, ${modalForm.amount}`)
                return;
            }
        }

        try {
            setIsLoading(true);
            let tx;
            if (modalForm.amount > 0) {

                tx = await sendTx(id, modalForm.amount);
                console.log("Transaction reciept", tx);
                if (!tx) {
                    alert("Please complete the transaction");
                    return;
                }
            }

            const body = JSON.stringify({
                "vaultAddress": id,
                "amount": modalForm.amount,
                "fundraiseDuration": new Date(modalForm.fundraiseDuration).getTime(),
                "target": modalForm.target
            })

            const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults/update `, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );

            countDownTimer(data?.fundraiseDuration);

            const data2 = JSON.stringify({
                "walletAddress": currentAccount,
                "amountPledged": modalForm.amount,
                "timestamp": new Date().getTime(),
                "transactionHash": tx.hash,
                "vaultAddress": id,
                "vaultName": data?.vaultName,
                "target": modalForm.target,
                "vaultStatus": "RUNNING",
            });

            const response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            await getVaultData();
            await getVaultsByWallet();
            await getVaultsByCreator()

            setVisible(false);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }

    }

    const handleAddAmount = async () => {

        if (tokenAmount <= 0 || tokenAmount >= data?.target - data?.amount) {
            alert("Please enter a valid amount")
            return;
        }

        try {
            setIsLoading(true);
            let tx;


            tx = await sendTx(id, tokenAmount);
            console.log("Transaction reciept", tx);
            if (!tx) {
                alert("Please complete the transaction");
                return;
            }

            const body = JSON.stringify({
                "vaultAddress": id,
                "amount": Number(tokenAmount),
                "fundraiseDuration": data?.fundraiseDuration,
                "target": data?.target
            })

            const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults/update `, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );

            console.log("adding amount", response, Number(data?.amount), Number(tokenAmount));

            // countDownTimer(data?.fundraiseDuration);

            const data2 = JSON.stringify({
                "walletAddress": currentAccount,
                "amountPledged": tokenAmount,
                "timestamp": new Date().getTime(),
                "transactionHash": tx.hash,
                "vaultAddress": id,
                "vaultName": data?.vaultName,
                "target": data?.target,
                "vaultStatus": "RUNNING",
            });

            const response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            await getVaultData();
            await getVaultsByCreator()
            await getVaultsByWallet();
            setTokenAmount(0);
            setVisible(false);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const checkGovernedState = async () => {
        if (data?.type === "Public" && tabs.length === 2 && data?.origin !== "private") {
            console.log("pushed", data?.type);
            tabs.push({
                name: 'GOVERNED',
                value: VaultDashboardTabs.Orders
            })
        }
    }


    const countDownTimer = (countDownDate: any) => {
        if (!countDownDate) { return }

        var x = setInterval(function () {

            var now = new Date().getTime();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);


            setCountDown(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")

            if (distance < 0) {
                clearInterval(x);
                setCountDown("");
            }
        }, 1000);
    }

    const getBalanaceInEth = async () => {
        const balance = await getBalanace();
        setBalance(balance);
    }


    useEffect(() => {
        if (data) {
            checkGovernedState();
            countDownTimer(data?.fundraiseDuration);
        }
    }, [data])

    useEffect(() => {
        // setTimeout(() => { setModal(true); }, 2000);
        if (id) {
            getVaultData()
            getProviderFrom();
            getBalanaceInEth();
        }
    }, [currentAccount, id])


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
        <div className='text-white max-w-7xl mx-auto font-montserrat md:flex md:flex-row-reverse md:justify-center pb-16 min-h-screen overflow-y-scroll scrollbar-hide'>
            {data?.origin !== "private" && <div className='flex flex-[0.6]  items-start justify-center mt-4'>
                <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 mt-64'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
                <div className='flex-[0.8]  p-4'>
                    <div>
                        <Swiper
                            ref={sliderRef}
                            // navigation={true}
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
                                <div key={nft?.image}>
                                    <SwiperSlide>
                                        <img src={fixTokenURI(nft?.image)} />
                                    </SwiperSlide>

                                </div>

                            ))}
                        </Swiper>
                    </div>
                </div>
                <div onClick={handleNext} className='cursor-pointer mt-64  bg-gray-300 rounded-full p-2 '><ChevronRightIcon className='text-white h-7 w-7' /></div>
            </div>}
            {/* <div className=' p-6 flex-[0.4] '> */}
            <div className={`p-6 ${data?.origin !== "private" && "flex-[0.4]"} ${data?.origin === "private" && "flex-[0.6]"} `}>
                <div className='flex items-center justify-between'>
                    <div className='bg-input rounded-lg flex items-center justify-center p-3 w-max'>
                        <Blockies
                            seed='need to be changed'
                            size={7}
                            scale={3}
                            className='rounded-full mr-3'
                        />
                        <p className='text-sm'>{data?.tokenName}</p>
                    </div>
                    <p>{data?.vaultStatus === "RUNNING" && countDown}</p>
                </div>
                <div className='mt-5 mb-5'>
                    <h2 className='text-2xl font-semibold text-[#2bffb1]  mb-2'>{data?.vaultName}</h2>
                    <p>
                        {data?.description}
                    </p>
                </div >
                {data?.amount > 0 ? <div className='mt-4 mb-6'>
                    <div className='mb-5 bg-input rounded-lg flex space-x-3 p-3 w-full items-center justify-center' >
                        <p className='text-sm text-gray-300'>You have deposited: </p>
                        <p className='text-[#2bffb1] text-sm'>{data?.amount} ETH</p>
                    </div >
                    <div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-sm'>Fund raised: </p><span className='text-sm font-semibold'>{data?.amount} ETH</span>
                            </div>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-sm'>Funding goal: </p><span className='text-sm font-semibold'>{data?.target} ETH</span>
                            </div>
                        </div>
                        <ProgressBar completed={Number(data?.amount) / Number(data?.target)} bgColor='#2bffb1' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                    </div>
                    {
                        data?.vaultStatus === "RUNNING" && data?.amount < data?.target ? <div>
                            <div className='h-full'>
                                <SelectChain />
                            </div>
                            <div className='mt-4'>
                                <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                    <p>Enter amount</p>
                                    <p>Balance: {balance} ETH</p>
                                </div>
                                <input required type='number' step="0" placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                            </div>

                            <div className='text-center' >
                                <button onClick={handleAddAmount} className='bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                    <p>Purchase {tokenAmount}</p>
                                    <ArrowRightIcon className='w-4 h-4' />
                                </button>
                                {/* <p className='text-gray-300 text-xs mt-2'>15 MATIC = 5000 BORE</p> */}
                            </div>
                        </div> :
                            <div>
                                <div className='bg-input p-3 text-center rounded-lg text-2xl mt-4'>
                                    <p className='text-red-500'>Fundraise is {data?.vaultStatus}</p>
                                </div>

                            </div>
                    }


                </div > :
                    <div className='mt-4 mb-6' onClick={e => setVisible(true)}>
                        <div className='mb-5 bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
                            <p className='text-black'>Set Funding Cycle</p>
                        </div>
                    </div>
                }
                <div>
                    <Tab.Group>
                        <Tab.List className='flex p-1 !pb-0 w-full space-x-1'>
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
                                            <p className='text-xl font-semibold'>{data?.managementFees}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Unique owners</p>
                                            <p className='text-xl font-semibold'>1</p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='py-4'>
                                    {/* <div className='flex justify-between items-center mb-4'>
                                        <p>Vault owners</p>
                                        <button className='bg-white rounded-lg p-2 text-sm text-gray-900'>Add owner</button>
                                    </div> */}
                                    <div>
                                        <div className='py-4 flex flex-col items-center space-y-4 justify-between border-y-2 border-[#1E1E24]'>
                                            {
                                                ownerData?.map((owner: any, index: number) => (
                                                    <div key={index} className='flex items-center w-full justify-between'>
                                                        <div className='flex space-x-3'>
                                                            <Blockies
                                                                seed='need to be changed'
                                                                size={19}
                                                                scale={2}
                                                                className='rounded-full mr-3'
                                                            />
                                                            <div className='flex items-center justify-center'>
                                                                <p className='font-semibold text-base'>
                                                                    {getEllipsisTxt(owner.walletAddress)}
                                                                </p>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-sm'>{parseFloat(((owner?.amountPledged / owner?.target) * 1000000).toString()).toFixed(2) + "  frag-" + data?.tokenName}</p>
                                                            {/* <p className='text-[#D0D0DA] text-xs'>$ 341,315</p> */}
                                                        </div>
                                                        <div>
                                                            <p>{owner.amountPledged} ETH</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>

                            {data?.type !== "Private" && data?.origin !== "private" && <Tab.Panel>
                                <div className='py-4'>
                                    <p className='font-semibold text-lg mb-4'>Governed Parameters</p>

                                    <div className='flex justify-between mb-4'>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Voting Period</p>
                                            <p className='text-xl font-semibold'>{data?.votingPeriod}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-6'>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Quorum</p>
                                            <p className='text-xl font-semibold'>{data?.quorum}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-white opacity-70 mb-2'>Min Favourable Majority</p>
                                            <p className='text-xl font-semibold'>{data?.minFavor}</p>
                                        </div>

                                    </div>
                                </div>
                            </Tab.Panel>}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <div>
                    <a href={`https://mumbai.polygonscan.com/address/${data?.contractAddress}`} target='_blank' className='mt-4 bg-input p-4 m-2 rounded-md flex justify-between  cursor-pointer'>
                        <p className='ml-4'>View on PolygonScan</p>
                        <ArrowUpIcon className='h-6 w-6 rotate-45' />
                    </a>
                    <a href={`https://gnosis-safe.io/app/rin:${id}/home`} target='_blank' className='mt-4 bg-input p-4 m-2 rounded-md flex justify-between cursor-pointer'>
                        <p className='ml-4'>View on Gnosis Wallet</p>
                        <ArrowUpIcon className='h-6 w-6 rotate-45' />
                    </a>
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
                    <form onSubmit={handleModalSubmit} className='flex flex-col text-white space-y-4'>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Target Fundraise</p>
                                <p>Max Amount: 50 ETH</p>
                            </div>
                            <input required type='number' step="any" placeholder='Enter Target Fundraise Amount' min={0} className='bg-input p-4 w-full rounded-lg focus:outline-none' value={modalForm.target} onChange={e => setModalForm((prev: any) => ({ ...prev, target: e.target.value }))} />
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Fundraise Duration</p>
                            </div>
                            <input required type='datetime-local' min={minDtTime()} style={{ colorScheme: 'dark' }} className='p-4 mb-6 rounded-lg bg-input  focus:outline-none w-full mt-2' value={modalForm.fundraiseDuration} onChange={e => setModalForm((prev: any) => ({ ...prev, fundraiseDuration: e.target.value }))} />
                        </div>
                        <p className='text-green-500 text-xs font-bold'>You will have to put atleast 10% of the target fundraise to start the funding cycle. </p>
                        <div>
                            <SelectChain />
                            {/* <div className='bg-input p-3 text-center rounded-lg text-sm cursor-pointer mt-4 ' onClick={e => setUniModal(true)}>
                                <p className='text-red-500'>We only accept funds in ETH</p>
                                <p className='text-green-500'>Have funds in different token ! Swap here !</p>
                            </div> */}
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-gray-300 mb-2'>
                                <p>Enter amount</p>
                                <p>Min Investment: {modalForm.target / 10} ETH</p>
                            </div>
                            <input required type='number' step="any" placeholder='Enter amount' min={modalForm.target / 10} value={modalForm.amount} onChange={e => setModalForm((prev: any) => ({ ...prev, amount: e.target.value }))} className='bg-input p-4 w-full rounded-lg focus:outline-none' />
                        </div>

                        <div className='text-center !pb-6' >
                            <button type="submit" className='bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                <p>Purchase {modalForm.value} </p>
                                <ArrowRightIcon className='w-4 h-4' />
                            </button>

                        </div>

                    </form>
                </div>
            </Modal>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                showCTA={false}
                title="Start Funding Cycle"
            >
                <div className="p-6 flex flex-col items-center justify-center">
                    <p className='text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius doloremque harum minus sapiente </p>
                    <div className='w-full p-3  mt-4'>
                        <p className='text-gray-300 text-left'>Private Vault Link</p>
                        <div className='rounded-l-lg focus:outline-none  bg-input w-full mt-2  flex'>
                            <p className='text-ellipsis p-4 my-auto w-4/5 rounded-tl-lg rounded-bl-lg overflow-hidden'>
                                {`https://www.fragments.money/vaults/${id}`}
                            </p>
                            <button className='bg-gray-700 p-4 w-1/5 rounded-tr-lg rounded-br-lg' onClick={() => { navigator.clipboard.writeText(`https://www.fragments.money/vaults/${id}`); alert("Copied") }}>
                                Copy
                            </button>
                        </div>
                    </div>
                    <button type='submit' onClick={() => setModal(false)} className='w-full mt-4 p-3 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4'>
                        <span className='text-base'>Done</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>
            </Modal>
        </div >
    )
}

export default VaultDetail




