import React from 'react';
import Image from 'next/image'
import createDaoPeople from '../../assets/create-dao-people.png';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useFileUpload } from 'use-file-upload';

export const requiredTag = (<sup className='text-[#A162F7]'>*</sup>)

interface CreateDAOFormProps {
    onSubmit: (values: any) => void;
}

const CreateDAOForm: React.FC<CreateDAOFormProps> = ({
    onSubmit
}) => {

    const [file, selectFile] = useFileUpload()

    const onFileUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {e.preventDefault(); selectFile({multiple: false, accept: '*'}, console.log)}

    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit([]);
    }

    return (
        <div>
            <div className='flex items-center justify-between p-6 bg-[#0F0F13] rounded-lg'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Create DAO</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={createDaoPeople} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onFormSubmit}>
                    <label className='flex items-center cursor-pointer'>
                        <button className='text-white bg-[#0F0F13] p-4 mb-6' onClick={onFileUpload}>
                            <PlusIcon className='w-12' />
                        </button>
                        <p className='mb-6 ml-8'>Add Image to your DAO{requiredTag}</p>
                    </label>
                    <label>
                        <p className='text-sm'>What should we call you?{requiredTag}</p>
                        <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Name of DAO' />
                    </label>
                    <label>
                        <p className='text-sm'>Tell us about your DAO(optional)</p>
                        <textarea rows={4} className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Add description of DAO' />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Add Discord Invite Link (optional)</p>
                            <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter Discord Link' />
                        </label>
                        <label>
                            <p className='text-sm'>Website Link (optional)</p>
                            <input type='text' className='p-4 mb-6 rounded-lg bg-[#0F0F13] focus:outline-none w-full mt-2' placeholder='Enter DAO Website Link' />
                        </label>
                    </div>
                    <button type='submit' className='w-full p-3 rounded-lg bg-[#F5E58F] text-black flex items-center justify-center space-x-4'>
                        <span>Create DAO</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateDAOForm;