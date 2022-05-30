import React, { useState, useContext } from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
}


const CreateGovernedForm: React.FC<CreateVaultFormProps> = ({
    setCurrentStep
}) => {

    const { formData, setFormData, handleChange } = useContext(DataContext);

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
        //     console.log('Error in values, Please input again')
        //     return;
        // }

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
                        <label className='flex-[0.7] mr-4'>
                            <p className='text-sm'>Voting Period{requiredTag}</p>
                            <p className='text-sm mt-2'>Hours</p>

                            <input required type='number' step="0" min={1} max={24} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full ' placeholder='Enter Voting Period' value={formData.votingPeriod} onChange={(e) => handleChange(e, 'votingPeriod')} />
                        </label>
                        <label className='mt-5 flex-[0.3]'>
                            <p className='text-sm mt-2'>Days</p>
                            <input required type='number' step="0" min={1} max={7} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full ' placeholder='Days' value={formData.days} onChange={(e) => handleChange(e, 'days')} />
                        </label>
                    </div>
                    <div className='flex'>
                        <label className='flex-[0.5] mr-4'>
                            <p className='text-sm'>Quorum{requiredTag}</p>
                            <input required type='number' step="0" min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required' value={formData.quorum} onChange={(e) => handleChange(e, 'quorum')} />
                        </label>
                        <label className='flex-[0.5]'>
                            <p className='text-sm'>Min. Favourable Majority{requiredTag}</p>
                            <input required type='number' step="0" min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={formData.minFavor} onChange={(e) => handleChange(e, 'minFavor')} />
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