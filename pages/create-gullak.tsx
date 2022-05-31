import Image from 'next/image';
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { TransactionContext } from '../contexts/transactionContext';

import atomillustration from '../assets/atomillustration.png';


const CreateGullak: React.FC = () => {
    const router = useRouter();

    const { connectallet, currentAccount, logout } = useContext(TransactionContext);

    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
    }, [currentAccount])

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/import/create-vault')
        router.prefetch('/purchase/create-vault')
        router.prefetch('/private/create-vault')
    }, [])


    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-white font-sora'>
            <div className='flex space-x-4 items-center justify-center '>
                <div className='w-80 p-8 border border-white border-opacity-50 rounded-lg flex flex-col items-center justify-center'>
                    <Image src={atomillustration} />
                    <h1 className='text-2xl font-semibold'>Import NFT</h1>
                    <p className='text-sm text-center text-white opacity-50'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                    <button className='bg-white text-black w-full py-3 rounded-md mt-4' onClick={e =>
                        router.push({
                            pathname: '/import/create-vault',
                            query: { user: currentAccount },
                        })
                    }>Make Vault</button >
                </div>
                <div className='w-80 p-8 border border-white border-opacity-50 rounded-lg flex flex-col items-center justify-center'>
                    <Image src={atomillustration} />
                    <h1 className='text-2xl font-semibold'>Purchase NFT</h1>
                    <p className='text-sm text-center text-white opacity-50'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                    <button className='bg-white text-black w-full py-3 rounded-md mt-4' onClick={e =>
                        router.push({
                            pathname: '/purchase/create-vault',
                            query: { user: currentAccount },
                        })
                    }>Make Vault</button>
                </div>
            </div>

            <div className='w-[41rem] p-8 border border-white border-opacity-50 rounded-lg flex items-center justify-center mt-4'>
                <div className='flex flex-col flex-[0.5]'>
                    <h1 className='text-2xl font-semibold'>Fundraise with frens</h1>
                    <p className='text-sm  text-white opacity-50'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                </div>
                <div className='flex-[0.5] flex items-center justify-center'>
                    <button className='bg-white text-black  py-3 rounded-md mt-4 w-1/2 ' onClick={e =>
                        router.push({
                            pathname: '/private/create-vault',
                            query: { user: currentAccount },
                        })
                    }>Make Vault</button>
                </div>
            </div>

        </div >
    )
}

export default CreateGullak;