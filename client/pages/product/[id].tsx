import React, { useEffect, useState } from 'react';

import useSWR from "swr";

import { useRouter } from "next/router";

import ProductDetail from '../../src/components/ProductDetail';

export default function Product() {

    const router = useRouter();

    const [userKey, setUserKey] = useState(null);
    const [id, setId] = useState("");
    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, []);
    useEffect(() => {
        if (typeof router.query.id === "string")
            setId(router.query.id);
    }, [router])

    return (
        <div>
            <ProductDetail id={id} userKey={userKey}></ProductDetail>
        </div>
    )
}
