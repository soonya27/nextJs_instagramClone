import React from 'react';
import Avatar from './Avatar';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link';

const responsive = {
    desktop: {
        breakpoint: { max: 4000, min: 576 },
        items: 6
    },
    mobile: {
        breakpoint: { max: 576, min: 0 },
        items: 4
    }
};
type Props = {
    children: React.ReactNode;
}
export default function ScrollableCarousel({ children }: Props) {
    return (
        <Carousel responsive={responsive}
        >
            {children}
        </Carousel>
    );
}

