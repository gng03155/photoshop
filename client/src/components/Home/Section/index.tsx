import React, { useRef, useEffect } from 'react'

import { SectionWrap, NewItem, InteraciveImg, BestItem } from "./styles"

import ProductItem from '../../ProductItem'

export default function Section() {

    const divRef = useRef<HTMLImageElement>(null);

    let prevPos = 0;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleScroll = () => {
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
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                    </ul>
                </NewItem>
                <InteraciveImg ref={divRef}>
                    <img src="/img/ch2.jpg" alt="#" />
                </InteraciveImg>
                <BestItem>
                    <h3>BEST ITEM</h3>
                    <ul>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                        <li>
                            <ProductItem />
                        </li>
                    </ul>
                </BestItem>
            </SectionWrap>
        </div>
    )
}
