import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Member from '../../src/components/MemberComponents/Member';
import MileageHistory from '../../src/components/MypageComponents/MileageHistory';
import Main from '../../src/components/MypageComponents/main'
import OrderDetail from '../../src/components/OrderComponenets/OrderDetail';
import OrderHistory from '../../src/components/OrderComponenets/OrderHistory';
import UserBoardManager from '../../src/components/MypageComponents/UserBoardManager';
import Wishlist from '../../src/components/MypageComponents/Wishlist';

export default function index() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [userKey, setUserKey] = useState("");
    const [orderKey, setOrderKey] = useState("");

    const [init, setInit] = useState(false);

    useEffect(() => {
        if (window.sessionStorage.getItem("uid") === null) {
            router.push("/member/login");
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
        setInit(true);
    }, [router])

    if (userKey === "" || query === "" || init === false) {
        return <div></div>
    }

    return (
        <div>
            {query === "main" && <Main userKey={userKey}></Main>}
            {query === "like" && <Wishlist userKey={userKey}></Wishlist>}
            {query === "modify" && <Member userKey={userKey} />}
            {query === "order" && <OrderHistory userKey={userKey} />}
            {query === "order_detail" && orderKey !== "" && <OrderDetail userKey={userKey} orderKey={orderKey} />}
            {query === "board" && <UserBoardManager userKey={userKey} />}
            {query === "mileage" && <MileageHistory userKey={userKey} />}
        </div>
    )
}
