import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import CreateVaultForm, { CreateVaultFormValues } from '../components/CreateVaultForm'
import CreateVaultNextSteps from '../components/CreateVaultNextSteps'
import ImportNFTSelect from '../components/ImportNFTSelect'
import { gullakFactoryContract } from '../utils/crypto'
import sanityClient from '../utils/sanitySetup'

export enum CreateVaultStep {
    InputFieldsForm = 'input-fields-form',
    SelectNextSteps = 'select-next-steps',
    ImportNFTForm = 'import-nft-form',
}

const CreateVault: React.FC = () => {

    const [{ data: connectData }] = useConnect()
    const [{ data: accountData }] = useAccount()
    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)

    const router = useRouter()

    // useEffect(() => {
    //     if(!connectData.connected) {
    //         router.push('/')
    //     }
    // }, [])
    console.log(connectData)

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
            //     accountData?.address
            // )
            // console.log(tx)
            // const tx = await sendTx("0x9C01aF527f0410cf9E5A1Ba28Eb503b1D624eB1d", 0.01)
            // console.log(tx)
            setCurrentStep(CreateVaultStep.SelectNextSteps)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div className='text-white max-w-4xl mx-auto font-sora sm:px-4'>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <CreateVaultForm onSubmit={handleCreateVault} />
                )
            }
            {
                currentStep === CreateVaultStep.SelectNextSteps && (
                    <CreateVaultNextSteps onImportNFT={() => setCurrentStep(CreateVaultStep.ImportNFTForm)} />
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