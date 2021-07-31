import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcherData } from '../../../src/util/fetcher';
import BoardList from '../../../src/components/BoardComponents/BoardList';
import { Title } from '../../../page_style/board/styles';
import { localFetcher } from '../../../src/util/localFetcher';
export default function Index() {

    const [userKey, setUserKey] = useState("");

    const [query, setQuery] = useState(null);

    const router = useRouter();

    const { data: boardKeyList, revalidate } = useSWR<string[] | undefined | null>(query !== null ? `board/category/${query}` : "", fetcherData, { initialData: null, revalidateOnMount: true });

    useEffect(() => {
        const isUser = window.sessionStorage.getItem("uid");
        if (isUser) {
            setUserKey(window.sessionStorage.getItem("uid"));
        }
    }, [])

    useEffect(() => {
        if (typeof router.query.id === "string") {
            setQuery(router.query.id);
        }
        revalidate();
    }, [router])

    if (boardKeyList === null) {
        return <div></div>;
    }

    return (
        <div>
            <Title>
                {query === "notice" && <h2>공지사항</h2>}
                {query === "free" && <h2>자유게시판</h2>}
                {query === "review" && <h2>상품후기</h2>}
                {query === "qna" && <h2>Q&A</h2>}
            </Title>
            {<BoardList userKey={userKey} category={query} boardKeyList={boardKeyList} boardRevalidate={revalidate}></BoardList>}
        </div>
    )
}
