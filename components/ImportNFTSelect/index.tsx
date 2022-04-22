import React, { useEffect } from 'react';
import Image from 'next/image'
import NFTillustration from '../../assets/nftillustration.png'
import { fixTokenURI } from '../../utils';
import { MoralisNFT } from '../../contracts/nft';
import Moralis from 'moralis';
import { useAccount } from 'wagmi';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/solid';

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

    const [{ data: accountData }] = useAccount({
        fetchEns: true,
    })

    const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onSubmit();
    }

    const getNFTs = async () => {
        setIsLoading(true)
        try {
            if(!accountData?.address.length) return
            if(!APP_ID?.length || !SERVER_URL?.length) {
                throw new Error("can't fetch NFTs")
            };
            Moralis.start({
                appId: APP_ID,
                serverUrl: SERVER_URL,
            })
            const nfts = await Moralis.Web3API.account.getNFTs({ chain: 'eth', address: accountData.address });
            const nftsMetadataPromise = nfts.result?.filter(nft => nft.symbol !== 'ENS')?.map(nft => fixTokenURI(nft.token_uri ?? '')).map(nft => fetch(nft).then(res => res.json())) ?? []
            
            const nftsMetadata = await Promise.all(nftsMetadataPromise)

            const nftsMetadataFixedWithImages = nftsMetadata.map(
                (nft, i) => ({
                    ...(nfts?.result?.[i] ?? {}),
                    ...nft,
                    image: fixTokenURI(nft.image ?? nft.image_url),
                })
            )
            setNftList(!nftsMetadataFixedWithImages?.length ? [] : nftsMetadataFixedWithImages);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getNFTs()
    }, [accountData?.address])

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
                            <div className={`cursor-pointer rounded-md bg-[#1E1E24]`}>
                                <div className='p-2'>
                                    <p>{nft.name}</p>
                                </div>
                                <div className='flex items-center w-[260px] h-[260px]'>
                                    <img src={nft.image} />
                                </div>
                                <div className={`text-center p-2 text-sm ${i==1 ? 'bg-[#0F0F13]' : ''}`}>
                                    {
                                        i == 1 ? (
                                            <p className='flex space-x-2 justify-center'>
                                                <span>Selected</span>
                                                <div className='text-green-300 w-5 h-5 flex items-center justify-center rounded-md bg-green-900'><CheckIcon className='w-4 h-4' /></div>
                                            </p>
                                        ) : (
                                            <p>Select NFT</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={onSubmitHandler} className='w-full flex rounded-lg items-center text-gray-900 justify-center py-3 bg-[#FFE55B]'>
                <p>Import 4 NFTs</p>
                <ArrowRightIcon className='w-4' />
            </button>
        </div>
    )
}

export default ImportNFTSelect;