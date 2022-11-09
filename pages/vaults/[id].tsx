import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { GetServerSideProps } from 'next'
import { BigNumber } from 'ethers';
import dynamic from 'next/dynamic'

import { unmarshall } from "@aws-sdk/util-dynamodb";
import Blockies from 'react-blockies';
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRightIcon, ArrowSmRightIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Modal from '../../components/Modal';
import { RenderTab } from '../dashboard';
import { getEllipsisTxt, minDtTime } from '../../utils';
import { OrdersState } from '../../components/Orders';
import { TransactionContext } from '../../contexts/transactionContext';
import { NftContext } from '../../contexts/NftContext';
import { DataContext } from '../../contexts/dataContext';
import { fixTokenURI } from '../../utils';
import { RiShareBoxLine } from "react-icons/ri";
import { MdMail } from 'react-icons/md';
import meta from '../../assets/MetaMask_Fox.svg.png'

declare var window: any

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios';
import { CreateVaultFormValues } from '../../components/CreateVaultForm';

export enum VaultDashboardTabs {
    Information = 'INFORMATION',
    Owners = 'OWNERS',
    Orders = 'ORDERS'
}

import { BsWhatsapp } from 'react-icons/bs'
import { FaTelegramPlane, FaLinkedinIn, FaRedditAlien, FaDiscord } from 'react-icons/fa'
import { TiSocialTwitter } from 'react-icons/ti'
import ConnectModalContext from '../../contexts/connectwallet';
import PageLoader from '../../components/PageLoader';
import loader from '../../assets/loader.json'
import Lottie from 'react-lottie-player'
import success from '../../assets/happy.json'
import { MdIosShare } from "react-icons/md"
import Image from 'next/image';


import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useNetwork } from 'wagmi';
import { useSwitchNetwork } from 'wagmi'
import { toast } from 'react-toastify';


const links = [
    "https://web.whatsapp.com/send?text=Hey%20bro%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments(https%3A%2F%2Ffragments.money%2F).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://telegram.me/share/url?url=Hey bro, &text=%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments(https%3A%2F%2Ffragments.money%2F).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://www.linkedin.com/shareArticle?mini=true&url=https://www.fragments.money/&title=hey).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A",
    "https://www.reddit.com/submit?url=https://www.fragments.money/&title=Hey%20bro%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://twitter.com/intent/tweet?text=Hey%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%40fragmentsHQ%20%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0Ahttps%3A%2F%2Fwww.fragments.money%2F%0AReferral%20code%3A%20"
]

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



const Loader = () => (

    <button className="flex bg-button items-center rounded-lg font-semibold px-4 py-2 text-black  w-full justify-center" disabled>
        <svg className="mr-3 h-5 w-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className=""> Please wait ... Vault is being processed! </span>
    </button>

)

