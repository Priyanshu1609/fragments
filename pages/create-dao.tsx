import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import CreateDAOForm, { CreateDAOFormValues } from '../components/CreateDAOForm';
import sanityClient from '../utils/sanitySetup'

const CreateDao: React.FC = () => {

    const [{ data: connectData }] = useConnect()
    const [{data: accountData}] = useAccount()

    const router = useRouter()

    useEffect(() => {
        if(!connectData.connected) {
            router.push('/')
        }
    }, [connectData.connected])

    const onCreateDAO = async (values: CreateDAOFormValues) => {
        // sanityClient.create()
        try {
            const request = {
                ...values,
                created_by: accountData?.address,
                _type: 'dao'
            }
            const result = await sanityClient.create(request)
            console.log(result)
            router.push('/dashboard')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='text-white max-w-4xl mx-auto font-sora'>
            <CreateDAOForm onSubmit={onCreateDAO} />
        </div>
    );
}

export default CreateDao