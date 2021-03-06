import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'
import useSWR from 'swr'

import { MiniContent, MiniOrderWrap, MiniThumb, MiniTitle, NoneHistory, ProductInfo, Table, Wrap } from './styles';

import { fetcherData } from '../../../util/fetcher'
import PageNation from '../../PageNation';
import { IOrder } from '../../../types';

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

    const setPage = useCallback((idList: IOrder[]) => {
        let totalIdx = parseInt(`${idList.length / 8}`);
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
    }, [])

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

    const onSetPage = useCallback((num) => {
        setCurPage(num);
    }, [])

    if (data[0] === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>??????????????????</h2>
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
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>??????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageNumber !== 0 ?
                            data[curPage].map((item, idx) => {
                                return (
                                    <tr key={item["key"]}>
                                        <td><a data-key={item["main_key"]} onClick={onClickDetail}>{item["order_num"]}</a></td>
                                        <td>
                                            <ProductInfo>
                                                <div className="img"><img src={item["product_info"]["thumb_src"]} alt="#" /></div>
                                                <div className="desc"><p>{item["product_info"]["name"]}</p><span>?????? : {item["product_info"]["option"]}</span></div>
                                            </ProductInfo>
                                        </td>
                                        <td>{item["date"]}</td>
                                        <td><p>{item["product_info"]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</p><p>{item["product_info"]["num"]}???</p></td>
                                        <td>{item["shipping"]}</td>
                                        <td></td>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td colSpan={6}>??????????????? ????????????.</td>
                            </tr>
                        }
                    </tbody>
                </Table>
                :
                <MiniOrderWrap>
                    <ul>
                        {pageNumber !== 0 ?
                            data[curPage].map((item, idx) => {
                                return (
                                    <li key={item["key"]}>
                                        <MiniTitle>
                                            <strong>{item["date"].split(" ")[0]}</strong>
                                            <a data-key={item["main_key"]} onClick={onClickDetail}>????????????</a>
                                        </MiniTitle>
                                        <MiniContent>
                                            <p>{item["shipping"]}????????????</p>
                                            <MiniThumb>
                                                <div><img src={item["product_info"]["thumb_src"]} alt="?????????" /></div>
                                                <div>
                                                    <p>{item["product_info"]["name"]}</p>
                                                    <p>?????? : {item["product_info"]["option"]}</p>
                                                    <span><b>{item["product_info"]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>???</span>
                                                    <span>/</span>
                                                    <span>{item["product_info"]["num"]}???</span>
                                                </div>
                                            </MiniThumb>
                                        </MiniContent>
                                    </li>
                                )
                            }) :
                            <li><NoneHistory>??????????????? ????????????.</NoneHistory></li>
                        }
                    </ul>
                </MiniOrderWrap>}
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={curPage} />
        </Wrap >
    )
}
