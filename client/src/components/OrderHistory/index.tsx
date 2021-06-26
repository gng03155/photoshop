import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcherData } from '../../util/fetcher'
import PageNation from '../PageNation';
import { ProductInfo, Table, Wrap } from './styles';

interface Props {
    userKey: string,
}
export default function OrderHistory({ userKey }: Props) {

    const { data: orderKey } = useSWR(`order/user/${userKey}`, fetcherData, { revalidateOnMount: true });

    const { data: allList } = useSWR(`order/p_list`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [orderList, setOrderList] = useState([]);

    const [data, setData] = useState<string[][]>([[null]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);

    useEffect(() => {
        if (orderKey !== undefined && allList !== undefined) {

            const temp = Object.keys(allList).reduce((prev, cur) => {
                if (orderKey.includes(cur)) {
                    prev.push(allList[cur])
                    return prev;
                }
                return prev;
            }, []);
            setPage(temp);
            // setOrderList(temp);
        }
    }, [orderKey, allList])

    const setPage = (idList) => {
        let totalIdx = parseInt(`${idList.length / 8}`);
        // totalIdx = totalIdx !== 0 ? totalIdx : 1;
        const copy = [[]];
        for (let i = 0; i <= totalIdx; i++) {
            let list: string[] = [];
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
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={curPage} />
        </Wrap>
    )
}
