import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import Link from 'next/link';

import { fetcherData, fetcherStorage } from '../../util/fetcher';
import { Wrap, ThumbNail, Description, Color, Promotion, Like, IconWrap, ColorWrap, Desc } from "./styles"

interface Props {
    id: string,
}
export default function ProductItem({ id }: Props) {

    const { data: productInfo } = useSWR(`products/product/${id}`, fetcherData, { revalidateOnMount: true });
    const { data: thumbImg } = useSWR(`products/${id}/imgs/thumb`, fetcherStorage, { revalidateOnMount: true });
    const { data: reviewList } = useSWR(`products/review/${id}`, fetcherData, { revalidateOnMount: true });

    const [reviewNum, setReviewNum] = useState(0);

    useEffect(() => {
        if (reviewList === undefined) {
            setReviewNum(0)
        } else {
            setReviewNum(reviewList.length);
        }
    }, [reviewList])

    useEffect(() => {
    }, [productInfo])

    if (productInfo === undefined || thumbImg === undefined) {
        return <div></div>
    }

    return (
        <Wrap>
            <ThumbNail>
                <Link href={`/product/${productInfo.id}`}>
                    <a><img src={thumbImg[0]} alt="상품 썸네일" /></a>
                </Link>
            </ThumbNail>
            <Description>
                <ColorWrap>
                    {productInfo.color !== undefined &&
                        productInfo.color.map((color, idx) => {
                            return <Color key={idx} color={color}></Color>
                        })}
                </ColorWrap>
                <Desc>
                    <span>{productInfo.name}</span>
                    <strong>{productInfo.price}원</strong>
                    <p>리뷰수 : {reviewNum}</p>
                </Desc>
                {/* <IconWrap> */}
                <Like>
                    <a></a>
                    <span>{productInfo.like}</span>
                </Like>
                <Promotion>
                    {productInfo.category.includes("new") && <img src="/img/new_icon.png" alt="new" />}
                    {productInfo.category.includes("best") && <img src="/img/best_icon.png" alt="best" />}
                </Promotion>
                {/* </IconWrap> */}
            </Description>
        </Wrap>
    )
}
