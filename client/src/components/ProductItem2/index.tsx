import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr'
import { IProduct } from '../../types';
import { fetcherData, fetcherStorage } from '../../util/fetcher'
import { Wrap } from './styles'

interface Props {
    productId?: string
}
export default function ProductItem2({ productId }: Props) {

    const { data: productInfo } = useSWR<IProduct | undefined>(productId ? `products/product/${productId}` : "null", fetcherData, { revalidateOnMount: true });
    const { data: thumbImg } = useSWR<string[] | undefined>(`products/${productId}/imgs/thumb`, fetcherStorage, { revalidateOnMount: true });

    const router = useRouter();

    if (productInfo === undefined || thumbImg === undefined) {
        return <div></div>
    }

    const onClickProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLButtonElement;
        router.push(`/product/${tg.dataset.id}`);
        return;
    }

    return (
        <Wrap>
            <div>
                <img src={thumbImg[0]} alt="상품이미지" />
            </div>
            <nav>
                <p>{productInfo.name}</p>
                <strong>{productInfo.price.toLocaleString()}원</strong>
                <article>
                    <a className="like"></a>
                    <span>{productInfo.like}</span>
                </article>
                <button data-id={productInfo.id} onClick={onClickProduct}>상품 상세보기</button>
            </nav>
        </Wrap>
    )
}
