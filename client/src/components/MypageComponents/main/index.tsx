import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react'
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

    const onClickCategory = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        const tg = e.currentTarget as EventTarget & HTMLLIElement;
        const name = tg.dataset.name;
        router.push(`/mypage/${name}`);
        return;
    }, [router])

    if (!isInit) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>???????????????</h2>
            <Maileage>
                <ul>
                    <li>
                        <span>??? ?????????</span>
                        <span>{userInfo.mileage}???</span>
                    </li>
                    <li>
                        <span>??? ??????</span>
                        <span>{allOrderPrice}???({userOrderList !== undefined ? userOrderList.length : 0}???)</span>
                    </li>
                    <li><Link href="/mypage/mileage"><a>????????? ????????????</a></Link></li>
                </ul>
            </Maileage>
            <h3>?????? ???????????? ??????</h3>
            <Delivery>
                <ul>
                    <li className="item">
                        <p>?????????</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>???????????????</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>?????????</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>????????????</p>
                        <strong>0</strong>
                    </li>
                    <li className="list">
                        <p>?????? : 0</p>
                        <p>?????? : 0</p>
                        <p>?????? : 0</p>
                    </li>
                </ul>
            </Delivery>
            <Menu>
                <ul>
                    <li data-name="order" onClick={onClickCategory}>
                        <div></div>
                        <strong>Order</strong>
                        <p>????????????</p>
                        <span>??????????????? ???????????? ????????? ??????????????? ???????????? ??? ????????????.</span>
                    </li>
                    <li data-name="modify" onClick={onClickCategory}>
                        <div></div>
                        <strong>Profile</strong>
                        <p>????????????</p>
                        <span>???????????? ???????????? ??????????????? ???????????? ???????????????.</span>
                    </li>
                    <li data-name="like" onClick={onClickCategory}>
                        <div></div>
                        <strong>Wishlist</strong>
                        <p>????????????</p>
                        <span>?????????????????? ???????????? ????????? ????????? ??????????????????.</span>
                    </li>
                    <li data-name="board" onClick={onClickCategory}>
                        <div></div>
                        <strong>Board</strong>
                        <p>????????? ??????</p>
                        <span>??????????????? ???????????? ???????????? ???????????? ???????????????.</span>
                    </li>
                </ul>
            </Menu>
        </Wrap>
    )
}
