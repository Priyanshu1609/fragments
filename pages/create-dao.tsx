import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import CreateDAOForm from '../components/CreateDAOForm';

const CreateDao: React.FC = () => {

    const [{ data: connectData }] = useConnect()

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    return (
        <div className='text-white max-w-4xl mx-auto font-sora'>
            <CreateDAOForm onSubmit={() => router.push('/dashboard')} />
        </div>
    );
}

export default CreateDao