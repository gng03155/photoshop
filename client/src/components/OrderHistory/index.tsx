import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcherData } from '../../util/fetcher'
import { ProductInfo, Table, Wrap } from './styles';

interface Props {
    userKey: string,
}
export default function OrderHistory({ userKey }: Props) {

    const { data: orderKey } = useSWR(`order/user/${userKey}`, fetcherData, { revalidateOnMount: true });

    const { data: allList } = useSWR(`order/p_list`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [orderList, setOrderList] = useState(null);

    useEffect(() => {
        if (orderKey !== undefined && allList !== undefined) {
            console.log(allList);
            console.log(orderKey);

            const temp = Object.keys(allList).reduce((prev, cur) => {
                if (orderKey.includes(cur)) {
                    prev.push(allList[cur])
                    return prev;
                }
                return prev;
            }, []);
            setOrderList(temp);
        }
    }, [orderKey, allList])

    const onClickDetail = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const key = tg.dataset.key;

        router.push({
            pathname: "/mypage/[id]",
            query: {
                orderKey: key,
            },
        }, "/mypage/order_detail");

    }, [router])

    if (orderList === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>주문내역조회</h2>
            <Table>
                <colgroup>
                    <col width="10%" />
                    <col width="25%" />
                    <col width="14%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>상품정보</th>
                        <th>주문일자</th>
                        <th>주문금액</th>
                        <th>주문상태</th>
                        <th>취소/교환</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.length !== 0 &&
                        Object.keys(orderList).map((item, idx) => {
                            return (
                                <tr key={orderList[item]["key"]}>
                                    <td><a data-key={orderList[item]["main_key"]} onClick={onClickDetail}>{orderList[item]["order_num"]}</a></td>
                                    <td>
                                        <ProductInfo>
                                            <div className="img"><img src={orderList[item]["product_info"]["thumb_src"]} alt="#" /></div>
                                            <div className="desc"><p>{orderList[item]["product_info"]["name"]}</p><span>옵션 : {orderList[item]["product_info"]["option"]}</span></div>
                                        </ProductInfo>
                                    </td>
                                    <td>{orderList[item]["date"]}</td>
                                    <td><p>{orderList[item]["product_info"]["price"]}원</p><p>{orderList[item]["product_info"]["num"]}개</p></td>
                                    <td>{orderList[item]["shipping"]}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Wrap>
    )
}
