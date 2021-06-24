import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcherData } from '../../util/fetcher'
import { Info, InfoTable, InfoWrap, OrderTitle, ProductInfo, Table, Wrap } from './styles';
interface Props {
    userKey: string,
    orderKey: string,
}
export default function OrderDetail({ userKey, orderKey }: Props) {

    const { data: orderInfo } = useSWR(`order/order_list/${orderKey}`, fetcherData, { revalidateOnMount: true })
    const { data: allList } = useSWR(`order/p_list`, fetcherData, { revalidateOnMount: true });
    const [orderList, setOrderList] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (orderInfo !== undefined) {
            if (orderInfo.user_key !== userKey) {
                // router.back();
            }
            if (orderInfo !== undefined && allList !== undefined) {
                const temp = Object.keys(allList).reduce((prev, cur) => {
                    if (orderInfo.product_list.includes(cur)) {
                        prev.push(allList[cur])
                        return prev;
                    }
                    return prev;
                }, []);
                setOrderList(temp);
            }
        }
    }, [orderInfo, allList])

    if (orderList === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>주문 상세 내역</h2>
            <OrderTitle>
                <div>
                    <span>주문번호</span>
                    <strong>{orderInfo.order_num}</strong>
                </div>
                <div>
                    <span>주문일자</span>
                    <strong>{orderInfo.date}</strong>
                </div>
            </OrderTitle>
            <Table>
                <colgroup>
                    <col width="25%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="14%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>상품정보</th>
                        <th>적립금</th>
                        <th>결제수수료</th>
                        <th>주문금액(수량)</th>
                        <th>배송정보</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.length !== 0 &&
                        Object.keys(orderList).map((item, idx) => {
                            return (
                                <tr key={orderList[item]["key"]}>
                                    <td>
                                        <ProductInfo>
                                            <div className="img"><img src={orderList[item]["product_info"]["thumb_src"]} alt="#" /></div>
                                            <div className="desc"><p>{orderList[item]["product_info"]["name"]}</p><span>옵션 : {orderList[item]["product_info"]["option"]}</span></div>
                                        </ProductInfo>
                                    </td>
                                    <td>0원</td>
                                    <td>0원</td>
                                    <td><p>{orderList[item]["product_info"]["price"]}원</p><p>{orderList[item]["product_info"]["num"]}개</p></td>
                                    <td>무료배송</td>
                                    <td>{orderList[item]["shipping"]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <InfoWrap>
                <Info>
                    <h3>배송지 정보</h3>
                    <InfoTable>
                        <colgroup>
                            <col width="150px" />
                            <col width="auto" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>{orderInfo.shipping_info.name}</td>
                            </tr>
                            <tr>
                                <th>배송지 주소</th>
                                <td>{orderInfo.shipping_info.adrs}</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>{orderInfo.shipping_info.mobile}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{orderInfo.shipping_info.email}</td>
                            </tr>
                            <tr>
                                <th>배송 메시지</th>
                                <td>{orderInfo.shipping_info.msg}</td>
                            </tr>
                        </tbody>
                    </InfoTable>
                </Info>
                <Info>
                    <h3>결제 정보</h3>
                    <InfoTable>
                        <colgroup>
                            <col width="150px" />
                            <col width="auto" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>상품 합계</th>
                                <td>{orderInfo.pay_info.price}</td>
                            </tr>
                            <tr>
                                <th>할인 합계</th>
                                <td>{orderInfo.pay_info.sale}</td>
                            </tr>
                            <tr>
                                <th>결제 수수료</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>최종 결제 금액</th>
                                <td>{orderInfo.pay_info.price}</td>
                            </tr>
                            <tr>
                                <th>결제 수단</th>
                                <td>{orderInfo.pay_info.type}</td>
                            </tr>
                        </tbody>
                    </InfoTable>
                </Info>
            </InfoWrap>
        </Wrap>
    )
}
