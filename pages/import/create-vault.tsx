import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/solid'


import { gullakFactoryContract } from '../../utils/crypto'
import { DataContext, } from '../../contexts/dataContext'
import { TransactionContext } from '../../contexts/transactionContext';

import CreateVaultForm from '../../components/CreateVaultForm'
import CreateGovernedForm from '../../components/CreateGovernedForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'
import SetFundingCycle from '../../components/SetFundingCycle'
import { parseCookies } from '../../utils/cookie'
import { useCookies } from 'react-cookie'


const CreateVault: React.FC = ({ data }: any) => {
    const router = useRouter()

    const { connectallet, currentAccount, awsClient } = useContext(TransactionContext);
    const { formData, } = useContext(DataContext);

    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)
    const [cookie, setCookie, removeCookie] = useCookies(["user"])

    useEffect(() => {
        if (!cookie.user?.currentAccount) {
            router.push('/')
        }
    }, [cookie])


    const handleBack = () => {

        if (currentStep === CreateVaultStep.InputFieldsForm) {
            router.push('/create-gullak')
        }
        else if (currentStep === CreateVaultStep.CommiteeGoverned) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }
        else if (currentStep === CreateVaultStep.Import) {
            formData.type === 'Public' ? setCurrentStep(CreateVaultStep.CommiteeGoverned) : setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }


    return (
        <div className='text-white mx-auto  sm:px-4 pb-16 '>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <div>
                        <CreateVaultForm handleBack={handleBack} origin='import' setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.CommiteeGoverned && (
                    <div>
                        <CreateGovernedForm handleBack={handleBack} setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.Import && (
                    <div>
                        <ImportNFTSelect setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.FundingCycle && (
                    <div>
                        <SetFundingCycle setCurrentStep={setCurrentStep} />
                    </div>
                )
            }

        </div>
    )
}

export default CreateVault

