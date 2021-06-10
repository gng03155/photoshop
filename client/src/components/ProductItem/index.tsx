import React from 'react'
import { Wrap, ThumbNail, Color } from "./styles"
export default function ProductItem() {
    return (
        <Wrap>
            <ThumbNail>
                <img src="img/ch2.jpg" alt="상품 썸네일" />
            </ThumbNail>
            <span>상품이름</span>
            <p>상품 부연 설명</p>
            <strong>가격</strong>
            <Color>
                <span></span>
                <span></span>
            </Color>
        </Wrap>
    )
}
