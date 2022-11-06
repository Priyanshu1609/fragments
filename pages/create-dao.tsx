import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
// 
import CreateDAOForm, { CreateDAOFormValues } from '../components/CreateDAOForm';
import { TransactionContext } from '../contexts/transactionContext';
import { parseCookies } from '../utils/cookie';

const CreateDao: React.FC = ({ data }: any) => {
    const { connectallet, currentAccount, logout, awsClient } = useContext(TransactionContext);

    // const [{ data: connectData }] = useConnect()
    // const [{ data: accountData }] = useAccount()

    const router = useRouter()

    useEffect(() => {
        if (!data.user.currentAccount) {
            router.push('/')
        }
    }, [data.user])

    return (
        <div className='text-white max-w-4xl mx-auto  '>
            <CreateDAOForm onSubmit={() => { }} />
        </div>
    );
}

export default CreateDao

export async function getServerSideProps({ req, res }: any) {

    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }

    return { props: { data } }
}