import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr';

import { fetcherData } from '../../util/fetcher';
import PageNation from '../PageNation'

import { NoBoard, Table, WriteButton } from "./styles"
interface Props {
    boardKeyList: string[] | undefined,
    userKey: string,
    category: string,
}
export default function BoardList({ boardKeyList, userKey, category }: Props) {


    const [data, setData] = useState([[]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);

    const router = useRouter();

    const { data: allList } = useSWR(`board/board_list`, fetcherData, { revalidateOnMount: true });



    useEffect(() => {
    }, [])

    useEffect(() => {
        if (allList !== undefined && boardKeyList !== undefined) {
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
        const category = tg.dataset.category;
        if (type === "private") {
            if (userKey === user) {
                router.push({
                    pathname: `/article/${category}/${key}`
                });
            } else {
                alert("비밀글로 작성자만 볼 수 있습니다.");
            }
        } else if (type === "public") {
            router.push({
                pathname: `/article/${category}/${key}`
            });
        }



    }, [userKey])

    const onClickWrite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push({
            pathname: `/board/${category}/write`
        });
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
                    {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{(8 * curPage) + idx + 1}</td>
                                <td><a data-category={value.category} data-key={value.id} data-type={value.type} data-user={value.user_info.key} onClick={onClickBoard}>{value.title}</a></td>
                                <td>{value.user_info.name}</td>
                                <td>{value.date}</td>
                                <td>{value.hits}</td>
                            </tr>
                        )
                    }) :
                        <tr>
                            <td colSpan={5}><NoBoard><h3>등록된 게시글이 없습니다.</h3></NoBoard></td>
                        </tr>
                    }

                </tbody>
            </Table>
            <WriteButton>
                <button onClick={onClickWrite}>글쓰기</button>
            </WriteButton>
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber}></PageNation>
        </div>
    )
}
