import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";

export interface VaultCardProps {
    name: string;
    valuations: string;
    uniqueOwners: number;
}

export const VaultCard: React.FC<VaultCardProps> = ({
    name,
    valuations,
    uniqueOwners
}) => {
    return (
        <div className='rounded-lg bg-input max-w-[16rem] mx-auto' >
            <img src='https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260' className='w-[250px] h-[250px] rounded-t-lg' />
            <div className='px-4 py-3'>
                <div>
                    <div className='flex text-xs'>
                        <p>10% ( ≈8,283,292 BORE )</p>
                        <span className='flex text-green-500 ml-3'>5% <ArrowNarrowUpIcon className='w-4' /></span>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-lg'>{name}</h1>
                    </div>
                </div>
            </div>
            <hr className='border-gray-800' />
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Valuations</p>
                        <h2>{valuations}</h2>
                    </div>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Unique owners</p>
                        <h2>{uniqueOwners}</h2>
                    </div>
                </div>
            </div>
        </div >
    )
}

const MyInvestment: React.FC = () => {
    return (
        <div className='py-4 '>
            <Swiper
                spaceBetween={30}
                slidesPerGroupSkip={4}
                grabCursor={true}
                breakpoints={{
                    425:{
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768:{
                        slidesPerView: 3,
                    },
                    1024:{
                        slidesPerView: 4,
                    }
                }}
                scrollbar={true}
                navigation={true}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
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
        </div>
    )
}

export default MyInvestment;