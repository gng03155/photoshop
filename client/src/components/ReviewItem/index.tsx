import React from 'react'
import useSWR from 'swr'
import { fetcherData, fetcherStorage } from '../../util/fetcher'
import { Wrap, ThumbWrap, DescWrap, SubWrap, RightBox } from "./styles"
interface Props {
    productInfo: {
        [id: string]: string,
        name: string,
    },
    boardKey: string,

}
export default function ReviewItem({ productInfo, boardKey }: Props) {

    const { data: boardInfo } = useSWR(`board/board_list/${boardKey}`, fetcherData, { revalidateOnMount: true });

    const { data: thumbImg } = useSWR(`products/${productInfo.id}/imgs/thumb`, fetcherStorage, { revalidateOnMount: true });

    if (boardInfo === undefined || thumbImg === undefined) {
        return <div></div>
    }
    return (
        <Wrap>
            <ThumbWrap>
                <img src={thumbImg[0]} alt="#" />
            </ThumbWrap>
            <RightBox>
                <DescWrap>
                    <h4>{productInfo.name}</h4>
                    <p>{boardInfo.content}</p>
                    <span>...더보기</span>
                </DescWrap>
                <SubWrap>
                    <span>{boardInfo.user_info.name}</span>
                    <span>{boardInfo.date}</span>
                </SubWrap>
            </RightBox>
        </Wrap>
    )
}
