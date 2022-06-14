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
import { NftContext } from '../../contexts/NftContext';

const NFTList: React.FC = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { nftList, nftFloorPriceMapping } = useContext(NftContext);


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
                slidesPerView={"auto"}
                scrollbar={true}
                spaceBetween={80}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                {
                    nftList.map((nft: any) => (
                        <SwiperSlide>
                            <NFTCard nft={nft} floor_price={nftFloorPriceMapping?.[`${nft.token_address}_${nft.token_id}`]} key={nft.token_uri} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:right-5 lg:right-10 xl:right-20 right-20 bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div >
    )
}

export default NFTList;