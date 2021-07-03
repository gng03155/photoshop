import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'
import useSWR from 'swr'

import { MiniContent, MiniOrderWrap, MiniThumb, MiniTitle, ProductInfo, Table, Wrap } from './styles';

import { fetcherData } from '../../util/fetcher'
import PageNation from '../PageNation';
import { IOrder } from '../../types';

interface Props {
    userKey: string,
}
export default function OrderHistory({ userKey }: Props) {

    const { data: orderKey } = useSWR<string[] | undefined>(`order/user/${userKey}`, fetcherData, { revalidateOnMount: true });

    const { data: allList } = useSWR<{ [key: string]: IOrder } | undefined>(`order/p_list`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [orderList, setOrderList] = useState([]);

    const [data, setData] = useState<[IOrder[]]>([[null]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);

    const isTablet = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        if (orderKey !== undefined && allList !== undefined) {

            const temp = Object.keys(allList).reduce((prev, cur) => {
                if (orderKey.includes(cur)) {
                    prev.push(allList[cur])
                    return prev;
                }
                return prev;
            }, []);
            temp.reverse();
            setPage(temp);
        }
    }, [orderKey, allList])

    const setPage = (idList: IOrder[]) => {
        let totalIdx = parseInt(`${idList.length / 8}`);
        // totalIdx = totalIdx !== 0 ? totalIdx : 1;
        const copy: [IOrder[]] = [[]];
        for (let i = 0; i <= totalIdx; i++) {
            let list: IOrder[] | [undefined] = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= idList.length) {
                    break;
                }
                list.push(idList[j])
            }
            copy.push(list);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setData(copy);
    }

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

    const onSetPage = (num) => {
        setCurPage(num);
    }

    if (data[0] === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>주문내역조회</h2>
            {isTablet ?
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
                            <th>취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageNumber !== 0 &&
                            data[curPage].map((item, idx) => {
                                return (
                                    <tr key={item["key"]}>
                                        <td><a data-key={item["main_key"]} onClick={onClickDetail}>{item["order_num"]}</a></td>
                                        <td>
                                            <ProductInfo>
                                                <div className="img"><img src={item["product_info"]["thumb_src"]} alt="#" /></div>
                                                <div className="desc"><p>{item["product_info"]["name"]}</p><span>옵션 : {item["product_info"]["option"]}</span></div>
                                            </ProductInfo>
                                        </td>
                                        <td>{item["date"]}</td>
                                        <td><p>{item["product_info"]["price"]}원</p><p>{item["product_info"]["num"]}개</p></td>
                                        <td>{item["shipping"]}</td>
                                        <td></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                :
                <MiniOrderWrap>
                    {pageNumber !== 0 &&
                        data[curPage].map((item, idx) => {
                            return (
                                <li key={item["key"]}>
                                    <MiniTitle>
                                        <strong>{item["date"].split(" ")[0]}</strong>
                                        <a data-key={item["main_key"]} onClick={onClickDetail}>상세보기</a>
                                    </MiniTitle>
                                    <MiniContent>
                                        <p>{item["shipping"]}결제완료</p>
                                        <MiniThumb>
                                            <div><img src={item["product_info"]["thumb_src"]} alt="썸네일" /></div>
                                            <div>
                                                <p>{item["product_info"]["name"]}</p>
                                                <p>옵션 : {item["product_info"]["option"]}</p>
                                                <span><b>{item["product_info"]["price"]}</b>원</span>
                                                <span>/</span>
                                                <span>{item["product_info"]["num"]}개</span>
                                            </div>
                                        </MiniThumb>
                                    </MiniContent>
                                </li>
                            )
                        })
                    }
                </MiniOrderWrap>}
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={curPage} />
        </Wrap >
    )
}
