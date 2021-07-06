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

    let prev = 0;
    let cur = 0;


    let prevPos = 0;

    const tt = useRef(null);

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
        cur = scrollTop;
        // const mm = Math.abs(cur - prev);
        const mm = cur - prev;
        const elem = divRef.current.firstElementChild as HTMLElement;

        const elemPos = window.getComputedStyle(elem).top.replace("px", "");
        // console.log(cur, prev);
        console.log(`거리 : ${mm}`);
        // console.log(`position : ${Number(elemPos) + Number(mm)}`);
        console.log(`ct : ${clientTop}`);
        console.log(`sb : ${scrollBt}`);
        console.log(`sh : ${screenHeight}`);


        if (scrollBt >= clientTop) {

        } else if (scrollTop <= clientTop + clientHeight) {

        }


        if (clientTop && scrollBt >= clientTop && scrollTop <= clientTop + clientHeight) {
            const move = (scrollBt - clientTop);

            const element = divRef.current.firstElementChild as HTMLAnchorElement;
            const elemHeight = elem.clientHeight;

            // console.log(`ep : ${(-elemHeight + move).toFixed(2)}`);
            // element.style.top = Math.ceil(-elemHeight + move) + "px";
            element.style.transform = `translateY(${Math.ceil(move) + "px"})`;

            // element.style.bottom = scrollBt - elemHeight + "px";


            // elem.style.top = Math.ceil(Number(elemPos) + Number(mm)) + "px";

            // console.log("들");
        }

        prevPos = scrollTop;

        prev = cur;
    }

    const test = (e) => {
        setInterval(() => {
            // const elem = divRef.current.firstElementChild as HTMLAnchorElement;
            const elemHeight = window.getComputedStyle(tt.current).top.replace("px", "");
            tt.current.style.top = (Number(elemHeight) + 10) + "px";
            console.log(tt.current);
        }, 1000, [tt])
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
                <button onClick={test}>test</button>
                <InteractiveWrap>
                    <InteraciveImg ref={divRef}>
                        <a ref={tt}></a>
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
