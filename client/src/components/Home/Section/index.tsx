import React, { useRef, useEffect } from 'react'

import { SectionWrap, NewItem, InteraciveImg, BestItem, InteractiveWrap } from "./styles"

import ProductItem from '../../ProductItem'
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';

export default function Section() {

    const { data: bestList } = useSWR(`products/category/best`, fetcherData, { revalidateOnMount: true });
    const { data: newList } = useSWR(`products/category/new`, fetcherData, { revalidateOnMount: true });

    const divRef = useRef<HTMLImageElement>(null);


    let prevPos = 0;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    useEffect(() => {
    }, [bestList, newList])

    const handleScroll = () => {
        if (divRef.current === null) {
            return;
        }
        const screenHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollBt = scrollTop + screenHeight;
        const clientTop: number | undefined = divRef.current ? divRef.current?.offsetTop : undefined;
        const clientHeight = divRef.current.clientHeight;

        if (clientTop && scrollBt >= clientTop && scrollTop <= clientTop + clientHeight) {
            const move = (scrollBt - clientTop);

            const element = divRef.current.firstElementChild as HTMLElement;
            const elemHeight = element.clientHeight;

            element.style.top = -elemHeight + move + "px";
        }

        prevPos = scrollTop;
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
                <InteractiveWrap>
                    <InteraciveImg ref={divRef}>
                        <img src="/img/ch2.jpg" alt="#" />
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
