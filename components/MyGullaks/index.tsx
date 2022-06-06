import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';
import { VaultCard } from '../MyInvestments';
import { TransactionContext } from '../../contexts/transactionContext';

const MyInvestment: React.FC = () => {
    const { currentAccount } = React.useContext(TransactionContext);
    const router = useRouter()

    return (
        <div className='py-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-x-12 no-scrollbar mx-auto'>
            <div onClick={() =>
                router.push({
                    pathname: '/create-gullak',
                    query: { user: currentAccount },
                })
            } className='rounded-lg cursor-pointer bg-[#0F0F13] w-[250px] mx-auto'>
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
            <VaultCard
                name='Bored Ape <> RTFKT'
                valuations={'600 ETH'}
                uniqueOwners={4726}
            />
            <VaultCard
                name='Bored Ape <> RTFKT'
                valuations={'600 ETH'}
                uniqueOwners={4726}
            />
            <VaultCard
                name='Bored Ape <> RTFKT'
                valuations={'600 ETH'}
                uniqueOwners={4726}
            />


        </div >
    )
}

export default MyInvestment;
