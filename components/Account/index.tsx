import React, { useContext } from 'react';
import { useAccount, useConnect } from 'wagmi';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import walletIcon from '../../assets/Wallet.svg';
import ConnectModalContext from '../../contexts/connectwallet';
import { getEllipsisTxt } from '../../utils';

const Account: React.FC = () => {

    const [{ data: connectData }] = useConnect()

    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    const {setVisible} = useContext(ConnectModalContext)

    return connectData.connected && accountData ? (
         <div className='text-white font-sora flex space-x-3 bg-white bg-opacity-20 p-3 rounded-md'>
            {accountData.ens?.avatar && <img src={accountData.ens.avatar} alt="ENS Avatar" className='rounded-sm' width={25} height={25} />}
            <div>
                {accountData.ens?.name
                    ? `${accountData.ens?.name}`
                    : getEllipsisTxt(accountData.address)}
            </div>
            <LogoutIcon onClick={disconnect} className='w-6 h-6 text-white cursor-pointer' />
        </div>
    ) : (
        <div onClick={() => setVisible(true)} className='font-sora text-white cursor-pointer flex space-x-2 p-3 rounded-md bg-white bg-opacity-10'>
            <Image src={walletIcon} />
            <p className='text-base'>Connect wallet</p>
            <ArrowRightIcon className='w-6 h-6' />
        </div>
    )
}

export default Account;