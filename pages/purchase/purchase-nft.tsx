import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';

import { requiredTag } from '../../components/CreateDAOForm';
import vault from '../../assets/vault.png';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';
import { SocketContext } from '../../contexts/socketContext';
import { TransactionContext } from '../../contexts/transactionContext';
import { bnToString, dtToString, ipfsParse, fixTokenURI } from '../../utils';
import SelectChain from '../../components/SelectChain';

interface CreateVaultFormProps {
    onSubmit: (values: CreateVaultFormValues) => void;
}

export interface CreateVaultFormValues {
    link: string;
    target: number;
    duation: any;
    amount: number,
}

const PurchaseNft: React.FC<CreateVaultFormProps> = ({
    onSubmit
}) => {


    const [selectedToken, setSelectedToken] = useState<string>("matic")
    const [selectedChain, setSelectedChain] = useState<string>("137")
    const [coins, setCoins] = useState([]);
    // const [link, setLink] = useState('');
    const [target, setTarget] = useState(0);
    const [duration, setDuration] = useState();
    const [amount, setAmount] = useState();
    const [visible, setVisible] = useState(false)
    const [order, setOrder] = useState()
    const [balance, setBalance] = useState('0');
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
    const { getBalanace, getTokenBalance } = useContext(TransactionContext);

    console.log({ selectedToken, selectedChain });

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

    const getNFTs = async (i: number) => {
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
        { selectedToken.address && fetchBalance() };
    }, [selectedToken])

    useEffect(() => {
        { links[links.length - 1].value && getNFTs(links.length - 1) };
    }, [links])


    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4  pb-24'>
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
                <div>
                    <div>
                        {links.map((item, i) => {
                            return (
                                <div className='flex justify-between mb-4'>
                                    <label className='flex-grow '>
                                        <p className='text-sm'>Opensea Link {requiredTag}</p>
                                        <input
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
                        <p className='text-center'>Add New Link + </p>
                    </div>
                    <div>
                        <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
                    </div>
                    <div className='p-2 bg-[#1E1E24] rounded-lg'>
                        <p className='text-sm text-center text-green-600'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
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
                            <p className='text-sm'>Min. Contribution <span>50 {selectedToken.symbol} ({target} ETH)</span></p>
                        </div>
                        <input type='number' className='p-4  rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>{balance} {selectedToken.symbol} </span></p>
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
        </div>
    )
}

export default PurchaseNft;