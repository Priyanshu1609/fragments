import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { TransactionContext } from '../../contexts/transactionContext';
import { DataContext } from '../../contexts/dataContext';
import logoWhite from '../../assets/LogoWhite.png'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import VaultCard from '../VaultCard';

const MyInvestment = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { creatorVaults } = useContext(DataContext);

    const router = useRouter();

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute z-10 left-4 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
        // <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        // <img src={RightArrow} alt="nextArrow" {...props} />
        <div {...props} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute right-4  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>
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

                        {creatorVaults?.map((vault) => (
                            vault.vaultStatus === "RUNNING" && <div key={vault.vaultAddress} className='cursor-pointer rounded-xl' onClick={() =>
                                router.push({
                                    pathname: `/vaults/${vault?.vaultAddress}`,
                                    query: { user: currentAccount },
                                })}>
                                <VaultCard
                                    name={vault?.vaultName}
                                    address={vault?.vaultAddress}
                                    target={vault?.target}
                                    status={vault?.vaultStatus}
                                    amount={vault?.amount}
                                    timestamp={vault?.fundraiseDuration}
                                    creator={vault?.creator}
                                    nfts={vault?.nfts}
                                    tokenName={vault?.tokenName}
                                    vaultName={vault?.vaultName}
                                />
                            </div>
                        ))}

                    </Slider>
                </div>

            </div >
        </div>
    )
}

export default MyInvestment;