const VaultDetail: React.FC = () => {
    const router = useRouter();

    const { swapModal, setSwapModal } = useContext(ConnectModalContext);
    const { connectallet, currentAccount, logout, getProvider, setIsLoading, isLoading, sendTx, getBalanace, getContractBalance } = useContext(TransactionContext);
    const { getTokens, getTokenIdMetadata } = useContext(NftContext);
    const { getVaultsByWallet, getVaultsByCreator } = useContext(DataContext);
    const [modal, setModal] = useState(false);
    const [countDown, setCountDown] = useState("");
    const [balance, setBalance] = useState("");
    const [valuation, setValuation] = useState(0)
    // const [selectedToken, setSelectedToken] = useState<selectedToken>()
    // const [selectedChain, setSelectedChain] = useState<selectedChain>()
    // const [coins, setCoins] = useState([]);
    const [purchaseForm, setPurchaseForm] = useState(false);
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


    const { chain, chains } = useNetwork()
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors } = useConnect();
    const { error, pendingChainId, switchNetwork } = useSwitchNetwork()


    const [data, setData] = useState<CreateVaultFormValues | any>();

    const { id, type } = router.query


    // console.log("owners", ownerData);
    // console.log({ ownerData });

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
    }

    const getVaultData = async () => {
        try {

            setIsLoading(true);
            console.log("getVaultData", id)
            let data: any = {}

            const body = JSON.stringify({
                "vaultAddress": id
            })
            // const response = {}
            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/get`, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );
            // console.log("FETCH RES", response.data.Items);

            response.data.Items?.forEach((element: any) => {
                // console.log(element);

                for (let i in element) {
                    data[i] = Object.values(element[i])[0]
                }

                // setCreatorVaults(prev => [...prev, d]);
            })

            let body2 = JSON.stringify({
                "vaultAddress": id
            });

            const response2 = await axios.post(`https://2phfi2xsn5.execute-api.ap-south-1.amazonaws.com/dev/api/associations/getbyvault`, body2, {
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
            let sortedProducts = [] as any;
            sortedProducts = owners.sort((p1: any, p2: any) => (p1.timestamp < p2.timestamp) ? 1 : (p1.timestamp > p2.timestamp) ? -1 : 0);

            console.log("FETCH OWNER RES", response2.data.Items)


            setData(data);
            setOwnerData(sortedProducts);

            setTokenAmount(0);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // console.log({ nfts })
    // console.log(data?.nfts)
    const getNFTs = async () => {

        if (!data?.nfts) return;

        try {
            setIsLoading(true);
            setNfts([]);

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

    const handleAddAmount = async () => {

        if (tokenAmount <= 0) {
            toast.info("Please enter a valid amount")
            return;
        }

        try {
            setIsLoading(true);
            setPurchaseForm(false);
            let tx;

            // tx = "sampletx"

            tx = await sendTx(id, tokenAmount);
            console.log("Transaction reciept", tx);
            if (!tx) {
                toast.info("Please complete the transaction");
                return;
            }


            const body = JSON.stringify({
                "vaultAddress": id,
                "amount": Number(tokenAmount),
                "fundraiseCreatedAt": Number(data?.fundraiseCreatedAt)
            })

            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/update`, body, {
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

            const response2 = await axios.post(`https://2phfi2xsn5.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
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
    const getContractBalanaceInEth = async () => {
        const balance = await getContractBalance(id);
        setValuation(balance);
    }


    useEffect(() => {
        if (data) {
            checkGovernedState();
            countDownTimer(data?.fundraiseDuration);
        }
    }, [data])

    useEffect(() => {
        if (type === "new") {
            setModal(true);
        }

    }, [type])

    useEffect(() => {
        // setTimeout(() => { setModal(true); }, 2000);
        if (id) {
            getVaultData()
            getProviderFrom();
            getBalanaceInEth();
            getContractBalanaceInEth();
        }
    }, [currentAccount, id])

    // function to capitalise first letter
    const capitalizeFirstLetter = (string: string) => {
        if (string?.length <= 1) return null;
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

    const handleOpen = (link: string) => {
        window.open(link, "_blank");
    }

    let eth: any
    if (typeof window !== 'undefined') {
        eth = window?.ethereum
    }


    const handleAddToken = async () => {

        if (!isConnected) {
            connectors.map((connector) => {
                return connect({ connector })
            })
            return;
        };

        if (chain?.id !== 80001) {
            toast.info("Switch To Polygon");
            await switchNetwork?.(80001)
        }

        eth
            .request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: data?.contractAddress,
                        symbol: 'FRAG-' + data?.tokenName,
                        decimals: 18,
                        image: 'https://iili.io/tuaadg.png',
                    },
                },
            })
            .then((success: any) => {
                if (success) {
                    toast.info(`FRAG-${data?.tokenName} successfully added to wallet!`);
                } else {
                    throw new Error('Something went wrong.');
                }
            })
            .catch(console.error);
    }

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute z-10 left-4 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
        // <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
        // <img src={RightArrow} alt="nextArrow" {...props} />
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute right-4  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>
    );

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    }

    return (
        <div className='text-white max-w-7xl mx-auto  md:flex md:flex-row-reverse md:justify-center pb-16 min-h-screen overflow-y-scroll scrollbar-hide relative'>
            {type === "new" && <Lottie
                // loop
                animationData={success}
                play
                loop={1}
                style={{ width: "100wh", height: "100vh", position: "absolute", top: "0", left: "0", right: "0", bottom: "0", overflow: "scroll", zIndex: 1 }}
            />}
            <div className='flex flex-col flex-[0.6] items-center mt-4 '>
                {data?.origin !== "private" &&
                    <div className='flex items-start justify-center rounded-xl w-full'>
                        <div className='flex-[0.8]'>
                            <div className="card__container">
                                <Slider {...settings} className=" w-[12rem] lg:w-[18rem] xl:w-[23rem] h-[18rem] lg:h-[24rem] xl:h-[30rem] !flex !items-center !justify-center">

                                    {nfts?.map((nft: any) => (
                                        <div key={nft?.image} className="mx-auto w-full">
                                            <Slider {...settings} className="card__container--inner">
                                                <img src={fixTokenURI(nft?.image)} className="rounded-t-xl overflow-hidden" />
                                                <div className='p-4 truncate text-xl bg-input rounded-b-xl'>
                                                    <div className='flex space-x-2 items-center justify-start'>
                                                        <img src={fixTokenURI(nft?.image)} className="h-5 w-5 rounded-full" />
                                                        <p className='text-sm'>{nft?.compiler}</p>
                                                    </div>
                                                    <p className='mt-2 font-britanica font-normal'>{nft?.name}</p>
                                                </div>
                                            </Slider>
                                        </div>
                                    ))}

                                </Slider>
                            </div>
                        </div>
                    </div>
                }
                <div className='flex items-start justify-center mt-4 w-full'>
                    <div className='bg-input rounded-xl w-full mx-16 p-4'>
                        <span className='border-b-[1px] border-gray-500 text-xl font-britanica font-normal text-gray-500'>Last Transaction</span>
                        <div className='mt-2 h-[28rem] overflow-y-scroll'>
                            <div className='py-4 flex flex-col items-center space-y-4 justify-between'>
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
                </div>
            </div>

            <div className={`p-6 bg-input rounded-xl ${data?.origin !== "private" && "flex-[0.4]"} ${data?.origin === "private" && "flex-[0.6]"} `}>
                <div className='flex items-center justify-between w-full z-50 '>
                    <button onClick={() =>
                        router.push({
                            pathname: `/profile/${data?.creator}`
                        })}
                        className='bg-[#1E1E24] rounded-lg flex items-center justify-center p-3 w-max z-[100]'>
                        <Blockies
                            seed='need to be changed'
                            size={7}
                            scale={3}
                            className='rounded-full mr-3'
                        />
                        <p className='text-sm'>{getEllipsisTxt(data?.creator, 5)}</p>
                    </button>
                    <button onClick={() => setModal(true)} className='flex space-x-2 text-semibold z-10 bg-[#1E1E24] rounded-lg py-2 px-3 items-center'>
                        <span>Share Link</span>
                        <MdIosShare className='h-5 w-5 text-white' />
                    </button>
                    {/* <p>{data?.vaultStatus === "RUNNING" && countDown}</p> */}
                </div>
                <div className='my-5'>
                    <h1
                        className="mb-2 font-britanica font-normal text-transparent text-2xl bg-clip-text bg-gradient-to-r from-button to-bluebutton"
                    >
                        {data?.vaultName}
                    </h1>
                    <p className='font-montserrat'>
                        {data?.description}
                    </p>
                </div >
                {data?.vaultStatus === "RUNNING" && <div className='mt-4 mb-6 z-[100]'>
                    <div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-base'>Funding raised: </p><span className=' font-britanica font-normal'>{data?.amount} ETH</span>
                            </div>
                            <div className='flex space-x-2'>
                                <p className='text-gray-300 text-base'>Funding goal: </p><span className='font-britanica font-normal'>{data?.target} ETH</span>
                            </div>
                        </div>
                        <ProgressBar completed={(Number(data?.amount) / Number(data?.target)) * 100} bgColor='#2bffb1' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                        <div className='flex justify-end space-x-2 ml-auto mt-1 mb-4'>
                            <p className='text-gray-300 text-base'>Time Left: </p><span className=' font-britanica font-normal'>{countDown}</span>
                        </div>
                        <div className='mb-5 font-montserrat font-black rounded-lg flex w-full items-center justify-between space-x-3' >
                            <div className='bg-[#1E1E24] rounded-lg w-4/6 p-3 flex space-x-3 justify-center'>
                                <p className='text-gray-300'>You Own: </p>
                                <p className='text-[#2bffb1]'>{data?.amount} ETH</p>
                            </div>
                            {data?.amount < data?.target &&
                                <button onClick={() => setPurchaseForm(true)} className='text-black font-semibold !bg-button w-2/6 p-3 m-auto rounded-lg z-10'>Buy More
                                </button>
                            }
                        </div >
                    </div>


                </div >}
                {
                    data?.amount >= data?.target && data?.vaultStatus !== "COMPLETED" && data?.vaultStatus !== "FAILURE" && <Loader />
                }
                {data?.vaultStatus === "FAILURE" &&
                    <div className='mt-4 mb-6 z-[100]' onClick={e => setVisible(true)}>
                        <div className='mb-5 !bg-red-500 font-montserrat  rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
                            <p className='text-black'>VAULT FAILURE</p>
                        </div>
                    </div>
                }
                {data?.vaultStatus === "COMPLETED" &&
                    <div className='mt-4 mb-6 z-[100]' onClick={e => setVisible(true)}>
                        <div className="flex items-center justify-evenly">
                            <div onClick={() =>
                                router.push({
                                    pathname: `/create-proposal`,
                                    query: { vault: id, user: currentAccount },
                                })
                            } className='mb-5 !bg-button font-montserrat  rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
                                <p className='text-black font-black'>Make a New Proposal</p>
                            </div>
                            <div className='mb-5 !bg-[#1E1E24]  font-montserrat  rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
                                <p className='text-white font-black'>View Proposals</p>
                            </div>
                        </div>
                        <div className='mb-5 font-montserrat font-black rounded-lg flex w-full items-center justify-between space-x-3' >
                            <div className='bg-[#1E1E24] rounded-lg w-full p-3 flex space-x-3 justify-center'>
                                <p className='text-gray-300'>You Own: </p>
                                <p className='text-[#2bffb1]'>{data?.amount} ETH</p>
                            </div>
                        </div >
                    </div>
                }

                <div>
                    <div className='mt-4'>
                        <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500'>General Information</span>
                        <div className='my-4'>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>Valuations</p>
                                    <p className='text-xl font-semibold'>{valuation} ETH</p>
                                </div>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>No. of tokens</p>
                                    <p className='text-xl font-semibold'>1000000</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>Management fee</p>
                                    <p className='text-xl font-semibold'>{data?.managementFees}</p>
                                </div>
                                {/* <div>
                                    <p className='text-xl text-white  mb-2'>Unique owners</p>
                                    <p className='text-xl font-semibold'>1</p>
                                </div> */}
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500'>Governance Information - <span className="text-white">{capitalizeFirstLetter(data?.type)}</span></span>
                        <div className='my-4'>
                            <div className='flex justify-between mb-4'>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>Voting Period</p>
                                    <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.votingPeriod : "-"}</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>Quorum</p>
                                    <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.quorum : "-"}</p>
                                </div>
                                <div>
                                    <p className='text-xl text-white font-britanica font-normal mb-2'>Min Favourable Majority</p>
                                    <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.minFavor : "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="z-[100]">
                        <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500'>Proof of Authenticity</span>
                        <div className="w-full">
                            <div className="flex w-full items-center">
                                <a href={`https://mumbai.polygonscan.com/address/${data?.contractAddress}`} target='_blank' className='mt-4 bg-[#1E1E24] p-4 m-2 rounded-lg flex flex-[0.5] justify-between  cursor-pointer'>
                                    <div className='flex items-center justify-center'>
                                        <img src="https://mumbai.polygonscan.com/images/svg/brands/poly.png?v=1.3" className='h-6 w-6 rounded-full' />
                                        <p className='ml-4'>View on PolygonScan</p>
                                    </div>
                                    <ArrowUpIcon className='h-6 w-6 rotate-45' />
                                </a>
                                <button className="flex flex-[0.5] bg-[#1E1E24] mt-4 p-4 m-2 rounded-lg justify-between items-center cursor-pointer" onClick={handleAddToken}>
                                    <p>Add Token To your Wallet</p>
                                    <Image src={meta} height={30} width={30} />
                                </button>
                            </div>
                            <a href={`https://gnosis-safe.io/app/gor:${id}/home`} target='_blank' className='mt-4 bg-[#1E1E24] p-4 m-2 rounded-lg flex justify-between cursor-pointer'>
                                <div className='flex items-center justify-center'>
                                    <img src="https://pbs.twimg.com/profile_images/1566775952620900353/vRyTLmek_400x400.jpg" className='h-6 w-6 rounded-full' />
                                    <p className='ml-4'>View on Gnosis Wallet</p>
                                </div>
                                <ArrowUpIcon className='h-6 w-6 rotate-45' />
                            </a>
                        </div>
                    </div>
                </div>
            </div >

            <Modal
                open={modal}
                onClose={() => setModal(false)}
                showCTA={false}
                title="Fundraise is now live"
            >
                <div className="flex flex-col mt-2">
                    <p className='text-left text-gray-500 font-montserrat'>Start sharing with your friends and fundraise together. </p>

                    <div className=' flex items-center justify-evenly mt-4 space-x-5'>
                        <div onClick={() => handleOpen(links[0])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
                            <BsWhatsapp className='h-10 w-10  text-[#25d366]' />
                        </div>
                        <div onClick={() => handleOpen(links[1])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
                            <FaTelegramPlane className='h-10 w-10  text-[#229ED9]' />
                        </div>
                        <div onClick={() => handleOpen(links[3])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
                            <FaDiscord className='h-10 w-10  text-[#7289da]' />
                        </div>
                        <div onClick={() => handleOpen(links[4])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
                            <TiSocialTwitter className='h-10 w-10  text-[#1da1f2]' />
                        </div>
                        <div onClick={() => handleOpen(links[4])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center'>
                            <MdMail className='h-10 w-10  text-[#4285f4]' />
                        </div>

                    </div>
                    <button type='submit'
                        onClick={() => {
                            navigator.clipboard
                                .writeText(`https://dev.fragments.money/vaults/${id}`)
                                .then(() => {
                                    toast.info(`Link copied to clipboard , https://dev.fragments.money/vaults/${id}`)
                                })
                                .catch(() => {
                                    toast.info("something went wrong while copying");
                                });
                        }}
                        className='w-full mt-4 p-3 rounded-lg !bg-button text-black flex items-center justify-center space-x-4'>
                        <span className='text-xl'>Copy</span>
                    </button>
                    <button type='submit' onClick={() => setModal(false)} className='w-full mt-4 p-3 rounded-lg !bg-[#1E1E24]  text-white flex items-center justify-center space-x-4'>
                        <span className='text-xl'>Close</span>
                    </button>
                </div>
            </Modal>
            <Modal
                open={purchaseForm}
                onClose={() => setPurchaseForm(false)}
                showCTA={false}
                title="Buy More"
            >
                <p>You can start buying from here</p>
                <div className=''>
                    <div className='p-2 text-sm bg-[#303104] text-[#FFF500] flex rounded-lg mt-4 font-montserrat '>
                        <div className='px-3'>
                            <p className='font-black'>Note: We only accepts funds in ETH</p>
                            <p className='text-[#C6BE0F]'>Have funds in different tokens? Click on swap tokens</p>
                        </div>
                        <div onClick={() => setSwapModal(true)} className='flex hover:cursor-pointer bg-[#FFF500] rounded-lg text-black font-black w-44 mx-auto items-center justify-center text-base'>
                            <div className="flex flex-col items-center justify-center">
                                <span>Swap</span>
                                <span>Tokens</span>
                            </div>
                            <ArrowSmRightIcon className='h-8 w-8' />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between text-sm text-gray-300 mb-2'>
                            <p>Enter amount</p>
                            <p>Balance: {balance} ETH</p>
                        </div>
                        <input required type='number' step="0" placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} className='bg-transparent focus:outline-none border-[1px] border-gray-600 p-4 w-full rounded-lg ' />
                    </div>

                    <div className='text-center' >
                        <button onClick={handleAddAmount} className='!bg-button flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                            <p>Purchase {tokenAmount}</p>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                    </div>
                </div>

            </Modal>
            <PageLoader bg={false} open={isLoading} onClose={() => setIsLoading(false)} img={loader} message='Waiting for transaction to complete' desc="Check the metamask window to complete the transaction. Avoid closing this tab." />

        </div>
    )
}

export default VaultDetail




