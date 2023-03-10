import axios from 'axios'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'
// import { useAccount, useConnect } from 'wagmi'
import CreateVaultForm from '../../components/CreateVaultForm'
import CreateGovernedForm from '../../components/CreateGovernedForm'
import ImportNFTSelect from '../../components/ImportNFTSelect'
import { gullakFactoryContract } from '../../utils/crypto'
import { TransactionContext } from '../../contexts/transactionContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import PurchaseNFT from '../../components/PurchaseNFT'
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../../components/CreateVaultForm'
import Modal from '../../components/Modal'
import { parseCookies } from '../../utils/cookie'

const CreateVault: React.FC = ({ data }: any) => {
    const { currentAccount, awsClient } = useContext(TransactionContext);
    const { formData, handleCreateVault } = useContext(DataContext);
    const [vaultLink, setVaultLink] = useState("http://localhost:3000/purchase/create-vault?user=0x6d4b5acfb1c08127e8553cc41a9ac8f06610efc7");

    const [currentStep, setCurrentStep] = React.useState(CreateVaultStep.InputFieldsForm)

    const router = useRouter()


    useEffect(() => {
        if (!data.user) {
            router.push('/')
        }
    }, [data.user])

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
        else if (currentStep === CreateVaultStep.CommiteeGoverned) {
            setCurrentStep(CreateVaultStep.InputFieldsForm)
        }
        else if (currentStep === CreateVaultStep.Purchase) {
            formData.type === 'Public' ? setCurrentStep(CreateVaultStep.CommiteeGoverned) : setCurrentStep(CreateVaultStep.InputFieldsForm)
        }

    }



    return (
        <div className='text-white max-w-4xl mx-auto   sm:px-4 pb-16'>
            <div className=''>
                {
                    currentStep === CreateVaultStep.InputFieldsForm && (
                        <div>
                            <CreateVaultForm handleBack={handleBack} origin='purchase' setCurrentStep={setCurrentStep} />
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
                    currentStep === CreateVaultStep.Purchase && (
                        <div>
                            <PurchaseNFT setCurrentStep={setCurrentStep} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CreateVault

export async function getServerSideProps({ req, res }: any) {

    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }

    return { props: { data } }
}