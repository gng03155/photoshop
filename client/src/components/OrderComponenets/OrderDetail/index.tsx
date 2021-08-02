import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'
import useSWR from 'swr'


import { Info, InfoTable, InfoWrap, MiniContent, MiniOrderWrap, MiniPrice, MiniThumb, MiniTitle, OrderTitle, OrderWrap, ProductInfo, Table, Wrap } from './styles';

import { fetcherData } from '../../../util/fetcher'
import { IDetailOrder, IOrder } from '../../../types';

interface Props {
    userKey: string,
    orderKey: string,
}
export default function OrderDetail({ userKey, orderKey }: Props) {

    const { data: orderInfo } = useSWR<IDetailOrder | undefined>(`order/order_list/${orderKey}`, fetcherData, { revalidateOnMount: true })
    const { data: allList } = useSWR<{ [key: string]: IOrder } | undefined>(`order/p_list`, fetcherData, { revalidateOnMount: true });
    const [orderList, setOrderList] = useState<IOrder[] | null>(null);

    const router = useRouter();

    const isTablet = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        if (orderInfo !== undefined) {
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
            {isTablet ? <OrderWrap>
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
                                        <td>{orderList[item]["product_info"]["mileage"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                                        <td>0원</td>
                                        <td><p>{orderList[item]["product_info"]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p><p>{orderList[item]["product_info"]["num"]}개</p></td>
                                        <td>무료배송</td>
                                        <td>{orderList[item]["shipping"]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </OrderWrap>
                :
                <MiniOrderWrap>
                    <ul>
                        <li>
                            <MiniTitle>
                                <div>
                                    <strong>{orderInfo.date.split(" ")[0]}</strong>
                                    <span>주문</span>
                                </div>
                                <div>
                                    <span>주문번호</span>
                                    <span>{orderInfo.order_num}</span>
                                </div>
                            </MiniTitle>
                        </li>
                        {orderList.length !== 0 &&
                            Object.keys(orderList).map((item, idx) => {
                                return (
                                    <li key={orderList[item]["key"]}>
                                        <MiniContent>
                                            <p>{orderList[item]["shipping"]}</p>
                                            <MiniThumb>
                                                <div><img src={orderList[item]["product_info"]["thumb_src"]} alt="썸네일" /></div>
                                                <div>
                                                    <p>{orderList[item]["product_info"]["name"]}</p>
                                                    <span>옵션 : {orderList[item]["product_info"]["option"]}</span>
                                                    <span>개수 : {orderList[item]["product_info"]["num"]}개</span>
                                                </div>
                                            </MiniThumb>
                                            <MiniPrice>
                                                <div>
                                                    <span>판매가</span>
                                                    <span>{orderList[item]["product_info"]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                                </div>
                                                <div>
                                                    <span>상품 할인</span>
                                                    <span>0원</span>
                                                </div>
                                                <div>
                                                    <span>적립금</span>
                                                    <span>{orderList[item]["product_info"]["mileage"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                                </div><div>
                                                    <span>결제금액</span>
                                                    <span>{orderList[item]["product_info"]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                                </div>
                                            </MiniPrice>
                                        </MiniContent>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </MiniOrderWrap>}
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
                                <td>{orderInfo.pay_info.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                            </tr>
                            <tr>
                                <th>누적 적립금</th>
                                <td>{orderInfo.pay_info.get_mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                            </tr>
                            <tr>
                                <th>적립금 할인</th>
                                <td>{orderInfo.pay_info.use_mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                            </tr>
                            <tr>
                                <th>할인 합계</th>
                                <td>{orderInfo.pay_info.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                            </tr>
                            <tr>
                                <th>결제 수단</th>
                                <td>{orderInfo.pay_info.type}</td>
                            </tr>
                            <tr>
                                <th>최종 결제 금액</th>
                                <td>{orderInfo.pay_info.pay_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                            </tr>
                        </tbody>
                    </InfoTable>
                </Info>
            </InfoWrap>
        </Wrap>
    )
}
