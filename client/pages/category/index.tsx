import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProductList from '../../src/components/ProductComponents/ProductList'
import { fetcherData } from '../../src/util/fetcher';
import { IProduct } from '../../src/types';

export default function Category() {

    const { data: productList } = useSWR<{ [key: string]: IProduct } | undefined>(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR<{ [key: string]: string[] | undefined }>(`/products/category`, fetcherData, { revalidateOnMount: true });

    const [proIdList, setProIdList] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {

        if (productList !== undefined) {
            const list = Object.keys(productList);
            setProIdList(list);
        }
    }, [productList])


    if (proIdList.length === 0) {
        return <div></div>
    }

    return (
        <div>
            {proIdList.length !== 0 && <ProductList proIdList={proIdList}></ProductList>}
        </div>
    )
}
