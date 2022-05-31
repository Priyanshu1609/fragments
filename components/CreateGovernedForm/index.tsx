import React, { useState, useContext } from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';

import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import Select from '../Select';

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
}

const option = [
    {
        "chainId": 'days',
        "name": "Days",
        "icon": "",
        // "address": "",
    },
    {
        "chainId": 'hours',
        "name": "Hours",
        "icon": "",
        // "address": "",
    },
]

const CreateGovernedForm: React.FC<CreateVaultFormProps> = ({
    setCurrentStep
}) => {

    const { formData, setFormData, handleChange, defaultFormData } = useContext(DataContext);
    const [inputType, setInputType] = useState<any>({
        "chainId": 'days',
        "name": "Days",
        "icon": "",
        // "address": "",
    })


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
                            <p className='text-sm mt-2'>{inputType?.name}</p>

                            <input required type='number' step="0" min={1} max={inputType.name === "Days" ? 7 : 24} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full ' placeholder='Enter Voting Period' value={formData.votingPeriod} onChange={(e) => handleChange(e, 'votingPeriod')} />
                        </label>
                        <label className='mt-5 flex-[0.3]'>
                            <p className='text-sm mt-1'>Days/Hours</p>
                            <Select
                                options={option}
                                value={inputType}
                                onChange={(value) => setInputType(value)}
                            />
                        </label>
                    </div>
                    <div className='flex'>
                        <label className='flex-[0.5] mr-4'>
                            <p className='text-sm'>Quorum{requiredTag}</p>
                            <input required type='number' step="0" min={1} max={99} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required' value={formData.quorum} onChange={(e) => handleChange(e, 'quorum')} />
                        </label>
                        <label className='flex-[0.5]'>
                            <p className='text-sm'>Min. Favourable Majority{requiredTag}</p>
                            <input required type='number' step="0" min={1} max={formData.quorum - 1} className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={formData.minFavor} onChange={(e) => handleChange(e, 'minFavor')} />
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