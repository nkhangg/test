/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
export interface IBannerProps {}

export default function Banner(props: IBannerProps) {
    const slider = useRef<Slider | null>(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
    };

    useEffect(() => {
        const idInterval = setInterval(() => {
            slider.current?.slickNext();
        }, 8000);

        return () => {
            clearInterval(idInterval);
        };
    }, []);

    return (
        <div className="w-full max-h-[660px] relative overflow-hidden select-none">
            <Slider ref={slider} {...settings}>
                <img src="/images/1.svg" alt="" />
                <img src="/images/2.svg" alt="" />
            </Slider>

            <div className="absolute hidden xl:w-main m-auto top-[50%] left-0 right-0 text-green-86EFAC text-sm md:text-xl lg:flex lg:w-[90%] items-center justify-between">
                <motion.div
                    whileHover={{ x: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => slider?.current?.slickPrev()}
                    className="w-6 h-6  md:w-slide-btn md:h-slide-btn bg-[rgba(255,255,255,0.4)] top-[50%] 
                 flex items-center rounded-full justify-center cursor-pointer"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </motion.div>
                <motion.div
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => slider?.current?.slickNext()}
                    className="w-6 h-6  md:w-slide-btn md:h-slide-btn bg-[rgba(255,255,255,0.4)] top-[50%] 
                 flex items-center rounded-full justify-center cursor-pointer"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </motion.div>
            </div>
        </div>
    );
}
