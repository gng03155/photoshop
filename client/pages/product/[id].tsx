import React, { useEffect, useState } from 'react';

import useSWR from "swr";

import { useRouter } from "next/router";

import ProductDetail from '../../src/components/ProductDetail';

export default function Product() {

    const router = useRouter();

    const [id, setId] = useState(0);

    useEffect(() => {
        // setId(Number(router.query.id));
    }, [])

    return (
        <div>
            <ProductDetail></ProductDetail>
        </div>
    )
}
