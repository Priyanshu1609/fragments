import React, { useContext } from 'react';
// import { Connector, useConnect } from 'wagmi';
import ConnectModalContext from '../../contexts/connectwallet';
import Modal from '../Modal';
import Image from 'next/image'

import metamasklogo from '../../assets/MetaMask_Fox.svg.png'
import walletconnectlogo from '../../assets/WalletConnect-Logo.png'
import { TransactionContext } from '../../contexts/transactionContext';

const ConnectModal: React.FC = () => {

    const { visible, setVisible } = useContext(ConnectModalContext);
    const { connectWallet, currentAccount, logout } = useContext(TransactionContext);

    // const [{ data, error }, connect] = useConnect()

    const onConnect = async (type: string) => {
        try {
            connectWallet(type);
            setVisible(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal
            open={visible}
            onClose={() => setVisible(false)}
            showCTA={false}
            title="Connect Wallet"
        >
            <p className='pr-24 text-base font-extralight text-left font-montserrat'>Connect with one of the available wallet providers or create a new wallet.</p>
            <div className='p-4 mt-6'>
                <div className='flex items-center justify-between  text-white hover:cursor-pointer'>
                    <div
                        onClick={e => onConnect('metamask')}
                        className='h-44 w-48 py-3 flex flex-col hover:bg-gray-700 space-x-2 justify-center items-center px-4 text-sm rounded-3xl border-[1px]  border-gray-600 text-left '
                    >
                        <Image src={metamasklogo} height={80} width={80} />
                        <p className='font-black text-lg mt-1'>Metamask</p>
                    </div>
                    <div
                        onClick={() => onConnect('wallectconnect')}
                        className='h-44 w-48 py-3 flex flex-col hover:bg-gray-700 space-x-2 justify-center items-center px-4 text-sm rounded-3xl border-[1px]  border-gray-600 text-left '
                    >
                        <Image src={walletconnectlogo} height={70} width={100} />
                        <p className='font-black text-lg mt-3'>WalletConnect</p>
                    </div>
                </div>
                <p className='text-gray-400 text-sm text-left mt-4 font-montserrat'>Connecting your wallet does not give Fragments, access to your private keys or your funds.</p>
            </div>
        </Modal>
    )
}

export default ConnectModal