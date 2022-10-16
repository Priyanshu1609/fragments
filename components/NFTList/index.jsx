import axios from 'axios';

import React, { useEffect, useState, useContext, useRef, useCallback, RefAttributes } from 'react'
// import { useAccount } from 'wagmi';
import { MoralisNFT } from '../../contracts/nft';
import { fixTokenURI } from '../../utils';
import NFTCard from '../NFTCard';
import { TransactionContext } from '../../contexts/transactionContext';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { NftContext } from '../../contexts/NftContext';
import { useRouter } from 'next/router';

const NFTList = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { nftList, nftFloorPriceMapping } = useContext(NftContext);
    console.log("NFTS FROM PAGE", nftList)

    const router = useRouter();


    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute z-10 -left-4 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
        // <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        // <img src={RightArrow} alt="nextArrow" {...props} />
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -right-4  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='h-[30rem]'>
            <div className='py-4 relative  '>
                <div className="card__container">
                    <Slider {...settings} className="card__container--inner">

                        {nftList?.map((nft) => (
                            <div key={nft?.vaultAddress} className='cursor-pointer rounded-xl'>
                                <NFTCard
                                    nft={nft}
                                    floor_price={nftFloorPriceMapping?.[`${nft.token_address}_${nft.token_id}`]}
                                    key={nft.token_uri}
                                />
                            </div>
                        ))}

                    </Slider>
                </div>

            </div >
        </div>
    )
}

export default NFTList;
