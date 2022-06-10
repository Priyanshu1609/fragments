import axios from 'axios';

import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
// import { useAccount } from 'wagmi';
import { MoralisNFT } from '../../contracts/nft';
import { fixTokenURI } from '../../utils';
import NFTCard from '../NFTCard';
import { TransactionContext } from '../../contexts/transactionContext';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const NFTBANK_API_KEY = process.env.NEXT_PUBLIC_NFT_BANK_API_KEY;
const API_URL = "https://api.nftbank.ai/estimates-v2/floor_price/:token_address/:token_id?chain_id=ETHEREUM"

const API_KEY = 'YgOUcYlTNyBe0czxTWvruHCI9dbzkUQj7592RL1fEAakq0XdWughgAXZMA4s7k73';

const NFTList: React.FC = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [nftList, setNftList] = React.useState<MoralisNFT[]>([]);
    const [nftFloorPriceMapping, setNFTFloorPriceMapping] = useState<any>({});

    // const [{ data: accountData }] = useAccount({
    //     fetchEns: true,
    // })
    // console.log(accountData)
    const { currentAccount } = useContext(TransactionContext);

    const getNFTs = async () => {
        setIsLoading(true)
        try {
            if (!currentAccount.length) return
            if (!APP_ID?.length || !SERVER_URL?.length) {
                throw new Error("can't fetch NFTs")
            };
            const options = { method: 'GET', headers: { 'X-API-Key': API_KEY, 'Accept': 'application/json', 'Content-Type': 'application/json', } };

            const res = await fetch(`https://deep-index.moralis.io/api/v2/${currentAccount}/nft?chain=eth&format=decimal`, options)

            let nfts = await res.json();

            // const nfts = await Moralis.Web3API.account.getNFTs({ chain: 'eth', address: currentAccount });
            const nftsMetadataPromise = nfts.result?.filter((nft: any) => nft.symbol !== 'ENS')?.map((nft: any) => fixTokenURI(nft.token_uri ?? '')).map((nft: any) => fetch(nft).then(res => res.json())) ?? []

            let NFTFloorPriceMapping: any = {}

            const nftsFloorPricesPromises = nfts.result?.map((nft: any) => axios.get(API_URL.replace(':token_address', nft.token_address).replace(':token_id', nft.token_id), {
                headers: {
                    'x-api-key': NFTBANK_API_KEY ?? '',
                }
            })
                .then(res => {
                    NFTFloorPriceMapping[`${nft.token_address}_${nft.token_id}`] = res.data?.data[0]?.traits?.[0]?.floor_price_eth
                    return res.data
                })
                .catch(_err => null)) ?? []

            const nftsMetadata = await Promise.all(nftsMetadataPromise)
            const nftsFloorPrices = await Promise.all(nftsFloorPricesPromises)
            setNFTFloorPriceMapping(NFTFloorPriceMapping)
            console.log(nftsMetadata)
            console.log(nfts.result?.filter((nft: any) => nft.symbol !== 'ENS'))

            const nftsMetadataFixedWithImages = nftsMetadata.map(
                (nft, i) => ({
                    ...(nfts?.result?.filter((nft: any) => nft.symbol !== 'ENS')?.[i] ?? {}),
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
        console.log('called')
    }, [currentAccount])

    const sliderRef = useRef() as any;

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className='py-8'>
            
            <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:left-5 lg:left-10 xl:left-20 bottom-0'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
            <Swiper
                ref={sliderRef}
                grabCursor={true}
                breakpoints={{
                    600: {
                        slidesPerView: 1,
                    },
                    700: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                    1300: {
                        slidesPerView: 4,
                    }
                }}
                scrollbar={true}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                {
                    nftList.map(nft => (
                        <SwiperSlide>
                            <NFTCard nft={nft} floor_price={nftFloorPriceMapping?.[`${nft.token_address}_${nft.token_id}`]} key={nft.token_uri} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:right-5 lg:right-10 xl:right-20 right-20 bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div>
    )
}

export default NFTList;