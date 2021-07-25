import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { IOrder, IUser } from '../../../types';
import { fetcherData } from '../../../util/fetcher';
import { Wrap, Maileage, Delivery, Menu } from "./styles"

interface Props {
    userKey: string,
}
export default function Main({ userKey }: Props) {

    const { data: userInfo } = useSWR<IUser | undefined>(`/users/${userKey}`, fetcherData, { revalidateOnMount: true });
    const { data: userOrderList } = useSWR<string[] | undefined | null>(`/order/user/${userKey}`, fetcherData, { revalidateOnMount: true, initialData: null });
    const { data: allOrderList } = useSWR<{ [key: string]: IOrder } | undefined | null>(`/order/p_list`, fetcherData, { revalidateOnMount: true, initialData: null });

    const [isInit, setIsInit] = useState(false);
    const [allOrderPrice, setAllOrderPrice] = useState(0);

    const router = useRouter();


    useEffect(() => {

        if (allOrderList !== null && userOrderList !== null && userInfo !== undefined) {

            if (allOrderList === undefined || userOrderList === undefined) {
                setAllOrderPrice(0);
            }
            else {
                const userOrLi = [];
                for (let list in allOrderList) {
                    if (userOrderList.includes(list)) {
                        userOrLi.push(allOrderList[list]);
                    }
                }


                let allOrPr = userOrLi.reduce((prev, cur) => {
                    let temp = Number(cur["product_info"]["price"]) * Number(cur["product_info"]["num"]);
                    prev = prev + temp;
                    return prev;
                }, 0)

                setAllOrderPrice(allOrPr);
            }
            setIsInit(true);
        }

    }, [userOrderList, allOrderList, userInfo])

    const onClickCategory = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        const tg = e.currentTarget as EventTarget & HTMLLIElement;
        const name = tg.dataset.name;
        console.log(name);
        router.push(`/mypage/${name}`);
        return;

    }

    if (!isInit) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>마이페이지</h2>
            <Maileage>
                <ul>
                    <li>
                        <span>총 적립금</span>
                        <span>{userInfo.mileage}원</span>
                    </li>
                    <li>
                        <span>총 주문</span>
                        <span>{allOrderPrice}원({userOrderList !== undefined ? userOrderList.length : 0}회)</span>
                    </li>
                    <li><Link href="/mypage/mileage"><a>적립금 상세내역</a></Link></li>
                </ul>
            </Maileage>
            <h3>나의 주문처리 현황</h3>
            <Delivery>
                <ul>
                    <li className="item">
                        <p>입금전</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송준비중</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송중</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송완료</p>
                        <strong>0</strong>
                    </li>
                    <li className="list">
                        <p>취소 : 0</p>
                        <p>교환 : 0</p>
                        <p>반품 : 0</p>
                    </li>
                </ul>
            </Delivery>
            <Menu>
                <ul>
                    <li data-name="order" onClick={onClickCategory}>
                        <div></div>
                        <strong>Order</strong>
                        <p>주문내역</p>
                        <span>고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.</span>
                    </li>
                    <li data-name="modify" onClick={onClickCategory}>
                        <div></div>
                        <strong>Profile</strong>
                        <p>회원정보</p>
                        <span>회원이신 고객님의 개인정보를 관리하는 공간입니다.</span>
                    </li>
                    <li data-name="like" onClick={onClickCategory}>
                        <div></div>
                        <strong>Wishlist</strong>
                        <p>관심상품</p>
                        <span>관심상품으로 등록하신 상품의 목록을 보여드립니다.</span>
                    </li>
                    <li data-name="board" onClick={onClickCategory}>
                        <div></div>
                        <strong>Board</strong>
                        <p>게시물 관리</p>
                        <span>고객님께서 작성하신 게시물을 관리하는 공간입니다.</span>
                    </li>
                </ul>
            </Menu>
        </Wrap>
    )
}
