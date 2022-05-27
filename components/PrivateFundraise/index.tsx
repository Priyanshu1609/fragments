import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { darkTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import Modal from '../Modal';
import { requiredTag } from '../CreateDAOForm';
import vault from '../../assets/vault.png';
import Select from '../Select';
import { NftContext } from '../../contexts/NftContext';
import { OpenseaContext } from '../../contexts/opensesContext';
import { SocketContext } from '../../contexts/socketContext';
import SelectChain from '../SelectChain';
import { TransactionContext } from '../../contexts/transactionContext';
import { CreateVaultFormValues, CreateVaultStep } from '../../pages/import/create-vault';

const jsonRpcEndpoint = `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_URL}/eth/rinkeby`;

interface CreateVaultFormProps {
    setFormData: (values: CreateVaultFormValues) => void;
    formData: CreateVaultFormValues
    setCurrentStep: (values: CreateVaultStep) => void;
    handleCreateVault: (values: CreateVaultFormValues) => Promise<void>;
}

const PrivateFundraise: React.FC<CreateVaultFormProps> = ({
    setFormData,
    formData,
    setCurrentStep,
    handleCreateVault
}) => {
    const router = useRouter();

    const [selectedToken, setSelectedToken] = useState()
    const [selectedChain, setSelectedChain] = useState()
    const [coins, setCoins] = useState([]);
    const [target, setTarget] = useState();
    const [duration, setDuration] = useState();
    const [amount, setAmount] = useState();
    const [visible, setVisible] = useState(false)
    const [uniModal, setUniModal] = useState(false);
    const [provider, setProvider] = useState();


    const { getTokenIdMetadata } = useContext(NftContext)
    const { getSellOrder } = useContext(OpenseaContext);
    const { fetchFromTokens, transaction, chains, handleNetworkSwitch } = useContext(SocketContext);
    const { connectallet, currentAccount, logout, getProvider } = useContext(TransactionContext);

    console.log({ selectedToken, selectedChain });

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
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
            nftsPurchased: [],
            target: target ?? 0,
            fundraiseDuration: duration ?? 0,
            myContribution: amount ?? 0,
        })

        handleCreateVault(formData);

        router.push('/vaults/random')

    }

    useEffect(() => {
        getProviderFrom();
    }, [])



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
                            <input required type='number' min={1} className='p-4 mb-6 rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Enter target fundraise amount' value={target} onChange={(e) => setTarget(e.target.value)} />
                        </label>
                        <label>
                            <p className='text-sm'>Fundraise duration{requiredTag}</p>
                            <input required type='date' style={{ colorScheme: 'dark' }} className='p-4 mb-6 rounded-lg bg-[#1E1E24]  focus:outline-none w-full mt-2' value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </label>
                    </div>
                    <div className='p-2 bg-[#1E1E24]'>
                        <p className='text-sm text-center text-green-700'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
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
                            <p className='text-sm'>Min. Contribution <span>50 MATIC (0.02 ETH)</span></p>
                        </div>
                        <input required type='number' className='p-4  rounded-lg bg-[#1E1E24] focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>50 MATIC </span></p>
                    </div>
                    <button onClick={e => router.push('/vaults/random')} type='submit' className='w-full mt-4 p-3 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                        <span>Start Fundraise</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>
            </div>
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

export default PrivateFundraise;