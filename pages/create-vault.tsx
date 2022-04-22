import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useConnect } from 'wagmi'
import CreateVaultForm from '../components/CreateVaultForm'
import ImportNFTSelect from '../components/ImportNFTSelect'

export enum CreateVaultStep {
    InputFieldsForm = 'input-fields-form',
    ImportNFTForm = 'import-nft-form',
}

const CreateVault: React.FC = () => {

    const [{ data: connectData }] = useConnect()
    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className='text-white max-w-4xl mx-auto font-sora'>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <CreateVaultForm onSubmit={() => setCurrentStep(CreateVaultStep.ImportNFTForm)} />
                )
            }
            {
                currentStep === CreateVaultStep.ImportNFTForm && (
                    <ImportNFTSelect onSubmit={() => router.push('/vaults/random')} />
                )
            }
        </div>
    )
}

export default CreateVault