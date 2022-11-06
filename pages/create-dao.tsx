import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
// 
import CreateDAOForm, { CreateDAOFormValues } from '../components/CreateDAOForm';
import { TransactionContext } from '../contexts/transactionContext';
import { parseCookies } from '../utils/cookie';

const CreateDao: React.FC = ({ data }: any) => {
    const { connectallet, currentAccount, logout, awsClient } = useContext(TransactionContext);
    const [cookie, setCookie, removeCookie] = useCookies(["user"])

    // const [{ data: connectData }] = useConnect()
    // const [{ data: accountData }] = useAccount()

    const router = useRouter()

    useEffect(() => {
        if (!cookie.user?.currentAccount) {
            router.push('/')
        }
    }, [cookie])

    return (
        <div className='text-white max-w-4xl mx-auto  '>
            <CreateDAOForm onSubmit={() => { }} />
        </div>
    );
}

export default CreateDao

