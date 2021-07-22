import React, { useRef, useEffect, useCallback } from 'react'

import { SectionWrap, NewItem, InteraciveImg, BestItem, InteractiveWrap } from "./styles"

import ProductItem from '../../ProductItem'
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';
import { useMediaQuery } from 'react-responsive';

export default function Section() {

    const { data: bestList } = useSWR(`products/category/best`, fetcherData, { revalidateOnMount: true });
    const { data: newList } = useSWR(`products/category/new`, fetcherData, { revalidateOnMount: true });

    const divRef = useRef<HTMLImageElement>(null);
    const imgRef = useRef(null);
    const wrapRef = useRef(null);

    let prev = 0;
    let cur = 0;

    let isScroll = false;


    const isMobile = useMediaQuery({ maxWidth: 480 });

    let screenHeight = 0;
    let clientHeight = 0;
    let elemHeight = 0;

    useEffect(() => {
        screenHeight = window.innerHeight;
        clientHeight = divRef.current.clientHeight;
        elemHeight = imgRef.current.clientHeight;
        addEventListener("scroll", handleScroll);
        return () => {
            removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleScroll = useCallback((e: Event) => {
        if (wrapRef.current === null) {
            return;
        }

        let scrollTop = 0;

        scrollTop = document.documentElement.scrollTop;

        cur = scrollTop;
        if (prev === cur) {
            return;
        }
        const scrollBt = scrollTop + screenHeight;
        const clientTop = wrapRef.current?.offsetTop;


        if (scrollBt >= clientTop && scrollTop <= clientTop + clientHeight) {
            divRef.current.style.visibility = "visible";

            let move = 0;
            move = (scrollBt - clientTop);
            divRef.current.style.transform = `translate3d(0,${Math.round(screenHeight - move) + "px"},0)`;
            imgRef.current.style.transform = `translate3d(0,${Math.round(-elemHeight + move) + "px"},0)`;


        }
        else {
            isScroll = false;
            divRef.current.style.visibility = "hidden";
        }
        prev = cur;
    }, [])

    return (
        <div>
            <SectionWrap>
                <NewItem>
                    <h3>NEW ITEM</h3>
                    <ul>
                        <li>
                            {newList !== undefined && <ProductItem id={newList[0]} />}
                        </li>
                        <li>
                            {newList !== undefined && <ProductItem id={newList[1]} />}
                        </li>
                        <li>
                            {newList !== undefined && <ProductItem id={newList[2]} />}
                        </li>
                        <li>
                            {newList !== undefined && <ProductItem id={newList[3]} />}
                        </li>
                    </ul>
                </NewItem>
                <InteractiveWrap ref={wrapRef}>
                    <InteraciveImg ref={divRef}>
                        <a ref={imgRef}></a>
                    </InteraciveImg>
                </InteractiveWrap>
                <BestItem>
                    <h3>BEST ITEM</h3>
                    <ul>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[0]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[1]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[2]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[3]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[4]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[5]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[6]} />}
                        </li>
                        <li>
                            {bestList !== undefined && <ProductItem id={bestList[7]} />}
                        </li>
                    </ul>
                </BestItem>
            </SectionWrap>
        </div>
    )
}
