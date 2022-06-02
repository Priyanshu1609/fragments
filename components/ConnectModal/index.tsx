import React, { useContext } from 'react';
// import { Connector, useConnect } from 'wagmi';
import ConnectModalContext from '../../contexts/connectwallet';
import Modal from '../Modal';
import Image from 'next/image'
import walletconnectlogo from '../../assets/walletconnectlogo.png'
import metamasklogo from '../../assets/metamasklogo.png'
import walletmodal from '../../assets/walletmodal.png'
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
        >
            <div className='font-montserrat p-10  '>
                <Image src={walletmodal} />
                <p className='text-2xl mt-4 mb-2 text-white'>Select Wallet</p>
                <p className='mb-6 text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, iure?</p>
                <div className='flex flex-col text-white space-y-4'>
                    {/* {data.connectors.map((connector) => (
                        <button
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => onConnect(connector)}
                            className='py-3 flex hover:bg-gray-700 space-x-2 items-center px-4 text-sm rounded-md border border-solid border-gray-400 text-left w-full'
                        >
                            <Image src={connector.name == "MetaMask" ? metamasklogo : walletconnectlogo} />
                            <p>Connect to {connector.name}</p>
                            {!connector.ready && ' (unsupported)'}
                        </button>
                    ))} */}
                    <button
                        onClick={e => onConnect('metamask')}
                        className='py-3 flex hover:bg-gray-700 space-x-2 items-center px-4 text-sm rounded-md border border-solid border-gray-400 text-left w-full'
                    >
                        <Image src={metamasklogo} />
                        <p>Connect to Metamask</p>
                    </button>
                    <button
                        onClick={() => onConnect('wallectconnect')}
                        className='py-3 flex hover:bg-gray-700 space-x-2 items-center px-4 text-sm rounded-md border border-solid border-gray-400 text-left w-full'
                    >
                        <Image src={walletconnectlogo} />
                        <p>Connect to WalletConnect</p>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ConnectModal