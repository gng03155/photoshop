import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Main from '../../src/components/Mypage/main'
import Wishlist from '../../src/components/Wishlist';

export default function index() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [userKey, setUserKey] = useState("");

    useEffect(() => {
        if (window.sessionStorage.getItem("uid") === null) {
            router.push("/login");
        }
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [])

    useEffect(() => {
        if (typeof router.query.id === "string") {
            setQuery(router.query.id);
        }
    }, [router])



    return (
        <div>
            {query === "main" && <Main></Main>}
            {query === "like" && <Wishlist userKey={userKey}></Wishlist>}
            {query === "mola" && <Main></Main>}
            {query === "main" && <Main></Main>}
        </div>
    )
}
