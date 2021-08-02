import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProductList from '../../../src/components/ProductComponents/ProductList'
import { fetcherData } from '../../../src/util/fetcher';
import { InputWrap, Ment, Wrap } from '../../../page_style/category/search/styles';
import { localFetcher } from '../../../src/util/localFetcher';

export default function Search() {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: load, mutate } = useSWR("load", localFetcher);

    const [proIdList, setProIdList] = useState<string[]>([null]);

    const [keyword, setKeyword] = useState("");

    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

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

    const onClickSearch = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const value = inputRef.current.value;
        if (value === "") {
            alert("검색어를 입력해주세요.");
            return;
        }

        if (spaceCheck(value)) {
            alert("공백을 지우고 다시 입력해주세요!");
            return;
        }
        mutate(true, false);
        setKeyword(value);
        setIdList(value);
        mutate(false, false);
    }, [inputRef])

    const spaceCheck = useCallback((value) => {
        const pattern = /^\s/g;
        return pattern.test(value);
    }, [])

    const setIdList = useCallback((word) => {
        let idList = [];

        word = word.toLowerCase();

        for (let item in productList) {
            const name: string = productList[item]["name"];
            const contained = name.toLowerCase().indexOf(word);
            if (contained !== -1) {
                idList.push(item);
            }
        }

        setProIdList(idList);
    }, [productList])

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
            <h3>"{keyword}" 에 대한 검색결과 입니다.</h3>
            <p>총 ({proIdList.length})개 상품이 검색되었습니다.</p>
            {proIdList.length !== 0 ? <ProductList proIdList={proIdList} isSearch={true} /> : <Ment><p>정확한 검색어 인지 확인하시고 다시 검색해 주세요.</p></Ment>}
        </Wrap>
    )
}
