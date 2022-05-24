import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';

import { requiredTag } from '../../components/CreateDAOForm';
import vault from '../../assets/vault.png';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';


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

interface CreateVaultFormProps {
    onSubmit: (values: CreateVaultFormValues) => void;
}

export interface CreateVaultFormValues {
    link: string;
    target: number;
    duation: any;
    amount: number,
}

//bignumber to number string
const bnToString = (bn) => {
    return bn ? ethers.utils.formatEther(bn.toString(10)).toString() : "";
}

const dtToString = (unixTime: any) => {
    const date = new Date(unixTime * 1000);
    return (date.toLocaleDateString("en-US") + " at " + date.toLocaleTimeString("en-US"));
}

const ipfsParse = (ipfsHash: string) => {
    return ipfsHash.replace("ipfs://", "https://ipfs.io/ipfs/");
}

const PurchaseNft: React.FC<CreateVaultFormProps> = ({
    onSubmit
}) => {

    const [selectedToken, setSelectedToken] = useState<string>("matic")
    const [selectedChain, setSelectedChain] = useState<string>("137")
    const [coins, setCoins] = useState([]);
    const [link, setLink] = useState('');
    const [target, setTarget] = useState(0);
    const [duration, setDuration] = useState();
    const [amount, setAmount] = useState();
    const [visible, setVisible] = useState(false)
    const [order, setOrder] = useState()
    console.log(target);

    const { getTokenIdMetadata } = useContext(NftContext)
    const { getSellOrder } = useContext(OpenseaContext);

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
        //     console.log('Error in values, Please input again')
        //     return;
        // }
        // const formValues: CreateVaultFormValues = {
        //     link,
        //     target,
        //     token_name: tokenName,
        //     token_supply: tokenSupply,
        //     management_fee: managementFee,
        //     type: type,
        // }
        // console.log(formValues)
        onSubmit(formValues);

    }

    const getNFTs = async () => {
        if (!link) {
            return;
        }


        const tokenId = link.split('/')[6]
        const tokenAddress = link.split('/')[5]

        console.log({ tokenId, tokenAddress })
        try {

            const _order = await getSellOrder(tokenId, tokenAddress);
            setOrder(_order);
            setVisible(true);
            setTarget(bnToString(_order?.currentPrice));

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false);
        }
    }

    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4'>
            <div className='flex items-center justify-between p-6 bg-[#1E1E24] rounded-lg'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Select NFTs to fractionalise</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} />
                </div>
            </div>
            <div className='mt-10'>
                <div>
                    <div className='flex justify-between'>
                        <label className='flex-grow '>
                            <p className='text-sm'>Opensea Link {requiredTag}</p>
                            <input type='link' className='p-3 mb-6 rounded-l-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Enter Opensea or Rarible NFT Link' value={link} onChange={(e) => setLink(e.target.value)} />
                        </label>
                        <button onClick={e => { getNFTs() }} className='w-44 mt-7 mb-6 underline text-sm rounded-r-lg text-green-500 flex justify-center items-center bg-[#1E1E24]'>Preview NFT
                            <ExternalLinkIcon className='h-6 w-6 mx-3' />
                        </button>

                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Target Fundraise {requiredTag}</p>
                            <input type='number' className='p-4 mb-6 rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={target} />
                        </label>
                        <label>
                            <p className='text-sm'>Fundraise duration{requiredTag}</p>
                            <input type='date' className='p-4 mb-6 rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Duration of NFT' value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </label>
                    </div>
                    <div className='p-2 bg-[#1E1E24]'>
                        <p className='text-sm text-center text-green-700'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
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
                    <div className='mt-4'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Your Contribution {requiredTag}</p>
                            <p className='text-sm'>Min. Contribution <span>50 MATIC ({target} ETH)</span></p>
                        </div>
                        <input type='number' className='p-4  rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>50 MATIC </span></p>
                    </div>
                    <button type='submit' className='w-full mt-4 p-3 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                        <span>Make Vault</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>
            </div>
            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                showCTA={false}
            >
                <div className='mx-4 items-center justify-center text-white !font-sora'>
                    <div className='mx-auto '>
                        <img src={order?.asset.imageUrl} className='w-full rounded-lg' />
                    </div>
                    <div className='mt-1 bg-[#262631] rounded-lg flex text-sm w-3/4 p-2'>
                        <CheckCircleIcon className='text-green-500 h-5 w-5 mx-1' />
                        <p>{order?.asset.collection.name}</p>
                    </div>
                    <p className='mt-2 !text-left '>{order.asset.name}.</p>
                    <div className=' text-xs p-2 !text-left text-slate-300'>Listed Price : <span className='text-lg mx-3 text-white font-bold'>{bnToString(order?.currentPrice)} ETH</span></div>
                    <p className=' text-sm p-2 !text-left text-slate-300'>Sale ends on {dtToString(order?.expirationTime)}</p>
                    <button onClick={() => setVisible(false)} type='submit' className='w-full p-3 rounded-lg bg-[#FDE35A] text-black flex items-center justify-center space-x-4'>
                        <span>Done </span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>

            </Modal>
        </div>
    )
}

export default PurchaseNft;