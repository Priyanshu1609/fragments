import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'
import CreateVaultForm from '../../components/CreateVaultForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { gullakFactoryContract } from '../../utils/crypto'
import { TransactionContext } from '../../contexts/transactionContext';
import { ArrowLeftIcon } from '@heroicons/react/solid'
import PrivateFundraise from '../../components/PrivateFundraise'
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'
import { parseCookies } from '../../utils/cookie'
import Commitee from '../../components/GovernedForm/Commitee'
import Democratic from '../../components/GovernedForm/Democratic'
import Weighted from '../../components/GovernedForm/Weighted'
import { useCookies } from 'react-cookie'

const CreateVault: React.FC = ({ data }: any) => {
    const { connectallet, currentAccount, logout, setIsLoading, awsClient } = useContext(TransactionContext);
    const { handleCreateVault } = useContext(DataContext);

    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)
    const [cookie, setCookie, removeCookie] = useCookies(["user"])

    const router = useRouter()

    useEffect(() => {
        if (!cookie.user?.currentAccount) {
            router.push('/')
        }
    }, [cookie])

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
            router.push('/create-gullak')
        }
        else if (currentStep === CreateVaultStep.Fundraise) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        } else if (currentStep === CreateVaultStep.CommiteeGoverned || currentStep === CreateVaultStep.DemocraticGoverned || currentStep === CreateVaultStep.WeightGoverned) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }

    return (
        <div className='text-white max-w-4xl mx-auto  sm:px-4 pb-16'>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <div>
                        <CreateVaultForm handleBack={handleBack} origin='private' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.CommiteeGoverned && (
                    <div>
                        <Commitee handleBack={handleBack} origin='private' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.DemocraticGoverned && (
                    <div>
                        <Democratic handleBack={handleBack} origin='private' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.WeightGoverned && (
                    <div>
                        <Weighted handleBack={handleBack} origin='private' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.Fundraise && (
                    <div>
                        <PrivateFundraise setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
        </div>
    )
}

export default CreateVault

