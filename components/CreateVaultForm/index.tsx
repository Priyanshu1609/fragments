import React from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';

interface CreateVaultFormProps {
    onSubmit: (values: CreateVaultFormValues) => void;
}

export interface CreateVaultFormValues {
    name: string;
    description: string;
    token_name: string;
    token_supply: number;
    management_fee: number;
}

const CreateVaultForm: React.FC<CreateVaultFormProps> = ({
    onSubmit
}) => {

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [tokenName, setTokenName] = React.useState('')
    const [tokenSupply, setTokenSupply] = React.useState(0)
    const [managementFee, setManagementFee] = React.useState(0)

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if(!name.length || !description.length || !tokenName.length || !tokenSupply || !managementFee) {
            return;
        }
        const formValues: CreateVaultFormValues = {
            name,
            description,
            token_name: tokenName,
            token_supply: tokenSupply,
            management_fee: managementFee
        }
        onSubmit(formValues);
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
                    <label>
                        <p className='text-sm'>Vault Name{requiredTag}</p>
                        <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Vault Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        <p className='text-sm'>Description{requiredTag}</p>
                        <textarea rows={4} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Add Description about the vault' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Token Name{requiredTag}</p>
                            <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Token Name e.g. $LOOK' value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
                        </label>
                        <label>
                            <p className='text-sm'>No. of Tokens{requiredTag}</p>
                            <input type='number' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Number of tokens' value={tokenSupply} onChange={(e) => setTokenSupply(Number(e.target.value))} />
                        </label>
                    </div>
                    <label>
                        <p className='text-sm'>Management Fees{requiredTag}</p>
                        <input type='number' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Management Fees' value={managementFee} onChange={(e) => setManagementFee(Number(e.target.value))} />
                    </label>
                    <button type='submit' className='w-full p-3 rounded-lg bg-[#F5E58F] text-black flex items-center justify-center space-x-4'>
                        <span>Make Vault</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateVaultForm;