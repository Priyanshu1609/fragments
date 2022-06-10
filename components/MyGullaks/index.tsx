import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { VaultCard } from '../MyInvestments';
import { TransactionContext } from '../../contexts/transactionContext';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";

const MyInvestment: React.FC = () => {
    const { currentAccount } = React.useContext(TransactionContext);
    const router = useRouter()

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
        <div className='py-4 flex'>
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
                <SwiperSlide>
                    <div onClick={() =>
                        router.push({
                            pathname: '/create-gullak',
                            query: { user: currentAccount },
                        })
                    } className='rounded-lg cursor-pointer bg-[#0F0F13] w-[250px] mx-auto'>
                        <div className='flex items-center justify-center h-[250px]'>
                            <PlusIcon className='w-[100px] text-white opacity-70' />
                        </div>
                        <div className='text-center px-2 py-4'>
                            <h2 className='text-2xl font-semibold'>Create Gullak!</h2>
                            <p className='text-[#70707C] text-base font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At tristique gravida.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                    />
                </SwiperSlide>

            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:right-5 lg:right-10 xl:right-20 right-20 bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div >
    )
}

export default MyInvestment;
