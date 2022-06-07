import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';
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

    return (
        <div className='py-4 '>
            <Swiper
                spaceBetween={30}
                slidesPerGroupSkip={4}
                grabCursor={true}
                breakpoints={{
                    425: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    }
                }}
                scrollbar={true}
                navigation={true}
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


        </div >
    )
}

export default MyInvestment;
