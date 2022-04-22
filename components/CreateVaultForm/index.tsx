import React from 'react';
import vault from '../../assets/vault.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowRightIcon } from '@heroicons/react/solid';

interface CreateVaultFormProps {
    onSubmit: (values: any) => void;
}

const CreateVaultForm: React.FC<CreateVaultFormProps> = ({
    onSubmit
}) => {

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit({});
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
                        <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Vault Name' />
                    </label>
                    <label>
                        <p className='text-sm'>Description{requiredTag}</p>
                        <textarea rows={4} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Add Description about the vault' />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Token Name{requiredTag}</p>
                            <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Token Name e.g. $LOOK' />
                        </label>
                        <label>
                            <p className='text-sm'>No. of Tokens{requiredTag}</p>
                            <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Number of tokens' />
                        </label>
                    </div>
                    <label>
                        <p className='text-sm'>Management Fees{requiredTag}</p>
                        <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Management Fees' />
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