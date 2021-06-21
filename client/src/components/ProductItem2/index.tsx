import React from 'react'
import { Wrap } from './styles'

export default function ProductItem2() {



    return (
        <Wrap>
            <div>
                <img src="/img/ch2.jpg" alt="상품이미지" />
            </div>
            <nav>
                <p>상품이름</p>
                <strong>10000원</strong>
                <article>
                    <a className="like"></a>
                    <span>1000</span>
                </article>
                <button>상품 상세보기</button>
            </nav>
        </Wrap>
    )
}
