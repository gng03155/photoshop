import React, { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr';
import { fetcherData } from '../../util/fetcher';
import ProductItem from '../ProductItem';

import { Wrap, ListMenu, ListWrap, List, PageNation } from "./styles"


interface Props {
    proIdList: string[],
}


export default function ProductList({ proIdList }: Props) {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR(`/products/category`, fetcherData, { revalidateOnMount: true });

    const [pageList, setPageList] = useState<string[][]>([[null]]);

    const [curPage, setCurPage] = useState(0);

    useEffect(() => {

        for (let i = 0; i < 20; i++) {
            proIdList.push(`${5}`);
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
        setPageList(copy);

        // setIsSet(true);

    }, [])

    useEffect(() => {
        // console.log(productList);
        // console.log(categoryList);
    }, [productList, categoryList])

    const onClickPage = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        setCurPage(idx);
        window.scrollTo(0, 0);
    }, [])

    const onClickFirst = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === 0) {
            return;
        }
        setCurPage(0);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

    const onClickPrev = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === 0) {
            return;
        }
        setCurPage(curPage - 1);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

    const onClickNext = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log(curPage);
        if (curPage === pageList.length - 1) {
            return;
        }
        setCurPage(curPage + 1);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

    const onClickLast = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === pageList.length - 1) {
            return;
        }
        setCurPage(pageList.length - 1);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

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
                        {pageList[curPage].map((item, idx) => {
                            return <li key={idx}><ProductItem id={item}></ProductItem></li>
                        })}
                    </ul>
                </List>
                <PageNation>
                    <ul>
                        <li><a onClick={onClickFirst}><img src="img/btn_page_first.gif" alt="#" /></a></li>
                        <li><a onClick={onClickPrev}><img src="img/btn_page_prev.gif" alt="#" /></a></li>
                        {pageList.map((item, idx) => {
                            console.log(idx);
                            return (
                                <li key={idx}>
                                    <a id={`${idx}`}
                                        onClick={onClickPage}
                                        className={curPage === idx ? "active" : ""}
                                    >
                                        {idx + 1}
                                    </a>
                                </li>)
                        })}
                        <li><a onClick={onClickNext}><img src="img/btn_page_next.gif" alt="#" /></a></li>
                        <li><a onClick={onClickLast}><img src="img/btn_page_last.gif" alt="#" /></a></li>
                    </ul>
                </PageNation>
            </ListWrap>
        </Wrap>
    )
}
