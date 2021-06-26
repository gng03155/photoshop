import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Member from '../../src/components/Member';
import Main from '../../src/components/Mypage/main'
import OrderDetail from '../../src/components/OrderDetail';
import OrderHistory from '../../src/components/OrderHistory';
import UserBoardManager from '../../src/components/UserBoardManager';
import Wishlist from '../../src/components/Wishlist';

export default function index() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [userKey, setUserKey] = useState("");
    const [orderKey, setOrderKey] = useState("");

    useEffect(() => {
        if (window.sessionStorage.getItem("uid") === null) {
            router.push("/login");
            return;
        }
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [])

    useEffect(() => {
        if (typeof router.query.id === "string") {
            setQuery(router.query.id);
        } if (typeof router.query.orderKey === "string") {
            setOrderKey(router.query.orderKey);
        }
    }, [router])

    if (userKey === "") {
        return <div></div>
    }

    return (
        <div>
            {query === "main" && <Main></Main>}
            {query === "like" && <Wishlist userKey={userKey}></Wishlist>}
            {query === "modify" && <Member userKey={userKey} />}
            {query === "order" && <OrderHistory userKey={userKey} />}
            {query === "order_detail" && <OrderDetail userKey={userKey} orderKey={orderKey} />}
            {query === "board" && <UserBoardManager userKey={userKey} />}
        </div>
    )
}
