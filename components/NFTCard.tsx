import React, { useEffect } from 'react';
import { MoralisNFT } from '../contracts/nft';
import { fixTokenURI } from '../utils';
import opensealogo from '../assets/opensealogo.svg';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/solid';

export interface NFTCardProps {
    nft: MoralisNFT;
}

const NFTCard: React.FC<NFTCardProps> = ({
    nft,
}) => {

    const [nftMetadata, setNftMetadata] = React.useState<any>();

    const fetchNFTMetadata = async () => {
        if(!nft.token_uri) return
        try {
            const fixedTokenURI = fixTokenURI(nft.token_uri)

            const res = await fetch(fixedTokenURI)
            const nftMetadata = await res.json()

            setNftMetadata({
                ...nftMetadata,
                image: fixTokenURI(nftMetadata.image ?? nftMetadata.image_url),
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchNFTMetadata()
    }, [nft])

    return nftMetadata ? (
        <div className='rounded-lg bg-[#0F0F13]'>
            <div className='flex rounded-t-lg justify-between items-center h-[250px]'>
                {nftMetadata?.image?.length && <img src={nftMetadata.image} className='w-[250px] rounded-t-lg' rounded-t-lg/>}
            </div>
            <div className='px-4 py-3'>
                <div>
                    <div className='flex text-lg'>
                        <p>{nftMetadata.name}</p>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <div className='flex justify-between'>
                    {/* <div>
                        <p className='text-xs text-white text-opacity-70'>Valuations</p>
                        <h2>{valuations}</h2>
                    </div>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Unique owners</p>
                        <h2>{uniqueOwners}</h2>
                    </div> */}
                    <a 
                        href={`https://opensea.io/assets/${nft.token_address}/${nft.token_id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex bg-[#1E1E24] p-3 w-full justify-between rounded-lg'
                    >
                        <div className='flex space-x-2'>
                            <Image src={opensealogo} />
                            <p className='text-sm'>View on Opensea</p>
                        </div>
                        <ArrowRightIcon className='w-4 -rotate-45'  />
                    </a>
                </div>
            </div>
        </div>
    ) : null
}

export default NFTCard;