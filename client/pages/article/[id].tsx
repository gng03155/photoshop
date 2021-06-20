import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { fetcherData } from '../../src/util/fetcher';
import { Table } from './styles';
import Comment from '../../src/components/Comment';
import FileList from '../../src/components/FileList';



export default function Index() {

    const router = useRouter();

    const [boardKey, setBoardKey] = useState("");

    const { data: boardInfo } = useSWR(`board/board_list/${boardKey}`, fetcherData, { revalidateOnMount: true });

    useEffect(() => {
        console.log(router.query);
        if (typeof router.query.key === "string") {
            setBoardKey(router.query.key)
        }
    }, [])
    useEffect(() => {
        console.log(router.query);
        if (typeof router.query.key === "string") {
            setBoardKey(router.query.key)
        }
    }, [router])

    useEffect(() => {
        if (boardInfo !== undefined) {

        }
    }, [boardInfo])

    const test = () => {
        router.push({
            pathname: `/board/${boardInfo.category}/modify/${boardKey}`,
            query: {
                key: boardKey,
            },
        })
    }

    if (boardInfo === undefined || boardKey === "") {
        return <div></div>
    }

    return (
        <div>
            <button onClick={test}>수정</button>
            <Table>
                <colgroup>
                    <col style={{ width: 150 }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td className="title">{boardInfo.title}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        {/* <td className="title">{boardInfo.userInfo.name}</td> */}
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="some">
                                <strong>작성일</strong>
                                <span>{boardInfo.date}</span>
                                <strong>조회수</strong>
                                <span>{boardInfo.hits}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="desc">
                                <div dangerouslySetInnerHTML={{ __html: boardInfo.content }}></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <FileList boardKey={boardKey} />
            <Comment boardKey={boardKey} />
        </div>
    )
}
