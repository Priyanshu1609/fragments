import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import React from 'react';

export interface VaultCardProps {
    name: string;
    valuations: string;
    uniqueOwners: number;
}

export const VaultCard: React.FC<VaultCardProps> = ({
    name,
    valuations,
    uniqueOwners
}) => {
    return (
        <div className='rounded-lg bg-input max-w-[16rem] mx-auto'>
            <img src='https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260' className='w-[250px] h-[250px] rounded-t-lg' />
            <div className='px-4 py-3'>
                <div>
                    <div className='flex text-xs'>
                        <p>10% ( ≈8,283,292 BORE )</p>
                        <span className='flex text-green-500 ml-3'>5% <ArrowNarrowUpIcon className='w-4' /></span>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-lg'>{name}</h1>
                    </div>
                </div>
            </div>
            <hr className='border-gray-800' />
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Valuations</p>
                        <h2>{valuations}</h2>
                    </div>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Unique owners</p>
                        <h2>{uniqueOwners}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MyInvestment: React.FC = () => {
    return (
        <div className='py-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-x-12 no-scrollbar '>
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
            <VaultCard
                name='Bored Ape <> RTFKT'
                valuations={'600 ETH'}
                uniqueOwners={4726}
            />
        </div>
    )
}

export default MyInvestment;