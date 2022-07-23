import React, { useState, useContext } from 'react';
import vault from '../../assets/vaultcreation.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext } from '../../contexts/dataContext'

interface CreateVaultFormProps {
    origin: string
    setCurrentStep: (values: CreateVaultStep) => void;
}

export enum CreateVaultStep {
    InputFieldsForm = 'input-fields-form',
    GovernedStep = 'governed-form',
    ImportOrPurchase = 'import-or-purchase',
    Fundraise = 'fundraise'
}

export interface CreateVaultFormValues {
    origin: string,
    vaultName: string,
    contractAddress: string,
    type: string,
    description: string,
    tokenName: string,
    creator: string,
    numOfTokens: number,
    managementFees: number,
    votingPeriod: number,
    quorum: number,
    minFavor: number,
    nftsImported: string[],
    nftsPurchased: string[],
    target: number,
    fundraiseDuration: number,
    myContribution: number,
    amount: number,
}

const CreateVaultForm: React.FC<CreateVaultFormProps> = ({
    origin,
    setCurrentStep,
}) => {


    const [tokenSupply, setTokenSupply] = useState(1000000)
    const [type, setType] = useState('Public')
    const [numOfTokens, setNumOfTokens] = useState(1000000)

    const { formData, setFormData, handleChange } = useContext(DataContext);


    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        setFormData(
            (prev: CreateVaultFormProps) => ({
                ...prev,
                type,
                numOfTokens,
                origin
            })
        )
        if (origin === 'import' || origin === 'purchase') {
            (type === 'Public' ? setCurrentStep(CreateVaultStep.GovernedStep) : setCurrentStep(CreateVaultStep.ImportOrPurchase))
        }
        else {
            setCurrentStep(CreateVaultStep.Fundraise)
        }
    }


    return (
        <div className=''>
            <div className='flex items-center justify-between p-6 bg-[url("/Button.png")] bg-cover  rounded-lg'>
                <div className='text-black'>
                    <h2 className=' text-2xl font-semibold mb-2'>Make vault</h2>
                    <p className=''>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} height={140} width={140} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex justify-between'>
                        <label className='flex-grow mr-4'>
                            <p className='text-sm'>Vault Name{requiredTag}</p>
                            <input required type='text' maxLength={50} className='p-3 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter Vault Name' value={formData.vaultName} onChange={(e) => handleChange(e, 'vaultName')} />
                        </label>
                        {origin !== 'private' && <label className=''>
                            <p className='text-sm'>Type of Vault{requiredTag}</p>
                            <div className="bg-input rounded-2xl m-2 mr-3 relative flex">
                                <div className='group'>
                                    <div className={`inline-flex rounded-lg ${type === 'Public' && `bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-black`}`} onClick={e => setType('Public')}>

                                        <p className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">Governed</p>
                                    </div>
                                    <div className='bg-gray-700 bg-opacity-70 shadow-lg text-center p-4 rounded-lg absolute left-0 top-12 text-sm hidden group-hover:inline-block'>
                                        Governed
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, veritatis?
                                    </div>
                                </div>
                                <div className='group'>
                                    <div className={`inline-flex rounded-lg ${type === 'Private' && `bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-black`}`} onClick={e => setType('Private')}>
                                        <p className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">With Frens</p>
                                    </div>
                                    <div className='bg-gray-700 bg-opacity-70 shadow-lg text-center p-4 rounded-lg absolute left-0 top-12 text-sm hidden group-hover:inline-block'>
                                        With Frens
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, veritatis?
                                    </div>
                                </div>
                            </div>

                        </label>}
                    </div>
                    <label>
                        <p className='text-sm'>Description{requiredTag}</p>
                        <textarea required rows={4} maxLength={500} className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Add Description about the vault' value={formData.description} onChange={(e) => handleChange(e, 'description')} />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Token Name <span className='text-xs'> ( 4 letters )</span>{requiredTag}</p>
                            <input required type='text' minLength={4} maxLength={4} className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter Token Name e.g. $LOOK' value={formData.tokenName} onChange={(e) => handleChange(e, 'tokenName')} />
                        </label>
                        <label>
                            <p className='text-sm'>No. of Tokens{requiredTag}</p>
                            <p className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2'>{tokenSupply}</p>
                        </label>
                    </div>
                    <label>
                        <p className='text-sm'>Management Fees <span className='text-xs'> ( Upto 99% )</span>{requiredTag}</p>
                        <input required type='number' step="0" min={1} max={99} className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter Management Fees' value={formData.managementFees} onChange={(e) => handleChange(e, 'managementFees')} />
                    </label>
                    <button type='submit' className='w-full p-3 rounded-lg  bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff]  text-black flex items-center justify-center space-x-4'>
                        <span>Next</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateVaultForm;