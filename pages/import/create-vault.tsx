import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/solid'


import { gullakFactoryContract } from '../../utils/crypto'
import sanityClient from '../../utils/sanitySetup'
import { DataContext, } from '../../contexts/dataContext'
import { TransactionContext } from '../../contexts/transactionContext';

import CreateVaultForm from '../../components/CreateVaultForm'
import CreateGovernedForm from '../../components/CreateGovernedForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'


const CreateVault: React.FC = () => {
    const { connectallet, currentAccount, logout, isLoading, setIsLoading } = useContext(TransactionContext);
    const { formData, defaultFormData, setFormData, getVaultsByWallet } = useContext(DataContext);

    // const [{ data: connectData }] = useConnect()
    // const [{ data: accountData }] = useAccount()
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
            setIsLoading(true);
            const vaultData = await axios.get(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults/createsafe`);
            console.log("Deployed safe address:", vaultData.data.address)
            const address = vaultData.data.address;
            console.log("FormData", values);
            // const address = "0x67407721B109232BfF825F186c8066045cFefe7F"

            const data = JSON.stringify({
                "vaultAddress": address,
                "status": 1,
                "customerId": "adsfadsf",
                "origin": values.origin,
                "vaultName": values.vaultName,
                "type": values.type,
                "description": values.description,
                "tokenName": values.tokenName,
                "numOfTokens": values.numOfTokens,
                "managementFees": values.managementFees,
                "votingPeriod": values.votingPeriod,
                "quorum": values.quorum,
                "minFavor": values.minFavor,
                "nftsImported": values.nftsImported,
                "nftsPurchased": values.nftsPurchased,
                "target": values.target,
                "fundraiseDuration": values.fundraiseDuration,
                "amount": values.myContribution
            })

            const data2 = JSON.stringify({
                "walletAddress": currentAccount,
                "amountPledged": 20,
                "timestamp": new Date().getTime(),
                "transactions": ["12"],
                "vaultAddress": address,
                "vaultName": values.vaultName,
                "target": values.target,
                "vaultStatus": 1
            });

            const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/auth/vaults`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );
            const response2 = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/put`, data2, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );

            console.log("aws res 1:", response);
            console.log("aws res 1:", response2);
            router.push({
                pathname: `/vaults/${address}`,
                query: { user: currentAccount },
            })

            await getVaultsByWallet();
            setFormData(defaultFormData)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }
    const handleBack = () => {

        if (currentStep === CreateVaultStep.InputFieldsForm) {
            router.push('/create-gullak')
        }
        else if (currentStep === CreateVaultStep.GovernedStep) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }
        else if (currentStep === CreateVaultStep.ImportOrPurchase) {
            formData.type === 'Public' ? setCurrentStep(CreateVaultStep.GovernedStep) : setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }


    return (
        <div className='text-white max-w-4xl mx-auto font-montserrat sm:px-4 pb-16 '>
            {
                currentStep === CreateVaultStep.InputFieldsForm && (
                    <div>
                        <button onClick={handleBack} className='w-1/6 p-2 mb-2 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-black flex items-center justify-center space-x-4'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>
                        <CreateVaultForm origin='import' setCurrentStep={setCurrentStep} />

                    </div>
                )
            }
            {
                currentStep === CreateVaultStep.GovernedStep && (
                    <div>
                        <button onClick={handleBack} className='w-1/6 p-2 rounded-lg mb-2 bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4'>
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
                        <button onClick={handleBack} className='w-1/6 p-2 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4 mb-2'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>

                        <ImportNFTSelect handleCreateVault={handleCreateVault} setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
        </div>
    )
}

export default CreateVault