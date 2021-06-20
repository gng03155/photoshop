import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr';

import { fetcherData } from '../../util/fetcher';
import PageNation from '../PageNation'

import { Table } from "./styles"

export default function BoardList({ boardKeyList }: any) {


    const [userKey, setUserKey] = useState("");
    const [data, setData] = useState([[]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);

    const router = useRouter();

    const { data: allList } = useSWR(`board/board_list`, fetcherData, { revalidateOnMount: true });



    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [])

    useEffect(() => {
        if (allList !== undefined) {
            setBoardList();
        }
    }, [allList])

    const setBoardList = async () => {
        let listKeys = Object.keys(allList)
        let temp = [];
        for (let key of boardKeyList) {
            const num = listKeys.indexOf(key);
            if (num === -1) {
                continue;
            }
            // const value = await fb.database().ref(`board/board_list/${key}`).once("value").then((temp) => { return temp.val() })
            const value = allList[listKeys[num]];
            if (temp !== null)
                temp.push(value)
        }
        if (temp.length === 0) {
            return;
        }
        temp.reverse();
        let totalIdx = parseInt(`${temp.length / 8}`);
        if (totalIdx === 0) {
            totalIdx = 1;
        }
        const copy = [[]];
        for (let i = 0; i < totalIdx; i++) {
            let list = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= boardKeyList.length) {
                    break;
                }
                list.push(temp[j])
            }
            copy.push(list);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setData(copy);

    }

    const onSetPage = (num) => {
        setCurPage(num);
    }

    const onClickBoard = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const tg = e.target as HTMLAnchorElement;
        e.preventDefault();
        const type = tg.dataset.type;
        const user = tg.dataset.user;
        const key = tg.dataset.key;
        if (type === "private") {
            if (userKey === user) {
                router.push({
                    pathname: `/article/${key}`, query: {
                        key,
                    }
                });
            } else {
                alert("비밀글로 작성자만 볼 수 있습니다.");
            }
        } else if (type === "public") {
            router.push({
                pathname: `/article/${key}`, query: {
                    key,
                }
            });
        }



    }, [userKey])

    if (pageNumber === 0) {
        return <div></div>
    }


    return (
        <div>
            <Table>
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>시간</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {data[curPage].map((value, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{(8 * curPage) + idx + 1}</td>
                                <td><a data-key={value.id} data-type={value.type} data-user={value.userInfo.key} onClick={onClickBoard}>{value.title}</a></td>
                                <td>{value.userInfo.name}</td>
                                <td>{value.date}</td>
                                <td>{value.hits}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber}></PageNation>
        </div>
    )
}
