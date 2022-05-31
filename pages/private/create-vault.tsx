import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'
import CreateVaultForm from '../../components/CreateVaultForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { gullakFactoryContract } from '../../utils/crypto'
import sanityClient from '../../utils/sanitySetup'
import { TransactionContext } from '../../contexts/transactionContext';
import { ArrowLeftIcon } from '@heroicons/react/solid'
import PrivateFundraise from '../../components/PrivateFundraise'
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'

const CreateVault: React.FC = () => {
    const { connectallet, currentAccount, logout } = useContext(TransactionContext);
    const { formData, setFormData, handleChange, defaultFormData } = useContext(DataContext);

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

    const handleCreateVault = async (values: CreateVaultFormValues) => {
        try {
            // const vaultData = await axios.get(`http://stage-safe-api.gullak.party:3000/api/v1/daos/createSafe`);
            // console.log(vaultData.data)
            // const request = {
            //     ...values,
            //     vault_address: "0x9C01aF527f0410cf9E5A1Ba28Eb503b1D624eB1d",
            //     _type: 'vault'
            // }
            // const response = await sanityClient.create(request)
            // const tx = await gullakFactoryContract()?.create(
            //     values.name,
            //     values.description,
            //     values.token_name,
            //     0,
            //     values.token_supply,
            //     currentAccount
            // )
            // console.log(tx)
            // const tx = await sendTx("0x9C01aF527f0410cf9E5A1Ba28Eb503b1D624eB1d", 0.01)
            // console.log(tx)

            setFormData(defaultFormData)
            router.push('/vaults/random')
        } catch (error) {
            console.error(error)
        }
    }

    const handleBack = () => {

        if (currentStep === CreateVaultStep.InputFieldsForm) {
            router.push('/create-gullak')
        }
        else if (currentStep === CreateVaultStep.Fundraise) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }

    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4'>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <div>
                        <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>
                        <CreateVaultForm flow='private' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.Fundraise && (
                    <div>
                        <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>
                        <PrivateFundraise handleCreateVault={handleCreateVault} setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
        </div>
    )
}

export default CreateVault