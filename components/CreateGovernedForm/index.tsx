import React, { useState, useContext } from 'react';
import Image from 'next/image';

import { requiredTag } from '../CreateDAOForm';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import Select from '../Select';
import governance from '../../assets/governance.png';
import info from "../../assets/info.png"
import Weighted from '../GovernedForm/Weighted';
import Commitee from '../GovernedForm/Commitee';
import Democratic from '../GovernedForm/Democratic';

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
    handleBack: () => void;
}


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

        

        setCurrentStep(CreateVaultStep.CommiteeGoverned)
        // setCurrentStep(CreateVaultStep.WeightGoverned)
    }

    return (
        <div className='max-w-2xl mx-auto text-lg'>
            <div className='flex items-center justify-between h-28 p-6 bg-[url("/Button.png")] bg-[#232529] bg-cover overflow-hidden rounded-2xl'>
                <div className='text-white'>
                    <h2 className=' text-3xl font-semibold'>Governance Parameters</h2>
                    <p className='font-montserrat text-base'>How is the vault being monitored?</p>
                </div>
                <div className='-mr-[5rem] mt-8'>
                    <Image src={governance} height={160} width={200} />
                </div>
            </div>
            <div>
                {
                    formData.type === "weight" && (
                        <div>
                            <Weighted inputType={inputType} setInputType={setInputType} onSubmitHandler={onSubmitHandler} />
                        </div>
                    )
                }
                {
                    formData.type === "commitee" && (
                        <div>
                            <Commitee inputType={inputType} setInputType={setInputType} onSubmitHandler={onSubmitHandler} />
                        </div>
                    )
                }
                {
                    formData.type === "democratic" && (
                        <div>
                            <Democratic inputType={inputType} setInputType={setInputType} onSubmitHandler={onSubmitHandler} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CreateGovernedForm