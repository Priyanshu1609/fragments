import React, { useState, useContext } from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext } from '../../contexts/dataContext'

interface CreateVaultFormProps {
    flow: string
    setCurrentStep: (values: CreateVaultStep) => void;
}

export enum CreateVaultStep {
    InputFieldsForm = 'input-fields-form',
    GovernedStep = 'governed-form',
    ImportOrPurchase = 'import-or-purchase',
    Fundraise = 'fundraise'
}

export interface CreateVaultFormValues {
    flow: string,
    vaultName: string,
    type: string,
    description: string,
    tokenName: string,
    numOfTokens: number,
    managementFees: number,
    votingPeriod: number,
    days: number,
    quorum: number,
    minFavor: number,
    nftsImported: object[],
    nftsPurchased: object[],
    target: number,
    fundraiseDuration: number,
    myContribution: number,
}

const CreateVaultForm: React.FC<CreateVaultFormProps> = ({
    flow,
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
                flow
            })
        )
        if (flow === 'import' || flow === 'purchase') {
            (type === 'Public' ? setCurrentStep(CreateVaultStep.GovernedStep) : setCurrentStep(CreateVaultStep.ImportOrPurchase))
        }
        else {
            setCurrentStep(CreateVaultStep.Fundraise)
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between p-6 bg-[#0F0F13] rounded-lg'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Make vault</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={vault} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex justify-between'>
                        <label className='flex-grow mr-4'>
                            <p className='text-sm'>Vault Name{requiredTag}</p>
                            <input required type='text' className='p-3 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Vault Name' value={formData.vaultName} onChange={(e) => handleChange(e, 'vaultName')} />
                        </label>
                        {flow !== 'private' && <label>
                            <p className='text-sm'>Type of Vault{requiredTag}</p>
                            <div className="bg-[#0F0F13] rounded-2xl m-2 mr-3">
                                <div className={`inline-flex rounded-lg ${type === 'Public' && `bg-green-500`}`} onClick={e => setType('Public')}>
                                    <p className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">Governed</p>
                                </div>
                                <div className={`inline-flex rounded-lg ${type === 'Private' && `bg-green-500`}`} onClick={e => setType('Private')}>
                                    <p className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75">With Frens</p>
                                </div>
                            </div>

                        </label>}
                    </div>
                    <label>
                        <p className='text-sm'>Description{requiredTag}</p>
                        <textarea required rows={4} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Add Description about the vault' value={formData.description} onChange={(e) => handleChange(e, 'description')} />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Token Name <span className='text-xs'> ( 4 letters )</span>{requiredTag}</p>
                            <input required type='text' minLength={4} maxLength={4} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Token Name e.g. $LOOK' value={formData.tokenName} onChange={(e) => handleChange(e, 'tokenName')} />
                        </label>
                        <label>
                            <p className='text-sm'>No. of Tokens{requiredTag}</p>
                            <p className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2'>{tokenSupply}</p>
                        </label>
                    </div>
                    <label>
                        <p className='text-sm'>Management Fees <span className='text-xs'> ( Upto 99% )</span>{requiredTag}</p>
                        <input required type='number' step="0" min={1} max={99} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Management Fees' value={formData.managementFees} onChange={(e) => handleChange(e, 'managementFees')} />
                    </label>
                    <button type='submit' className='w-full p-3 rounded-lg bg-yellow-300 text-black flex items-center justify-center space-x-4'>
                        <span>Next</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateVaultForm;