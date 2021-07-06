import React, { useRef, useEffect } from 'react'

import { SectionWrap, NewItem, InteraciveImg, BestItem, InteractiveWrap } from "./styles"

import ProductItem from '../../ProductItem'
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';
import { setInterval } from 'timers';

export default function Section() {

    const { data: bestList } = useSWR(`products/category/best`, fetcherData, { revalidateOnMount: true });
    const { data: newList } = useSWR(`products/category/new`, fetcherData, { revalidateOnMount: true });

    const divRef = useRef<HTMLImageElement>(null);

    const imgRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", e => handleScroll(e));
        window.addEventListener("touchmove", e => handleScroll(e));
        return () => {
            window.removeEventListener("scroll", e => handleScroll(e));
            window.removeEventListener("touchmove", e => handleScroll(e));
        }
    }, [])

    useEffect(() => {
    }, [bestList, newList])

    const handleScroll = (e: Event) => {
        if (divRef.current === null) {
            return;
        }

        const screenHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollBt = scrollTop + screenHeight;
        const clientTop: number | undefined = wrapRef.current ? wrapRef.current?.offsetTop : undefined;
        const clientHeight = divRef.current.clientHeight;


        if (scrollBt >= clientTop && scrollTop <= clientTop + clientHeight) {
            const move = (scrollBt - clientTop);
            divRef.current.style.visibility = "visible";
            const element = divRef.current.firstElementChild as HTMLAnchorElement;
            const elemHeight = imgRef.current.clientHeight;

            divRef.current.style.transform = `translate3d(0,${Math.ceil(screenHeight - move) + "px"},0)`;
            element.style.transform = `translate3d(0,${Math.ceil(-elemHeight + move - 10) + "px"},0)`;

        }
        else {
            divRef.current.style.visibility = "hidden";
        }
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
                        {/* <img src="/img/123.jpg" alt="#" /> */}
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
