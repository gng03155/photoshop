import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProductList from '../../../src/components/ProductList'
import { fetcherData } from '../../../src/util/fetcher';
import { InputWrap, Ment, Wrap } from '../../../page_style/category/search/styles';

export default function Search() {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const [proIdList, setProIdList] = useState<string[]>([null]);

    const [keyword, setKeyword] = useState("");

    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        console.log("시작");

        return () => {
            console.log("종료");
        }
    }, []);

    useEffect(() => {
        console.log("router");
        const word = router.query.keyword;

        if (typeof word === "string") {
            setKeyword(word);
        }

    }, [router])

    useEffect(() => {

        if (productList !== undefined && keyword !== "") {
            setIdList(keyword);
        }
    }, [productList, keyword])

    const setIdList = (word) => {
        let idList = [];
        for (let item in productList) {
            const name: string = productList[item]["name"];
            const contained = name.indexOf(word);
            if (contained !== -1) {
                idList.push(item);
            }
        }
        setProIdList(idList);
        // setProIdList(value => {
        //     let copy = value;
        //     copy = idList;
        //     return copy;
        // });
    }

    const onClickSearch = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const value = inputRef.current.value;
        if (value === "") {
            alert("검색어를 입력해주세요.");
            return;
        }
        setKeyword(value);
        setIdList(value);
    }

    if (proIdList[0] === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>상품 검색</h2>
            <InputWrap>
                <input ref={inputRef} type="text" />
                <a onClick={onClickSearch}>검색</a>
            </InputWrap>
            <p>총 ({proIdList.length})개 상품이 검색되었습니다.</p>
            {proIdList.length !== 0 ? <ProductList proIdList={proIdList} isSearch={true} /> : <Ment><p>정확한 검색어 인지 확인하시고 다시 검색해 주세요.</p></Ment>}
        </Wrap>
    )
}
