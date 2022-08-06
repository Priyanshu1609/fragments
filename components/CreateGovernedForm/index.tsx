import React, { useState, useContext } from 'react';
import Image from 'next/image';

import { requiredTag } from '../CreateDAOForm';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import Select from '../Select';
import governance from '../../assets/governance.png';

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
    handleBack: () => void;
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
    setCurrentStep,
    handleBack
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
        <div className='max-w-2xl mx-auto text-lg'>
            <div className='flex items-center justify-between h-28 p-6 bg-[url("/Button.png")]  bg-[#232529]    bg-cover overflow-hidden rounded-2xl'>
                <div className='text-white'>
                    <h2 className=' text-3xl font-semibold'>Governance Parameters</h2>
                    <p className='font-montserrat text-base'>How is the vault being monitored?</p>
                </div>
                <div className='-mr-[5rem] mt-8'>
                    <Image src={governance} height={160} width={200} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex flex-col'>
                        <p className=''>Voting Period{requiredTag}</p>
                        <p className='mt-0 text-lg text-gray-300'>How long will the voting happen?</p>
                    </div>
                    <div className='flex mt-4 space-x-10'>
                        <label className='flex-[0.3]'>
                            <p className='text-xl mt-1'>Choose Timeframe</p>
                            <Select
                                options={option}
                                value={inputType}
                                onChange={(value) => setInputType(value)}
                                placeholder="Days"
                            />
                        </label>
                        <label className='flex-[0.7] relative'>
                            <p className='text-xl mt-2'>How many {inputType?.name}?</p>

                            <input required type='number' step="0" min={1} max={inputType.name === "Days" ? 7 : 24} className='p-3 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full ' placeholder='Enter Voting Period' value={formData.votingPeriod} onChange={(e) => handleChange(e, 'votingPeriod')} />
                        </label>
                    </div>
                    <div className='rounded-lg bg-yellow-900 text-yellow-400 px-2 py-1 text-center mt-2'>
                        <p>
                            Closing a vault within 24 hours restricts the window to deposit for members.
                        </p>
                        <p className='-mt-2'>
                            Adding more information here so that users now what is happening
                        </p>
                    </div>
                    <div className='flex flex-col space-y-4 my-6'>
                        <label className=' '>
                            <p className='text-xl'>Quorum{requiredTag}</p>
                            <p className='text-gray-400'>The token-based quorum is among the most basic DAO voting mechanisms. For a proposal to pass, a certain number of DAO members must participate in the voting process.</p>

                            <input required type='number' step="0" min={1} max={99} className='p-3  rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='Enter min. percentage of votes required' value={formData.quorum} onChange={(e) => handleChange(e, 'quorum')} />

                        </label>
                        <label className=''>
                            <p className='text-xl'>Min. Favourable Majority{requiredTag}</p>
                            <p className='text-gray-400'>The token-based quorum is among the most basic DAO voting mechanisms. For a proposal to pass, a certain number of DAO members must participate in the voting process.</p>

                            <input required type='number' step="0" min={1} max={formData.quorum - 1} className='p-3  rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={formData.minFavor} onChange={(e) => handleChange(e, 'minFavor')} />

                        </label>
                    </div>
                    <div className='flex justify-between'>
                        <button onClick={handleBack} className='w-44 px-3 py-2 rounded-lg  bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>
                        <button type='submit' className='w-44 px-3 py-2 rounded-lg  !bg-button  text-black flex items-center justify-center space-x-4'>
                            <span>Next Step</span>
                            <ArrowRightIcon className='w-4' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGovernedForm