import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
// 
import CreateDAOForm, { CreateDAOFormValues } from '../components/CreateDAOForm';
import sanityClient from '../utils/sanitySetup'
import { TransactionContext } from '../contexts/transactionContext';

const CreateDao: React.FC = () => {
    const { connectallet, currentAccount, logout } = useContext(TransactionContext);

    // const [{ data: connectData }] = useConnect()
    // const [{ data: accountData }] = useAccount()

    const router = useRouter()

    useEffect(() => {
        if (!currentAccount) {
            router.push('/')
        }
    }, [currentAccount])

    const onCreateDAO = async (values: CreateDAOFormValues) => {
        // sanityClient.create()
        try {
            const request = {
                ...values,
                created_by: currentAccount,
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