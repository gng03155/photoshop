import React, { useEffect, useState } from 'react';

import useSWR from "swr";

import { useRouter } from "next/router";

import ProductDetail from '../../src/components/ProductDetail';

export default function Product() {

    const router = useRouter();

    const [id, setId] = useState("");

    useEffect(() => {
        if (typeof router.query.id === "string")
            setId(router.query.id);

        console.log(router.query);
    }, [router])

    return (
        <div>
            <ProductDetail id={id}></ProductDetail>
        </div>
    )
}
