import React, { useEffect, useState } from 'react';

import useSWR from "swr";

import { useRouter } from "next/router";

import ProductDetail from '../../src/components/ProductComponents/ProductDetail';

export default function Product() {

    const router = useRouter();

    const [userKey, setUserKey] = useState(null);
    const [id, setId] = useState("");
    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, []);
    useEffect(() => {
        if (typeof router.query.product === "string")
            setId(router.query.product);
    }, [router])

    return (
        <div>
            <ProductDetail id={id} userKey={userKey}></ProductDetail>
        </div>
    )
}
