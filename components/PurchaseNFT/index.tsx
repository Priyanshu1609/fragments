import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';
import { darkTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import { requiredTag } from '../CreateDAOForm';
import vault from '../../assets/vault.png';
import Modal from '../Modal';
import Select from '../Select';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';
import { SocketContext } from '../../contexts/socketContext';
import { TransactionContext } from '../../contexts/transactionContext';
import { bnToString, dtToString, ipfsParse, fixTokenURI } from '../../utils';
import SelectChain from '../SelectChain';
import { CreateVaultFormValues, CreateVaultStep } from '../../pages/import/create-vault';
import { useRouter } from 'next/router';
import { BigNumber } from 'ethers';

const jsonRpcEndpoint = `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_URL}/eth/rinkeby`;

interface CreateVaultFormProps {
    setFormData: (values: CreateVaultFormValues) => void;
    formData: CreateVaultFormValues
    setCurrentStep: (values: CreateVaultStep) => void;
    handleCreateVault: (values: CreateVaultFormValues) => Promise<void>;
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
}

const PurchaseNft: React.FC<CreateVaultFormProps> = ({
    setFormData,
    formData,
    setCurrentStep,
    handleCreateVault
}) => {

    const router = useRouter()

    const [selectedToken, setSelectedToken] = useState<selectedToken>()
    const [selectedChain, setSelectedChain] = useState<selectedChain>()
    const [coins, setCoins] = useState([]);
    // const [link, setLink] = useState('');
    const [target, setTarget] = useState(0);
    const [duration, setDuration] = useState<number>();
    const [amount, setAmount] = useState();
    const [visible, setVisible] = useState(false)
    const [order, setOrder] = useState()
    const [balance, setBalance] = useState('0');
    const [provider, setProvider] = useState();
    const [links, setLinks] = useState([
        {
            type: "text",
            id: 1,
            value: ""
        }
    ]);
    console.log(target);

    const { getTokenIdMetadata } = useContext(NftContext)
    const { getSellOrder } = useContext(OpenseaContext);
    const { fetchFromTokens, transaction, chains, handleNetworkSwitch, } = useContext(SocketContext);
    const { getBalanace, getTokenBalance, getProvider } = useContext(TransactionContext);
    const [uniModal, setUniModal] = useState(false)

    console.log({ selectedToken, selectedChain });

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
    }

    const fetchBalance = async () => {

        try {
            const balance = await getTokenBalance(selectedToken.address);
            setBalance(balance);
            console.log('Balance:', balance);

        } catch (error) {
            console.error(error);
        }
    }

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
        //     console.log('Error in values, Please input again')
        //     return;
        // }
        setFormData({
            flow: formData.flow,
            vaultName: formData.vaultName,
            type: formData.type,
            description: formData.description,
            tokenName: formData.tokenName,
            numOfTokens: formData.numOfTokens,
            managementFees: formData.managementFees,
            votingPeriod: formData.votingPeriod,
            days: formData.days,
            quorum: formData.quorum,
            minFavor: formData.minFavor,
            nftsImported: [],
            nftsPurchased: links,
            target: target,
            fundraiseDuration: duration ?? 0,
            myContribution: amount ?? 0,
        })

        handleCreateVault(formData);

        router.push('/vaults/random')

    }

    const getNFTs = async (i) => {
        const link = links[i].value;

        if (!link) {
            return;
        }

        const tokenId = link.split('/')[6]
        const tokenAddress = link.split('/')[5]

        console.log({ tokenId, tokenAddress })
        try {

            const _order = await getSellOrder(tokenId, tokenAddress);
            setOrder(_order);
            setTarget(bnToString(_order?.currentPrice));
            setVisible(true);

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false);
        }
    }



    const addInput = () => {
        setLinks(s => {
            return [
                ...s,
                {
                    type: "text",
                    value: ""
                }
            ];
        });
    };

    const handleChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setLinks(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };


    useEffect(() => {
        { selectedToken?.address && fetchBalance() };
    }, [selectedToken])

    useEffect(() => {
        { links[links.length - 1].value && getNFTs(links.length - 1) };
    }, [links])

    useEffect(() => {
        getProviderFrom();
    }, [])


    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4  pb-16'>
            <div className='flex items-center justify-between p-6 bg-[#1E1E24] rounded-lg pb-16'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Select NFTs to fractionalise</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        {links.map((item, i) => {
                            return (
                                <div className='flex justify-between mb-4'>
                                    <label className='flex-grow '>
                                        <p className='text-sm'>Opensea Link {requiredTag}</p>
                                        <input required
                                            onChange={handleChange}
                                            value={item.value}
                                            id={i}
                                            type={item.type}
                                            className='p-3 rounded-l-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Enter Opensea or Rarible NFT Link'
                                        />
                                    </label>
                                    <button onClick={e => { getNFTs(i) }} className='w-44 mt-7 underline text-sm rounded-r-lg text-green-500 flex justify-center items-center bg-[#1E1E24]'>Preview NFT
                                        <ExternalLinkIcon className='h-6 w-6 mx-3' />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div onClick={addInput} className='p-3 mb-6 rounded-l-lg bg-[#1E1E24] focus:outline-none w-full mt-2 cursor-pointer'>
                        <p className='text-center flex items-center justify-center'>Add New Link <PlusIcon className='h-5 w-5 mx-3' /> </p>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Target Fundraise </p>
                            <p className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Voting Period'>
                                {target}
                            </p>
                        </label>
                        <label>
                            <p className='text-sm'>Fundraise Duation {requiredTag}</p>
                            <input required style={{ colorScheme: 'dark' }} type='date' className='p-3 mb-6 rounded-lg cursor-pointer bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Days' value={duration === 0 ? formData.days : duration} onChange={(e) => setDuration((e.target.value))} />
                        </label>
                    </div>
                    <div className='p-2 bg-[#1E1E24] rounded-lg mt-4'>
                        <p className='text-sm text-center  text-green-600'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
                    </div>
                    <div>
                        {/* <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} /> */}
                        <div className='bg-[#1E1E24] p-3 text-center rounded-lg text-sm cursor-pointer mt-4 ' onClick={e => setUniModal(true)}>
                            <p className='text-red-500'>We only accept funds in ETH</p>
                            <p className='text-green-500'>Have funds in different token ! Swap here !</p>
                        </div>

                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Your Contribution {requiredTag}</p>
                            <p className='text-sm'>Min. Contribution <span>50 {selectedToken?.symbol} ({target} ETH)</span></p>
                        </div>
                        <input required type='number' min={1} className='p-4   rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>{balance} {selectedToken?.symbol} </span></p>
                    </div>
                    <button type='submit' className='w-full mt-4 p-3 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                        <span>Make Vault</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                showCTA={false}
            >
                <div className='mx-4 items-center justify-center text-white !font-sora'>
                    <div className='mx-auto '>
                        <img src={order?.asset?.imageUrl} className='w-full rounded-lg' />
                    </div>
                    <div className='mt-1 bg-[#262631] rounded-lg flex text-sm w-3/4 p-2'>
                        <CheckCircleIcon className='text-green-500 h-5 w-5 mx-1' />
                        <p>{order?.asset?.collection.name}</p>
                    </div>
                    <p className='mt-2 !text-left '>{order?.asset?.name}.</p>
                    <div className=' text-xs p-2 !text-left text-slate-300'>Listed Price : <span className='text-lg mx-3 text-white font-bold'>{bnToString(order?.currentPrice)} ETH</span></div>
                    <p className=' text-sm p-2 !text-left text-slate-300'>Sale ends on {dtToString(order?.expirationTime)}</p>
                    <button onClick={() => setVisible(false)} type='submit' className='w-full p-3 rounded-lg bg-[#FDE35A] text-black flex items-center justify-center space-x-4'>
                        <span>Done </span>
                        <ArrowRightIcon className='w-4' />
                    </button>
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
        </div>
    )
}

export default PurchaseNft;