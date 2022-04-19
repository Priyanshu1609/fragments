import { useRouter } from 'next/router';
import React from 'react';
import { useConnect } from 'wagmi';

const CreateDAOButton: React.FC = () => {

    const [{ data: connectData }] = useConnect()
    const router = useRouter()

    return connectData.connected ? (
        <button
            className='text-black bg-white px-3 py-2 rounded-lg font-sora'
            onClick={(e) => {
                e.preventDefault()
                router.push('/create-dao')
            }}
        >
            Create your own DAO
        </button>
    ) : null
}

export default CreateDAOButton