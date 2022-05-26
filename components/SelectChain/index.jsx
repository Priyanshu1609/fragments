import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../contexts/socketContext';
import Select from '../Select';

const Index = ({ selectedChain, selectedToken, setSelectedChain, setSelectedToken, setCoins, coins }) => {
    const { fetchFromTokens, transaction, chains, handleNetworkSwitch } = useContext(SocketContext);

    const fetchTokens = async (chainId) => {

        try {

            const res = await fetchFromTokens(chainId);
            setCoins(res);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTokens(selectedChain?.chainId);
        handleNetworkSwitch(selectedChain?.chainId);
    }, [selectedChain])


    return (
        <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
                <p className='text-xs text-[#70707C]'>Select Token</p>
                <Select
                    options={coins}
                    value={selectedToken}
                    onChange={(value) => setSelectedToken(value)}
                />
            </div>
            <div>
                <p className='text-xs text-[#70707C]'>Select Chain</p>
                <Select
                    options={chains}
                    value={selectedChain}
                    onChange={(value) => setSelectedChain(value)}
                />
            </div>
        </div>
    )
}

export default Index