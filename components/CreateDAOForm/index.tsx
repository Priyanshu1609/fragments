import React from 'react';
import Image from 'next/image'
import createDaoPeople from '../../assets/create-dao-people.png';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useFileUpload } from 'use-file-upload';

export const requiredTag = (<sup className='text-[#A162F7]'>*</sup>)

interface CreateDAOFormProps {
    onSubmit: (values: CreateDAOFormValues) => void;
}

export interface CreateDAOFormValues {
    name: string;
    description: string;
    discord_link?: string;
    website_link?: string;
}

const CreateDAOForm: React.FC<CreateDAOFormProps> = ({
    onSubmit
}) => {

    const [file, selectFile] = useFileUpload()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [discordLink, setDiscordLink] = React.useState('')
    const [websiteLink, setWebsiteLink] = React.useState('')

    const onFileUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.preventDefault(); selectFile({ multiple: false, accept: '*' }, console.log) }

    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!name.length || !description.length) {
            return;
        }
        const formValues: CreateDAOFormValues = {
            name,
            description,
            discord_link: discordLink,
            website_link: websiteLink
        }
        onSubmit(formValues);
    }

    return (
        <div className='pb-16'>
            <div className='flex items-center justify-between p-6 bg-[url("/Button.png")] bg-cover  rounded-lg'>
                <div className='text-black'>
                    <h2 className=' text-2xl font-semibold mb-2'>Create DAO</h2>
                    <p className=''>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={createDaoPeople} />
                </div>
            </div>

            <div className='mt-10 text-white'>
                <form onSubmit={onFormSubmit}>
                    <label className='flex items-center cursor-pointer'>
                        <button className='text-white bg-input p-4 mb-6' onClick={onFileUpload}>
                            <PlusIcon className='w-12' />
                        </button>
                        <p className='mb-6 ml-8'>Add Image to your DAO{requiredTag}</p>
                    </label>
                    <label>
                        <p className='text-sm'>What should we call you?{requiredTag}</p>
                        <input required
                            value={name}
                            type='text'
                            className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2'
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Name of DAO'
                        />
                    </label>
                    <label>
                        <p className='text-sm'>Tell us about your DAO(optional)</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Add description of DAO' />
                    </label>
                    <div className='grid grid-cols-2 gap-6'>
                        <label>
                            <p className='text-sm'>Add Discord Invite Link (optional)</p>
                            <input value={discordLink} onChange={(e) => setDiscordLink(e.target.value)} type='text' className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter Discord Link' />
                        </label>
                        <label>
                            <p className='text-sm'>Website Link (optional)</p>
                            <input value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} type='text' className='p-4 mb-6 rounded-lg bg-input focus:outline-none w-full mt-2' placeholder='Enter DAO Website Link' />
                        </label>
                    </div>
                    <button type='submit' className='w-full p-3 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-black flex items-center justify-center space-x-4'>
                        <span>Create DAO</span>
                        <ArrowRightIcon className='w-4' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateDAOForm;