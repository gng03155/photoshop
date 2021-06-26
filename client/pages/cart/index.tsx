import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import CartList from '../../src/components/CartList';

export default function Cart() {

    const router = useRouter();
    const [userKey, setUserKey] = useState("");


    useEffect(() => {
        if (window.sessionStorage.getItem("uid") === null) {
            router.push("/login");
            return;
        }
        setUserKey(window.sessionStorage.getItem("uid"));
    }, []);

    return (
        <div>
            <CartList userKey={userKey} />
        </div>
    )
}
