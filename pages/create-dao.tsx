import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import atomillustration from '../assets/atomillustration.png'

export enum CreateDAOSteps {
    ShowCTA = 'show-cta',
    CreateDAOForm = 'create-dao-form',
    VaultForm = 'vault-form',
    NFTForm = 'nft-form'
}

const CreateDao: React.FC = () => {

    const [{ data: connectData }] = useConnect()

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className="flex min-h-screen bg-black font-sora flex-col items-center justify-center py-2">
            <div className='text-white border border-white border-solid border-opacity-10 rounded-lg text-center font-sora p-8 bg-[#0F0F10] w-[330px]'>
                <Image src={atomillustration} />
                <p className='text-2xl'>Create a DAO</p>
                <p className='text-sm text-white text-opacity-60'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
                <button className='py-3 mt-6 rounded-md bg-white text-black w-full'>
                    Create DAO
                </button>
            </div>
        </div>
    );
}

export default CreateDao