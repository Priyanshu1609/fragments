import Image from 'next/image';
import React from 'react';
import atomillustration from '../../assets/atomillustration.png';

export interface CreateVaultNextStepsProps {
    readonly onImportNFT: () => void;
}

const CreateVaultNextSteps: React.FC<CreateVaultNextStepsProps> = ({
    onImportNFT
}) => {
    return (
        <div className='flex space-x-4 items-center justify-center min-h-screen'>
            <div className='w-80 p-8 border border-white border-opacity-50 rounded-lg flex flex-col items-center justify-center'>
                <Image src={atomillustration} />
                <h1 className='text-2xl font-semibold'>Import NFT</h1>
                <p className='text-sm text-center text-white opacity-50'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                <button className='bg-white text-black w-full py-3 rounded-md mt-4' onClick={onImportNFT}>Create DAO</button>
            </div>
            <div className='w-80 p-8 border border-white border-opacity-50 rounded-lg flex flex-col items-center justify-center'>
                <Image src={atomillustration} />
                <h1 className='text-2xl font-semibold'>Fundraising</h1>
                <p className='text-sm text-center text-white opacity-50'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                <button className='bg-white text-black w-full py-3 rounded-md mt-4 disabled:cursor-not-allowed disabled:opacity-50' disabled>Coming Soon</button>
            </div>
        </div>
    )
}

export default CreateVaultNextSteps;