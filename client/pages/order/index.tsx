import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import OrderPage from '../../src/components/OrderComponenets/OrderPage';

export default function Order({ id }) {


    const [userKey, setUserKey] = useState("");
    const [cartData, setCartData] = useState<any>(null);
    const router = useRouter();


    useEffect(() => {

        setUserKey(window.sessionStorage.getItem("uid"));

        if (typeof router.query.data === "string") {
            const data = JSON.parse(router.query.data);
            setCartData(data);
        }

    }, [router])

    if (userKey === "" || cartData === null) {
        return <div></div>
    }

    return (
        <div>
            <OrderPage userKey={userKey} cartData={cartData} />
        </div>
    )
}