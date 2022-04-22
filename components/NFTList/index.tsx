import Moralis from 'moralis';
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi';
import { MoralisNFT } from '../../contracts/nft';
import { fixTokenURI } from '../../utils';
import NFTCard from '../NFTCard';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const NFTList: React.FC = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [nftList, setNftList] = React.useState<MoralisNFT[]>([]);

    const [{ data: accountData }] = useAccount({
        fetchEns: true,
    })

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
        <div className='flex flex-1 flex-row flex-wrap justify-center py-8 gap-8'>
            {
                nftList.map(nft => (
                    <NFTCard nft={nft} key={nft.token_uri} />
                ))
            }
        </div>
    )
}

export default NFTList;