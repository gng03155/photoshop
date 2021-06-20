import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcherData } from '../../../src/util/fetcher';
import BoardList from '../../../src/components/BoardList';
export default function Index() {

    const [userKey, setUserKey] = useState("");

    const [query, setQuery] = useState("");

    const router = useRouter();

    const name = router.query.id;

    const { data: boardList } = useSWR(`board/category/${name}`, fetcherData, { revalidateOnMount: true });



    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
        console.log("[id]들어옴");
    }, [])

    useEffect(() => {
    }, [boardList])

    useEffect(() => {
        if (typeof router.query.id === "string") {
            setQuery(router.query.id);
        }
    }, [router])

    if (boardList === undefined) {
        return <div></div>;
    }

    return (
        <div>
            {query === "notice" && <h2>공지사항</h2>}
            {query === "free" && <h2>자유게시판</h2>}
            {query === "review" && <h2>상품후기</h2>}
            {query === "qna" && <h2>Q&A</h2>}
            <BoardList boardKeyList={boardList}></BoardList>
        </div>
    )
}
