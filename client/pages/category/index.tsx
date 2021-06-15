import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProductList from '../../src/components/ProductList'
import { fetcherData } from '../../src/util/fetcher';

export default function Category() {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR(`/products/category`, fetcherData, { revalidateOnMount: true });

    const [proIdList, setProIdList] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {

        if (router.query.id) {
            console.log(router);
        }

    }, [router])

    useEffect(() => {
        if (productList !== undefined) {
            const list = Object.keys(productList);
            setProIdList(list);
        }

        console.log(proIdList)

    }, [productList])

    useEffect(() => {

        console.log(proIdList)

    }, [proIdList])

    if (proIdList.length === 0) {
        return <div></div>
    }

    return (
        <div>
            <ProductList proIdList={proIdList}></ProductList>
        </div>
    )
}