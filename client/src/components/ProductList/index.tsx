import React, { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr';
import { fetcherData } from '../../util/fetcher';
import PageNation from '../PageNation';
import ProductItem from '../ProductItem';

import { Wrap, ListMenu, ListWrap, List } from "./styles"


interface Props {
    proIdList: string[],
}


export default function ProductList({ proIdList }: Props) {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR(`/products/category`, fetcherData, { revalidateOnMount: true });

    const [data, setData] = useState<string[][]>([[null]]);

    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);

    useEffect(() => {

        for (let i = 0; i < 20; i++) {
            proIdList.push(`A008`);
        }

        const totalIdx = parseInt(`${proIdList.length / 8}`);
        const copy = [[]];
        for (let i = 0; i < totalIdx + 1; i++) {
            let list: string[] = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= proIdList.length) {
                    break;
                }
                list.push(proIdList[j])
            }
            copy.push(list);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setData(copy);
    }, [])

    useEffect(() => {

    }, [productList, categoryList])

    const onSetPage = (num) => {
        setCurPage(num);
    }

    if (proIdList.length === 0) {
        return <div></div>
    }

    return (
        <Wrap>
            <ListMenu>
                <p>총<span>{proIdList.length}</span>개의 상품이 있습니다.</p>
                <ul>
                    <li><a>상품명</a></li>
                    <li><a>높은 가격순</a></li>
                    <li><a>낮은 가격순</a></li>
                    <li><a>블라블라</a></li>
                </ul>
            </ListMenu>
            <ListWrap>
                <List>
                    <ul>
                        {data[curPage].map((item, idx) => {
                            return <li key={idx}><ProductItem id={item}></ProductItem></li>
                        })}
                    </ul>
                </List>
                <PageNation onSetPage={onSetPage} pageNumber={pageNumber} />
            </ListWrap>
        </Wrap>
    )
}
