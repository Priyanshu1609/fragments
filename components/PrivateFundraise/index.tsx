import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { darkTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import Modal from '../Modal';
import { requiredTag } from '../CreateDAOForm';
import vault from '../../assets/vaultcreation.png';
import Select from '../Select';
import { NftContext } from '../../contexts/NftContext';
import { SocketContext } from '../../contexts/socketContext';
import SelectChain from '../SelectChain';
import { TransactionContext } from '../../contexts/transactionContext';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import { minDtTime } from '../../utils';

const jsonRpcEndpoint = `https://rinkeby.infura.io/v3/195d30bd1c384eafa2324e0d6baab488`;

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
}

const PrivateFundraise: React.FC<CreateVaultFormProps> = ({
    setCurrentStep
}) => {
    const router = useRouter();

    const [selectedToken, setSelectedToken] = useState()
    const [selectedChain, setSelectedChain] = useState()
    const [coins, setCoins] = useState([]);
    const [uniModal, setUniModal] = useState(false);
    const [provider, setProvider] = useState();
    const [balance, setBalance] = useState('0');
    const [safeAddress, setSafeAddress] = useState("");


    const { fetchFromTokens, transaction, chains, handleNetworkSwitch } = useContext(SocketContext);
    const { connectallet, currentAccount, logout, getProvider, getBalanace, sendTx } = useContext(TransactionContext);
    const { formData, handleCreateVault, handleChange, deploySafe, defaultFormData, setFormData } = useContext(DataContext);

    // console.log({ selectedToken, selectedChain });

    const getProviderFrom = async () => {
        const provider = await getProvider();
        setProvider(provider);
    }

    const fetchBalance = async () => {

        try {
            const balance = await getBalanace();
            setBalance(balance);
            console.log('Balance:', balance);

        } catch (error) {
            console.error(error);
        }
    }

    const createSafe = async () => {
        const address = await deploySafe();
        // const address = "0x07ae982eB736D11633729BA47D9F8Ab513caE3Fd";
        if (!address) {
            alert("Error in deploying Gnosis safe! Please try again");
            router.push({
                pathname: `/dashboard`,
                query: { user: currentAccount },
            })
            setFormData(defaultFormData)
            return;
        }
        console.log("Import page deployed address :", address);
        setSafeAddress(address);
    }

    useEffect(() => {
        createSafe();
    }, [])

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = {
            ...formData,
            fundraiseDuration: new Date(formData.fundraiseDuration).getTime() ?? 0,
        }

        handleCreateVault(form, safeAddress);
    }

    useEffect(() => {
        getProviderFrom();
        fetchBalance();
    }, [])



    return (
        <div className='text-white max-w-4xl mx-auto font-montserrat sm:px-4 pb-24'>
            <div className='flex items-center justify-between p-6 bg-[url("/Button.png")] bg-cover  rounded-lg'>
                <div>
                    <h2 className='text-black text-2xl font-semibold mb-2'>Select NFTs to fractionalise</h2>
                    <p className='text-black'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} width={150} height={150} />
                </div>
            </div>
            <form onSubmit={onSubmitHandler} className='mt-10'>
                <div>
                    <div className=''>
                        <label>
                            <p className='text-sm'>Target Fundraise {requiredTag}</p>
                            <input required type='number' step="0" min={1} className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter target fundraise amount' value={formData.target} onChange={(e) => handleChange(e, 'target')} />
                        </label>
                        <label>
                            <p className='text-sm'>Fundraise duration{requiredTag}</p>
                            <input required type='datetime-local' min={minDtTime()} style={{ colorScheme: 'dark' }} className='p-4 mb-6 rounded-lg bg-input  focus:outline-none w-full mt-2' value={formData.fundraiseDuration} onChange={(e) => handleChange(e, 'fundraiseDuration')} />
                        </label>
                    </div>
                    <div className='p-2 bg-input'>
                        <p className='text-base text-center font-bold text-green-500'>You will have to put atleast 10% of the target fundraise to start the funding cycle.</p>
                    </div>
                    <div>
                        {/* <SelectChain coins={coins} setCoins={setCoins} selectedChain={selectedChain} setSelectedChain={setSelectedChain} selectedToken={selectedToken} setSelectedToken={setSelectedToken} /> */}
                        <div className='bg-input p-3 text-center rounded-lg text-lg cursor-pointer mt-4 font-bold' onClick={e => setUniModal(true)}>
                            <p className='text-red-500'>We only accept funds in ETH</p>
                            <p className='text-green-500'>Have funds in different token ! Swap here !</p>
                        </div>

                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Your Contribution {requiredTag}</p>
                            <p className='text-sm'>Min. Contribution <span>{formData.target / 10} ETH</span></p>
                        </div>
                        <input required type='number' min={formData.target / 10} step="any" className='p-4  rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Total value of NFTs' value={formData.myContribution} onChange={(e) => handleChange(e, 'myContribution')} />
                        <p className='text-sm flex justify-end mt-1 '>Balance: <span>{balance} </span></p>
                    </div>
                    <button type='submit' className='w-full mt-4 p-3 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4'>
                        <span>Start Fundraise</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </div>
            </form>
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