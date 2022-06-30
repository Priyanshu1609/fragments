import React, { useState, useContext } from 'react';
import Image from 'next/image';

import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import Select from '../Select';
import governance from '../../assets/governance.png';

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
            <div className='flex items-center justify-between p-6 bg-[url("/Button.png")] bg-cover  rounded-lg'>
                <div className='text-black'>
                    <h2 className=' text-2xl font-semibold mb-2'>Governance Parameters</h2>
                    <p className=''>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={governance} height={150} width={150} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex '>
                        <label className='flex-[0.7] mr-4 relative'>
                            <p className='text-sm'>Voting Period{requiredTag}</p>
                            <p className='text-sm mt -2'>{inputType?.name}</p>

                            <div className='group'>
                                <input required type='number' step="0" min={1} max={inputType.name === "Days" ? 7 : 24} className='p-3 mb-6 rounded-lg bg-input focus:outline-none w-full ' placeholder='Enter Voting Period' value={formData.votingPeriod} onChange={(e) => handleChange(e, 'votingPeriod')} />

                                <div className='bg-gray-700 bg-opacity-70 shadow-lg text-center p-4 rounded-lg absolute right-0 top-[5.5rem]  max-w-xs z-10 text-sm hidden group-hover:inline-flex'>
                                    Voting Period
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, veritatis?
                                </div>
                            </div>
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
                    <div className='flex relative'>
                        <label className='flex-[0.5] relative mr-4'>
                            <p className='text-sm'>Quorum{requiredTag}</p>
                            <div className='group'>
                                <input required type='number' step="0" min={1} max={99} className='p-3 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required' value={formData.quorum} onChange={(e) => handleChange(e, 'quorum')} />

                                <div className='bg-gray-700 bg-opacity-70 shadow-lg text-center p-4 rounded-lg absolute right-0 top-20  max-w-xs text-sm hidden group-hover:inline-block'>
                                    Quorum
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, veritatis?
                                </div>
                            </div>
                        </label>
                        <label className='flex-[0.5]  relative'>
                            <p className='text-sm'>Min. Favourable Majority{requiredTag}</p>
                            <div className='group'>
                                <input required type='number' step="0" min={1} max={formData.quorum - 1} className='p-3 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={formData.minFavor} onChange={(e) => handleChange(e, 'minFavor')} />

                                <div className='bg-gray-700 bg-opacity-70 shadow-lg text-center p-4 rounded-lg absolute right-0 top-20  max-w-xs text-sm hidden group-hover:inline-block'>
                                    Min Favourable majority
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, veritatis?
                                </div>
                            </div>
                        </label>
                    </div>
                    <button type='submit' className='w-full p-3 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4'>
                        <span>Make Vault</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateGovernedForm