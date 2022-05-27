import React, { useState } from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { CreateVaultFormValues, CreateVaultStep } from '../../pages/import/create-vault'

interface CreateVaultFormProps {
    setFormData: (values: CreateVaultFormValues) => void;
    formData: CreateVaultFormValues
    setCurrentStep: (values: CreateVaultStep) => void;
}


const CreateGovernedForm: React.FC<CreateVaultFormProps> = ({
    formData,
    setFormData,
    setCurrentStep
}) => {

    const [voting_period, setVoting_period] = useState(0)
    const [days, setDays] = useState(0);
    const [quorum, setQuorum] = useState(0);
    const [votes_in_favor, setVotes_in_favor] = useState(0);

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
        //     console.log('Error in values, Please input again')
        //     return;
        // }
        setFormData({
            flow: formData.vaultName,
            vaultName: formData.vaultName,
            type: formData.type,
            description: formData.description,
            tokenName: formData.tokenName,
            numOfTokens: formData.numOfTokens,
            managementFees: formData.managementFees,
            votingPeriod: voting_period,
            days: days,
            quorum: quorum,
            minFavor: votes_in_favor,
            nftsImported: [],
            nftsPurchased: [],
            target: 0,
            fundraiseDuration: 0,
            myContribution: 0,
        })

        setCurrentStep(CreateVaultStep.ImportOrPurchase)
    }

    return (
        <div>
            <div className='flex items-center justify-between p-6 bg-[#0F0F13] rounded-lg'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Governance Parameters</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex'>
                        <label className='flex-grow mr-4'>
                            <p className='text-sm'>Voting Period{requiredTag}</p>
                            <input required type='number' min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Voting Period' value={voting_period} onChange={(e) => setVoting_period(parseInt(e.target.value))} />
                        </label>
                        <label className='mt-5'>
                            <input required type='number' min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Days' value={days} onChange={(e) => setDays(parseInt(e.target.value))} />
                        </label>
                    </div>
                    <div className='flex'>
                        <label className='flex-[0.5] mr-4'>
                            <p className='text-sm'>Quorum{requiredTag}</p>
                            <input required type='number' min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required' value={quorum} onChange={(e) => setQuorum(parseInt(e.target.value))} />
                        </label>
                        <label className='flex-[0.5]'>
                            <p className='text-sm'>Min. Favourable Majority{requiredTag}</p>
                            <input required type='number' min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={votes_in_favor} onChange={(e) => setVotes_in_favor(parseInt(e.target.value))} />
                        </label>
                    </div>
                    <button type='submit' className='w-full p-3 rounded-lg bg-[#EFDE5A] text-black flex items-center justify-center space-x-4'>
                        <span>Make Vault</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateGovernedForm