import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcherData } from '../../../src/util/fetcher';
import BoardList from '../../../src/components/BoardList';
import { Title } from '../../../page_style/board/styles';
import { localFetcher } from '../../../src/util/localFetcher';
export default function Index() {

    const [userKey, setUserKey] = useState("");

    const [query, setQuery] = useState(null);

    const router = useRouter();

    const { data: user } = useSWR("userKey", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 0 });

    const { data: boardList } = useSWR(query ? `board/category/${query}` : "null", fetcherData, { revalidateOnMount: true, initialData: null });



    useEffect(() => {
        console.log(`userKey : ${user}`);
        const isUser = window.sessionStorage.getItem("uid");
        if (isUser) {
            console.log(isUser);
            setUserKey(window.sessionStorage.getItem("uid"));
        }


    }, [])

    useEffect(() => {
    }, [boardList])

    useEffect(() => {
        if (typeof router.query.id === "string") {
            setQuery(router.query.id);
        }
    }, [router])

    if (boardList === null || query === null) {
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
            {<BoardList boardKeyList={boardList} userKey={userKey} category={query}></BoardList>}
        </div>
    )
}
