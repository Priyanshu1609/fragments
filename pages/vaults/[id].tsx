import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import Blockies from 'react-blockies';
import ProgressBar from "@ramonak/react-progress-bar";

const VaultDetail: React.FC = () => {

    const [{ data: connectData }] = useConnect()

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className='text-white max-w-7xl mx-auto font-sora grid grid-cols-2 gap-4'>
            <div className='bg-[#0F0F13] p-6'>
                <div className='bg-[#1E1E24] rounded-lg flex items-center justify-center p-3 w-max'>
                    <Blockies 
                        seed='need to be changed'
                        size={7}
                        scale={3}
                        className='rounded-full mr-3'
                    />
                    <p className='text-sm'>MakerdockDAO</p>
                </div>
                <div className='mt-5 mb-5'>
                    <h2 className='text-2xl font-semibold text-[#FFE55B] mb-2'>{`Bored Ape <> RTFKT`}</h2>
                    <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eget sagittis, libero morbi consequat lacus tempor mattis nunc 
                    </p>
                </div>
                <div>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='flex space-x-2'>
                            <p className='text-[#70707C] text-sm'>Fund raised: </p><span className='text-sm font-semibold'>1000 BORE</span>
                        </div>
                        <div className='flex space-x-2'>
                            <p className='text-[#70707C] text-sm'>Funding goal: </p><span className='text-sm font-semibold'>1300 BORE</span>
                        </div>
                    </div>
                    <ProgressBar completed={60} bgColor='#24CA49' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default VaultDetail