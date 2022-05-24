import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
// 
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

const chains = [
    {
        "chainId": 1,
        "name": "Ethereum",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg",
    },
    {
        "chainId": 10,
        "name": "Optimism",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Optimism.svg",
    },
    {
        "chainId": 56,
        "name": "BSC",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/BSC.svg",
    },
    {
        "chainId": 100,
        "name": "Gnosis",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/gnosis.svg",
    },
    {
        "chainId": 137,
        "name": "Polygon",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Matic.svg",
    },
    {
        "chainId": 250,
        "name": "Fantom",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Fantom.svg",
    },
    {
        "chainId": 42161,
        "name": "Arbitrum",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Arbitrum.svg",
    },
    {
        "chainId": 43114,
        "name": "Avalanche",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/Avalanche.svg",
    },
    {
        "chainId": 1313161554,
        "name": "Aurora",
        "icon": "https://movricons.s3.ap-south-1.amazonaws.com/aurora.svg",
    }
]

const bnToString = (bn) => {
    return bn ? ethers.utils.formatEther(bn.toString(10)).toString() : "";
}

const dtToString = (unixTime: any) => {
    const date = new Date(unixTime * 1000);
    return (date.toLocaleDateString("en-US") + " at " + date.toLocaleTimeString("en-US"));
}

const ipfsParse = (ipfsHash: string) => {
    return ipfsHash?.replace("ipfs://", "https://ipfs.io/ipfs/");
}



