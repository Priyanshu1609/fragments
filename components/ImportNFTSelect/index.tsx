import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image'
import Moralis from 'moralis';
import { useAccount } from 'wagmi';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';

import NFTillustration from '../../assets/nftillustration.png'
import { fixTokenURI } from '../../utils';
import { MoralisNFT } from '../../contracts/nft';


const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

export interface ImportNFTSelectProps {
    onSubmit: () => void;
}



const ImportNFTSelect: React.FC<ImportNFTSelectProps> = ({
    onSubmit
}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [nftList, setNftList] = React.useState<any[]>([]);
    const [selected, setSelected] = useState(-1);
    const [transferred, setTransferred] = useState([]);



    const [{ data: accountData }] = useAccount({
        fetchEns: true,
    })


    const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onSubmit();
    }


    // const getNFTs = async () => {
    //     setIsLoading(true)
    //     try {
    //         if(!accountData?.address.length) return
    //         if(!APP_ID?.length || !SERVER_URL?.length) {
    //             throw new Error("can't fetch NFTs")
    //         };
    //         Moralis.start({
    //             appId: APP_ID,
    //             serverUrl: SERVER_URL,
    //         })
    //         const nfts = await Moralis.Web3API.account.getNFTs({ chain: 'eth', address: accountData.address });
    //         const nftsMetadataPromise = nfts.result?.filter(nft => nft.symbol !== 'ENS')?.map(nft => fixTokenURI(nft.token_uri ?? '')).map(nft => fetch(nft).then(res => res.json())) ?? []

    //         const nftsMetadata = await Promise.all(nftsMetadataPromise)

    //         const nftsMetadataFixedWithImages = nftsMetadata.map(
    //             (nft, i) => ({
    //                 ...(nfts?.result?.[i] ?? {}),
    //                 ...nft,
    //                 image: fixTokenURI(nft.image ?? nft.image_url),
    //             })
    //         )
    //         setNftList(!nftsMetadataFixedWithImages?.length ? [] : nftsMetadataFixedWithImages);
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const getContract = async (tokenAddress: string) => {
        try {

            const res = await fetch(`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${process.env.NEXT_PUBLIC_API}`)

            const data = await res.json();
            const contractABI = JSON.parse(data.result);
            // console.log('contract abi', contractABI)
            return contractABI

        } catch (error) {
            console.error(error);
        }
    }

    const getNFTs = async () => {
        setIsLoading(true)
        console.log(accountData?.address)
        try {

            const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '  ' } };

            fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${accountData.address}&order_direction=desc&limit=20&include_orders=false`, options)
                .then(response => response.json())
                .then(response => { console.log(response); setNftList(response.assets); })
                .catch(err => console.error(err));

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const send_token = async (tokenAddress: string, tokenId: string, id: number) => {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const to_address = '0xd232979ed3fc90a331956C4e541815b478116a7D'
            const fromAddress = accountData.address;

            const abi = await getContract(tokenAddress);
            let contract = new ethers.Contract(
                tokenAddress,
                abi,
                signer
            )
            // console.log('Contract', { contract, signer, fromAddress, to_address, tokenId, tokenAddress })

            let numberOfTokens = 1
            console.log(`numberOfTokens: ${numberOfTokens}`)

            const transfer = await contract.transferFrom(fromAddress, to_address, tokenId);
            console.log('transfer', transfer)
            await transfer.wait();
            setTransferred([...transferred, id]);

        } catch (error) {
            console.error(error)
        }


    }

    const transferToken = async (i: number, tokenAddress: string, tokenId: string, id: number) => {
        if (transferred.includes(id)) {
            console.log('Item already transferred');
            return;
        }

        if (selected !== -1) {
            console.log('Error in selection');
            return;
        }
        setSelected(i);

        await send_token(tokenAddress, tokenId, id);

        setSelected(-1);
    }


    useEffect(() => {
        getNFTs();
    }, [accountData?.address, selected === -1])

    const Loader = () => (

        <button className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white w-full justify-center" disabled>
            <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium"> Transferring... </span>
        </button>

    )


    return (
        <div className='py-8'>
            <div className='flex items-center justify-between p-6 bg-[#0F0F13] rounded-lg'>
                <div>
                    <h2 className='text-[#F5E58F] text-2xl font-semibold mb-2'>Select NFTs to Fractionalize</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={NFTillustration} />
                </div>
            </div>
            <div className='mt-10'>
                <div className='flex py-6 flex-wrap overflow-y-auto max-h-[470px] gap-10 justify-center gap-x-12 no-scrollbar'>
                    {
                        nftList.map((nft, i) => (
                            <div key={nft.id} className={`cursor-pointer rounded-md bg-[#1E1E24]`} onClick={e => transferToken(i, nft.asset_contract.address, nft.token_id, nft.id)}>

                                <div className='p-2 truncate'>
                                    <p className=''>{(nft.name).slice(0, 20)}...</p>
                                </div>
                                <div className='flex items-center w-[260px] h-[260px]'>
                                    <img src={nft.animation_url ? nft.animation_url : nft.image_url} />
                                </div>
                                <div className={`text-center p-2 text-sm ${i == 1 ? 'bg-[#0F0F13]' : ''}`}>
                                    {
                                        !transferred.includes(nft.id) && selected !== i && (
                                            <button className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white w-full justify-center" disabled>
                                                <span className="font-medium"> {i}.  Select NFT</span>
                                            </button>
                                        )
                                    }
                                    {
                                        !transferred.includes(nft.id) && selected === i && (
                                            <Loader />
                                        )
                                    }
                                    {
                                        transferred.includes(nft.id) && (
                                            <button className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white w-full justify-center" disabled>
                                                <span className="font-medium"> Transferred</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={onSubmitHandler} className='w-full flex rounded-lg items-center text-gray-900 justify-center py-3 bg-[#FFE55B]'>
                <p>Import {nftList.length} NFTs</p>
                <ArrowRightIcon className='w-4' />
            </button>
        </div>
    )
}

export default ImportNFTSelect;