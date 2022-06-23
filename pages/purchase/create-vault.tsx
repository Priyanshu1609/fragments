import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'
// import { useAccount, useConnect } from 'wagmi'
import CreateVaultForm from '../../components/CreateVaultForm'
import CreateGovernedForm from '../../components/CreateGovernedForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { gullakFactoryContract } from '../../utils/crypto'
import sanityClient from '../../utils/sanitySetup'
import { TransactionContext } from '../../contexts/transactionContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import PurchaseNFT from '../../components/PurchaseNFT'
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'
import Modal from '../../components/Modal'

const CreateVault: React.FC = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { formData, handleCreateVault } = useContext(DataContext);
    const [vaultLink, setVaultLink] = useState("http://localhost:3000/purchase/create-vault?user=0x6d4b5acfb1c08127e8553cc41a9ac8f06610efc7");

    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)

    const router = useRouter()


    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
    }, [currentAccount])

    const sendTx = async (
        receiver: string,
        amount: number,
    ) => {
        const { ethereum } = window as any;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            ethers.utils.getAddress(receiver);
            // const hexaMessage = ethers.utils.formatBytes32String(message);
            const tx = await signer.sendTransaction({
                to: receiver,
                value: ethers.utils.parseEther(amount.toString())
            });

            return tx;
        }
    };

    const handleBack = () => {

        if (currentStep === CreateVaultStep.InputFieldsForm) {
            router.push({
                pathname: '/create-gullak',
                query: { user: currentAccount },
            })
        }
        else if (currentStep === CreateVaultStep.GovernedStep) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }
        else if (currentStep === CreateVaultStep.ImportOrPurchase) {
            formData.type === 'Public' ? setCurrentStep(CreateVaultStep.GovernedStep) : setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }



    return (
        <div className='text-white max-w-4xl mx-auto  font-montserrat sm:px-4 pb-16'>
            <div className=''>
                {
                    currentStep === CreateVaultStep.InputFieldsForm && (
                        <div>
                            <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] mb-2 text-black flex items-center justify-center space-x-4'>
                                <ArrowLeftIcon className='w-4' />
                                <span>Back</span>
                            </button>
                            <CreateVaultForm origin='purchase' setCurrentStep={setCurrentStep} />
                        </div>
                    )
                }
                {
                    currentStep === CreateVaultStep.GovernedStep && (
                        <div>
                            <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  mb-2  text-black flex items-center justify-center space-x-4'>
                                <ArrowLeftIcon className='w-4' />
                                <span>Back</span>
                            </button>
                            <CreateGovernedForm setCurrentStep={setCurrentStep} />
                        </div>
                    )
                }
                {
                    currentStep === CreateVaultStep.ImportOrPurchase && (
                        <div>
                            <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  mb-2 text-black flex items-center justify-center space-x-4'>
                                <ArrowLeftIcon className='w-4' />
                                <span>Back</span>
                            </button>
                            <PurchaseNFT setCurrentStep={setCurrentStep}  />
                        </div>
                    )
                }
                {/* <CreateGovernedForm onSubmit={handleCreateVault} /> */}
            </div>
        </div>
    )
}

export default CreateVault