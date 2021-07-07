import React, { useRef, useEffect } from 'react'

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
        console.log(elemHeight, clientHeight, screenHeight);
        window.addEventListener("scroll", e => handleScroll(e));
        return () => {
            window.removeEventListener("scroll", e => handleScroll(e));
        }

    }, [])

    useEffect(() => {
        if (divRef.current === null) {
            return;
        }

        const mainWrap = document.querySelector("#MainWrap");
        // if (isMobile) {
        //     // mainWrap.addEventListener("scroll", handleScroll);
        //     mainWrap.addEventListener("touchmove", handleScroll);
        //     window.removeEventListener("scroll", handleScroll);
        // } else {
        //     mainWrap.removeEventListener("touchmove", handleScroll);
        //     mainWrap.removeEventListener("scroll", handleScroll);
        //     window.addEventListener("scroll", handleScroll);
        // }
    }, [isMobile])

    useEffect(() => {
    }, [bestList, newList])

    const handleScroll = (e: Event) => {

        let scrollTop = 0;
        // if (isMobile) {
        //     const mainWrap = document.querySelector("#MainWrap");
        //     scrollTop = mainWrap.scrollTop;
        // } else {
        //     scrollTop = document.documentElement.scrollTop;
        // }

        scrollTop = document.documentElement.scrollTop;

        cur = scrollTop;

        if (prev === cur) {
            return;
        }

        // const screenHeight = window.innerHeight;
        const scrollBt = scrollTop + screenHeight;
        const clientTop = wrapRef.current.offsetTop;
        // const clientHeight = divRef.current.clientHeight;

        if (scrollBt >= clientTop && scrollTop <= clientTop + clientHeight) {
            // element.style.visibility = "visible";
            // element.style.bottom = "0px";
            // const element = imgRef.current as HTMLAnchorElement;
            // const elemHeight = element.clientHeight;
            divRef.current.style.visibility = "visible";

            let move = 0;
            move = (scrollBt - clientTop);
            // if (!isScroll) {
            //     move = (scrollBt - clientTop);
            // } else {
            //     move = Math.round(prev - cur);
            // }

            divRef.current.style.transform = `translate3d(0,${Math.round(screenHeight - move) + "px"},0)`;
            imgRef.current.style.transform = `translate3d(0,${Math.round(-elemHeight + move) + "px"},0)`;

            // element.style.transform = `translate3d(0,10px,0)`;
            // isScroll = true;


        }
        else {
            isScroll = false;
            divRef.current.style.visibility = "hidden";
            // imgRef.current.style.visibility = "hidden";
        }



        prev = cur;
    }

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