const VaultDetail: React.FC = () => {
    const router = useRouter();

    const { connectallet, currentAccount, logout } = useContext(TransactionContext);
    const { fetchFromTokens, transaction, getQuote } = useContext(SocketContext);
    const { getTokens } = useContext(NftContext);
    const { } = useContext(OpenseaContext);

    // const [{ data: connectData }] = useConnect()
    // const [{ data: accountData }] = useAccount({
    //     fetchEns: true,
    // })
    const [selectedToken, setSelectedToken] = useState<string>("matic")
    const [selectedChain, setSelectedChain] = useState<string>("137")
    const [coins, setCoins] = useState([]);
    const [tokenAmount, setTokenAmount] = useState<number>(0)
    const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = useState<boolean>(false)
    const [currentOrderView, setCurrentOrderView] = useState<OrdersState>(OrdersState.ACTIVE);
    const [isFunded, setIsFunded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [nfts, setNfts] = useState([]);


    // console.log('Coins', coins)
    console.log({ selectedToken, selectedChain });

    const fetchTokens = async (chainId: string) => {

        try {

            const res = await fetchFromTokens(chainId);
            setCoins(res);

        } catch (error) {
            console.error(error);
        }
    }

    const bridge = async () => {
        const fromChainId = `${selectedToken.chainId}`
        const fromToken = `${selectedToken.address}`
        const amount = `${tokenAmount}`
        const userAddress = `${currentAccount}`

        const txHash = await transaction(fromChainId, fromToken, amount, userAddress);

        console.log('Destination Socket Tx', txHash)
    }

    // const handleNetworkSwitch = async (chainId) => {
    //     const chains = networks.networks
    //     try {

    //         if (!window.ethereum) throw new Error("No crypto wallet found");
    //         await window.ethereum.request({
    //             method: "wallet_addEthereumChain",
    //             params: [
    //                 {
    //                     ...chains[chainId]
    //                 }
    //             ]
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const handleNetworkSwitch = async (chainId) => {
        const chains = networks.networks
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        ...chains[chainId]
                    }
                ]
            });
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            ...chains[chainId]
                        }
                    ]
                });
            }
        }
    };
    const getNFTs = async () => {

        try {

            const data = await getTokens(currentAccount);
            console.log(data);

            data.forEach(e => {
                let metadata = JSON.parse(e.metadata)
                setNfts([...nfts, metadata]);
            });

            console.log('Data', data);
            console.log('NFTs:', nfts);

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false);
        }
    }


    useEffect(() => {
        fetchTokens(selectedChain.chainId);
        handleNetworkSwitch(selectedChain.chainId);
    }, [selectedChain])

    // useEffect(() => {
    //     if (!currentAccount) {
    //         router.push('/')
    //     }
    // }, [currentAccount])

    useEffect(() => {
        getNFTs();
    }, [])



    return (
        <div className='text-white max-w-7xl mx-auto font-sora md:flex md:flex-row-reverse'>
            {true && <div className='flex flex-[0.5] mx-4 items-center justify-center mt-16'>
                <div className='cursor-pointer  bg-gray-500 rounded-full p-2'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
                <div className='flex-[0.8] mx-auto p-4'>
                    <img src={ipfsParse(nfts[0]?.image)} className='w-full rounded-lg' />
                    <p className='!bg-[#1E1E24] p-3 w-36 rounded-2xl mx-auto z-50'>{nfts[0]?.name}</p>
                </div>
                <div className='cursor-pointer  bg-gray-500 rounded-full p-2'><ChevronRightIcon className='text-white h-7 w-7' /></div>
            </div>}
            <div className='bg-[#0F0F13] p-6 flex-[0.5] '>
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
                {isFunded ? <div className='mt-4 mb-6'>
                    <div className='mb-5 bg-[#1E1E24] rounded-lg flex space-x-3 p-3 w-full items-center justify-center'>
                        <p className='text-sm text-[#70707C]'>You have deposited: </p>
                        <p className='text-[#FFE55B] text-sm'>5000 ETH</p>
                    </div>
                    <div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='flex space-x-2'>
                                <p className='text-[#70707C] text-sm'>Fund raised: </p><span className='text-sm font-semibold'>1000 ETH</span>
                            </div>
                            <div className='flex space-x-2'>
                                <p className='text-[#70707C] text-sm'>Funding goal: </p><span className='text-sm font-semibold'>1300 ETH</span>
                            </div>
                        </div>
                        <ProgressBar completed={60} bgColor='#24CA49' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div>
                            <p className='text-xs text-[#70707C]'>Select Token</p>
                            <Select
                                options={coins}
                                value={selectedToken}
                                onChange={(value) => setSelectedToken(value)}
                            />
                        </div>
                        <div>
                            <p className='text-xs text-[#70707C]'>Select Chain</p>
                            <Select
                                options={chains}
                                value={selectedChain}
                                onChange={(value) => setSelectedChain(value)}
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='flex justify-between text-sm text-[#70707C] mb-2'>
                            <p>Enter amount</p>
                            {/* <p>Balance: 32 ETH</p> */}
                        </div>
                        <input type='number' placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} onFocus={() => setIsPurchaseButtonVisible(true)} className='bg-[#1E1E24] p-4 w-full rounded-lg focus:outline-none' />
                    </div>
                    {
                        isPurchaseButtonVisible && (
                            <div className='text-center' >
                                <button onClick={bridge} className='bg-[#FFE55B] flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                    <p>Purchase {tokenAmount} {selectedToken.symbol}</p>
                                    <ArrowRightIcon className='w-4 h-4' />
                                </button>
                                {/* <p className='text-[#70707C] text-xs mt-2'>15 MATIC = 5000 BORE</p> */}
                            </div>
                        )
                    }
                </div> :
                    <div className='mt-4 mb-6' onClick={e => setVisible(true)}>
                        <div className='mb-5 bg-[#E4D95A] rounded-lg flex space-x-3 p-3 w-full items-center justify-center cursor-pointer'>
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

            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                showCTA={false}
            >
                <div className='font-sora'>
                    {/* <Image src={walletmodal} /> */}
                    <p className='text-2xl mt-4 mb-6 text-white'>Start Fundraising</p>
                    <div className='flex flex-col text-white space-y-4'>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-[#70707C] mb-2'>
                                <p>Target Fundraise</p>
                                <p>Max Amount: 50 ETH</p>
                            </div>
                            <input type='number' placeholder='Enter Target Fundraise Amount' min={0} className='bg-[#1E1E24] p-4 w-full rounded-lg focus:outline-none' />
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-[#70707C] mb-2'>
                                <p>Fundraise Duration</p>
                            </div>
                            <input type='date' placeholder='Enter Duration of Fundraise' className='bg-[#1E1E24] p-4 w-full rounded-lg focus:outline-none' />
                        </div>
                        <p className='text-green-500 text-xs font-bold'>You will have to put atleast 10% of the target fundraise to start the funding cycle. </p>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <div>
                                <p className='text-xs text-[#70707C]'>Select Token</p>
                                <Select
                                    options={coins}
                                    value={selectedToken}
                                    onChange={(value) => setSelectedToken(value)}
                                />
                            </div>
                            <div>
                                <p className='text-xs text-[#70707C]'>Select Chain</p>
                                <Select
                                    options={chains}
                                    value={selectedChain}
                                    onChange={(value) => setSelectedChain(value)}
                                />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='flex justify-between text-sm text-[#70707C] mb-2'>
                                <p>Enter amount</p>
                                <p>Min Investment: 5 ETH</p>
                            </div>
                            <input type='number' placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} onFocus={() => setIsPurchaseButtonVisible(true)} className='bg-[#1E1E24] p-4 w-full rounded-lg focus:outline-none' />
                        </div>
                        {
                            isPurchaseButtonVisible && (
                                <div className='text-center' >
                                    <button onClick={e => { setIsFunded(true); setVisible(false); }} className='bg-[#FFE55B] flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                                        <p>Purchase {tokenAmount} {selectedToken.symbol}</p>
                                        <ArrowRightIcon className='w-4 h-4' />
                                    </button>
                                    {/* <p className='text-[#70707C] text-xs mt-2'>15 MATIC = 5000 BORE</p> */}
                                </div>
                            )
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VaultDetail