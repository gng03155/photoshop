import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { fetcherData } from '../../util/fetcher';
import PageNation from '../PageNation';
import { useMediaQuery } from 'react-responsive'
import { MiniMileage, NoneHistory, Table, Wrap } from './styles';
import { useRouter } from 'next/router';
import { IMileage } from '../../types';

export default function MileageHistory({ userKey }) {


    const { data: mileageList } = useSWR<{ [key: string]: IMileage } | undefined | null>(`/mileage/history/${userKey}`, fetcherData, { revalidateOnMount: true, initialData: null });

    const isTablet = useMediaQuery({ minWidth: 480 });

    const router = useRouter();

    const [data, setData] = useState([[]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);
    const [curIdList, setCurIdList] = useState([]);

    const [isInit, setIsinit] = useState(false);

    useEffect(() => {
        if (mileageList !== null) {
            if (mileageList !== undefined) {
                setPage(Object.keys(mileageList).reverse());
            }
            setIsinit(true);
        }
    }, [mileageList])

    const setPage = (idList: string[]) => {
        const num = idList.length;
        if (num === 0) {
            setCurPage(0)
            setPageNumber(0);
            setData([[]]);
            setCurIdList([]);
            return;
        }
        let totalIdx = Math.floor(num / 8);
        const copy = [[]];
        for (let i = 0; i <= totalIdx; i++) {
            let list: IMileage[] = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= idList.length) {
                    break;
                }
                list.push(mileageList[idList[j]]);
            }
            copy.push(list);
        }
        if (num % 8 === 0) {
            copy.splice(-1, 1);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setCurIdList(idList);
        setCurPage(0);
        setData(copy);
    }

    const onClickOrderNum = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const orderKey = tg.dataset.key;
        router.push({
            pathname: "/mypage/[id]",
            query: {
                orderKey,
            }
        }, "/mypage/order_detail")
    }
    const onSetPage = (num) => {
        setCurPage(num);
    }

    if (!isInit) {
        console.log("여기니?")
        return <div></div>
    }

    return (
        <Wrap>
            {console.log("들어옴>")}
            <h2>마일리지 내역</h2>
            {isTablet ? <><Table>
                <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>출처</th>
                        <th>상태</th>
                        <th>마일리지</th>
                        <th>누적 마일리지</th>
                        <th>적립일</th>
                    </tr>
                </thead>
                <tbody>
                    {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                        return (
                            <tr key={idx}>
                                <td><a data-key={value["order_key"]} onClick={onClickOrderNum}>{value["order"]}</a></td>
                                <td>{value["type"] == "buy" ? "상품구매" : "몰라"}</td>
                                <td>{value["state"] == "increase" ? "증가" : "감소"}</td>
                                <td>{value["use_mileage"]}</td>
                                <td>{value["total_mileage"]}</td>
                                <td>{value["date"]}</td>
                            </tr>
                        )
                    }) :
                        <tr>
                            <td colSpan={6}><NoneHistory>내역이 없습니다.</NoneHistory></td>
                        </tr>}
                </tbody>
            </Table>
                <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={0}></PageNation>
            </> :
                <MiniMileage>
                    <ul>
                        {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                            return (
                                <li key={idx}>
                                    <strong>{idx + 1}</strong>
                                    <div>
                                        <span>주문번호</span>
                                        <span>{value["order"]}</span>
                                    </div>
                                    <div>
                                        <span>분류</span>
                                        <span>{value["type"] == "buy" ? "상품구매" : "몰라"}</span>
                                    </div>
                                    <div>
                                        <span>상태</span>
                                        <span>{value["state"] == "increase" ? "증가" : "감소"}</span>
                                    </div>
                                    <div>
                                        <span>마일리지</span>
                                        <span>{value["use_mileage"]}</span>
                                    </div>
                                    <div>
                                        <span>누적 마일리지</span>
                                        <span>{value["total_mileage"]}</span>
                                    </div>
                                    <div>
                                        <span>적립일</span>
                                        <span>{value["date"]}</span>
                                    </div>
                                </li>
                            )
                        }) :
                            <li>
                                <h4>내역이 없습니다.</h4>
                            </li>}
                    </ul>
                </MiniMileage>}
        </Wrap>
    )
}
