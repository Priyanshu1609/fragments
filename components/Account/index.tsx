import React, { useContext } from 'react';
import Image from 'next/image';
import { LogoutIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';

import { getEllipsisTxt } from '../../utils';
import walletIcon from '../../assets/Wallet.svg';
import ConnectModalContext from '../../contexts/connectwallet';
import { TransactionContext } from '../../contexts/transactionContext';
import { useCookies } from 'react-cookie';
import useENS from '../../hooks/useENS';


const Account: React.FC = () => {

    const { connectallet, currentAccount, logoutWallet } = useContext(TransactionContext);
    const [cookies, setCookie] = useCookies(['user']);
    const { ensName, ensAvatar, loading } = useENS(currentAccount);
    const { setVisible } = useContext(ConnectModalContext)

    return (
        <div className='text-white'>
            {currentAccount ? (
                <div onClick={logoutWallet} className='text-white cursor-pointer flex items-center space-x-3 bg-white bg-opacity-20 p-3 rounded-md'>
                    {/* {accountData.ens?.avatar && <img src={accountData.ens.avatar} alt="ENS Avatar" className='rounded-sm' width={25} height={25} />} */}
                    <div>
                        {ensName ?? getEllipsisTxt(currentAccount)}
                    </div>
                    <LogoutIcon className='w-6 h-6 text-white cursor-pointer' />
                </div>
            ) : (
                <div onClick={logoutWallet} className=' text-white cursor-pointer flex space-x-2 items-center p-3 rounded-md bg-white bg-opacity-10'>
                    <Image src={walletIcon} />
                    <p className='text-base'>Connect wallet</p>
                    <ArrowRightIcon className='w-6 h-6' />
                </div>
            )
            }
        </div>
    )

}

export default Account;