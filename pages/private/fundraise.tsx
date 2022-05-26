import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

import { requiredTag } from '../../components/CreateDAOForm';
import vault from '../../assets/vault.png';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';
import { SocketContext } from '../../contexts/socketContext';
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

const Fundraise: React.FC<CreateVaultFormProps> = ({
    onSubmit
}) => {
    const router = useRouter();

    const [selectedToken, setSelectedToken] = useState<object>()
    const [selectedChain, setSelectedChain] = useState<object>()
    const [coins, setCoins] = useState([]);
    const [target, setTarget] = useState();
    const [duration, setDuration] = useState();
    const [amount, setAmount] = useState();
    const [visible, setVisible] = useState(false)


    const { getTokenIdMetadata } = useContext(NftContext)
    const { getSellOrder } = useContext(OpenseaContext);
    const { fetchFromTokens, transaction, chains, handleNetworkSwitch } = useContext(SocketContext);

    console.log({ selectedToken, selectedChain });


    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
            console.log('Error in values, Please input again')
            return;
        }
        const formValues: CreateVaultFormValues = {
            target,
            token_name: tokenName,
            token_supply: tokenSupply,
            management_fee: managementFee,
            type: type,
        }
        console.log(formValues)
        onSubmit(formValues);

    }



    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4 pb-24'>
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
                    <div className=''>
                        <label>
                            <p className='text-sm'>Target Fundraise {requiredTag}</p>
                            <input type='number' className='p-4 mb-6 rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Enter target fundraise amount' value={target} onChange={(e) => setTarget(e.target.value)} />
                        </label>
                        <label>
                            <p className='text-sm'>Fundraise duration{requiredTag}</p>
                            <input type='date' style={{ colorScheme: 'dark' }} className='p-4 mb-6 rounded-lg bg-[#1E1E24]  focus:outline-none w-full mt-2' value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </label>
                    </div>
                    <div className='p-2 bg-[#1E1E24]'>
                        <p className='text-sm text-center text-green-700'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
                    </div>
                    <div>
                        <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Your Contribution {requiredTag}</p>
                            <p className='text-sm'>Min. Contribution <span>50 MATIC (0.02 ETH)</span></p>
                        </div>
                        <input type='number' className='p-4  rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>50 MATIC </span></p>
                    </div>
                    <button onClick={e => router.push('/vaults/random')} type='submit' className='w-full mt-4 p-3 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                        <span>Start Fundraise</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Fundraise;