import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';
import { VaultCard } from '../MyInvestments';

const MyInvestment: React.FC = () => {

    const router = useRouter()

    return (
        <div className='py-4 w-max flex gap-6'>
            <div onClick={() => router.push('/create-gullak')} className='rounded-lg cursor-pointer bg-[#0F0F13] w-[250px]'>
                <div className='flex items-center justify-center h-[250px]'>
                    <PlusIcon className='w-[100px] text-white opacity-70' />
                </div>
                <div className='text-center px-2 py-4'>
                    <h2 className='text-2xl font-semibold'>Create Gullak!</h2>
                    <p className='text-[#70707C] text-base font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At tristique gravida.</p>
                </div>
            </div>
            <VaultCard
                name='Bored Ape <> RTFKT'
                valuations={'600 ETH'}
                uniqueOwners={4726}
            />
        </div>
    )
}

export default MyInvestment;
