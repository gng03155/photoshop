import React, { useEffect, useState, useCallback, useRef } from 'react'
import useSWR from 'swr';
import { IProduct } from '../../../types';
import { fetcherData } from '../../../util/fetcher';
import PageNation from '../../PageNation';
import ProductItem from '../ProductItem';

import { Wrap, ListMenu, ListWrap, List, Filter, CategoryWrap, ColorWrap, Option, FilterButton, Color } from "./styles"


interface Props {
    proIdList: string[],
    isSearch?: boolean,
}


export default function ProductList({ proIdList, isSearch }: Props) {

    const { data: productList } = useSWR<{ [key: string]: IProduct } | undefined>(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR<{ [key: string]: string[] | undefined }>(`/products/category`, fetcherData, { revalidateOnMount: true });

    const { data: reviewList } = useSWR<{ [key: string]: string[] } | undefined>(`/products/review`, fetcherData, { revalidateOnMount: true });


    const cateRef = new Array(6).fill(0).map(() => useRef<HTMLInputElement>());
    const colorRef = new Array(13).fill(0).map(() => useRef<HTMLAnchorElement>());

    const [data, setData] = useState<string[][]>([[null]]);

    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);
    const [curIdList, setCurIdList] = useState([]);


    const [selectColor, setSelectColor] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);

    useEffect(() => {
        console.log(categoryList);
    }, [categoryList])

    useEffect(() => {
        setPage(proIdList);
    }, [proIdList])

    const setPage = useCallback((idList) => {
        const num = idList.length;
        if (num === 0) {
            setCurPage(0)
            setPageNumber(0);
            setData([[]]);
            setCurIdList([]);
            return;
        }
        let totalIdx = Math.floor(num / 8);
        const copy = [[]];
        for (let i = 0; i <= totalIdx; i++) {
            let list: string[] = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= idList.length) {
                    break;
                }
                list.push(idList[j])
            }
            copy.push(list);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setCurIdList(idList);
        setCurPage(0);
        setData(copy);
    }, [])

    const onChangeCategory = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        const id = tg.id;
        if (tg.checked) {
            const copy = [...selectCategory];
            copy.push(id);
            setCategory(copy, false);
            setSelectCategory(copy);
        } else {
            const copy = [...selectCategory];
            const idx = copy.indexOf(id);
            copy.splice(idx, 1);
            const isAll = copy.length === 0 ? true : false;
            setCategory(copy, isAll);
            setSelectCategory(copy)
        }
    }

    const setCategory = useCallback((selCategory, isAll = false) => {

        let cateList = [];
        if (isAll) {
            cateList = Object.keys(productList);
        } else {
            for (let name of selCategory) {
                if (categoryList[name])
                    cateList.push(categoryList[name]);
            }
            cateList = cateList.flat(2);
        }

        setPage(cateList);


    }, [productList, categoryList, setPage])

    const onClickColor = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const bg = tg.dataset.color;
        const checked = selectColor.includes(bg);

        if (!checked) {
            const copy = [...selectColor];
            copy.push(bg);
            tg.classList.add("active");
            setColor(copy, false);
            setSelectColor(copy)
        } else {
            const copy = [...selectColor];
            const idx = copy.indexOf(bg);
            copy.splice(idx, 1);
            const isAll = copy.length === 0 ? true : false;
            tg.classList.remove("active");
            setColor(copy, isAll);
            setSelectColor(copy)
        }
    }

    const setColor = useCallback((selectColor?, isAll = false) => {
        let idList = [];
        let cateList = [];

        //??????????????????
        if (selectCategory.length === 0) {
            cateList = Object.keys(productList);
        }
        else {
            for (let name of selectCategory) {
                if (categoryList[name])
                    cateList.push(categoryList[name]);
            }
            cateList = cateList.flat(2);
        }


        if (isAll) {
            idList = cateList;
        } else {
            for (let name in productList) {
                if (cateList.includes(name)) {
                    //????????????
                    for (let color of selectColor) {
                        const isColor = productList[name]["color"].some((value) => value === color);
                        if (isColor) {
                            idList.push(name);
                            break;
                        }
                    }

                }
            }
        }

        setPage(idList);

    }, [selectCategory, productList, categoryList, setPage])

    const onClickAllCategory = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        cateRef.forEach((node) => {
            node.current.checked = false;
        })
        setCurIdList(Object.keys(productList));
        setSelectCategory([]);
        setCategory([], true);
    }, [cateRef, productList, setCategory])

    const onClickAllColor = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        colorRef.forEach((node) => {
            node.current.classList.remove("active");
        })
        setSelectColor([]);
        setColor([], true);
    }, [colorRef, setColor])

    const onClickPriceSort = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;
        const collection = tg.parentElement.parentElement.children;

        Array.from(collection).forEach((elem) => {
            if (elem.tagName === "LI") {
                elem.firstElementChild.classList.remove("active");
            }
        })

        tg.classList.add("active");

        const type = tg.dataset.type;


        let priceList = [];
        for (let name of curIdList) {
            const temp = {
                id: name,
                price: productList[name]["price"],
            }
            priceList.push(temp);
        }
        let result = [];
        let sortList = [];
        if (type === "low") {
            sortList = priceList.sort((a, b) => a.price - b.price);
        } else if (type === "high") {
            sortList = priceList.sort((a, b) => b.price - a.price);
        }
        result = sortList.map((list) => list.id);
        setPage(result);

    }, [curIdList, productList, setPage])

    const onClickNameeSort = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;
        const collection = tg.parentElement.parentElement.children;

        Array.from(collection).forEach((elem) => {
            if (elem.tagName === "LI") {
                elem.firstElementChild.classList.remove("active");
            }
        })

        tg.classList.add("active");

        let nameList = [];
        for (let name of curIdList) {
            const temp = {
                id: name,
                name: productList[name]["name"],
            }
            nameList.push(temp);
        }
        let result = [];
        let sortList = [];
        sortList = nameList.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
        result = sortList.map((list) => list.id);
        setPage(result);

    }, [curIdList, productList, setPage])

    const onClickRevieweSort = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;
        const collection = tg.parentElement.parentElement.children;

        Array.from(collection).forEach((elem) => {
            if (elem.tagName === "LI") {
                elem.firstElementChild.classList.remove("active");
            }
        })

        tg.classList.add("active");

        let rList = [];
        if (reviewList === undefined) {
            setCurPage(0);
            return;
        }
        for (let name of curIdList) {
            const temp = {
                id: name,
                review: reviewList[name] ? reviewList[name].length : 0,
            }
            rList.push(temp);
        }
        let result = [];
        let sortList = [];
        sortList = rList.sort((a, b) => b.review - a.review);
        result = sortList.map((list) => list.id);
        setPage(result);

    }, [reviewList, curIdList, setPage])

    const onSetPage = useCallback((num) => {
        setCurPage(num);
    }, [])

    if (proIdList.length === 0) {
        return <div></div>
    }

    return (
        <Wrap>
            {!isSearch && <Filter>
                <h3>??????</h3>
                <Option>
                    <p>????????????</p>
                    <CategoryWrap>
                        <ul>
                            <li><a className="all" onClick={onClickAllCategory}>ALL</a></li>
                            <li><label htmlFor="michelangelo">michelangelo</label>
                                <input ref={cateRef[0]} id="michelangelo" type="checkbox" onChange={onChangeCategory} /></li>
                            <li><label htmlFor="vangoah">vangoah</label>
                                <input ref={cateRef[1]} id="vangoah" type="checkbox" onChange={onChangeCategory} /></li>
                            <li><label htmlFor="picasso">picasso</label>
                                <input ref={cateRef[2]} id="picasso" type="checkbox" onChange={onChangeCategory} /></li>
                            <li><label htmlFor="magritte">magritte</label>
                                <input ref={cateRef[3]} id="magritte" type="checkbox" onChange={onChangeCategory} /></li>
                            <li><label htmlFor="rembrandt">rembrandt</label>
                                <input ref={cateRef[4]} id="rembrandt" type="checkbox" onChange={onChangeCategory} /></li>
                            <li><label htmlFor="markrothko">markrothko</label>
                                <input ref={cateRef[5]} id="markrothko" type="checkbox" onChange={onChangeCategory} /></li>
                        </ul>
                    </CategoryWrap>
                </Option>
                <Option>
                    <p>??????</p>
                    <ColorWrap>
                        <ul>
                            <li><a ref={colorRef[0]} className="all" onClick={onClickAllColor}>ALL</a></li>
                            <li><Color ref={colorRef[1]} data-color="white" color="#fafafa" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[2]} data-color="black" color="#666666" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[3]} data-color="gray" color="#949494" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[4]} data-color="red" color="#e06060" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[5]} data-color="blue" color="#6FC2D9" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[6]} data-color="yellow" color="#FFE678" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[7]} data-color="pink" color="#ed83b2" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[8]} data-color="green" color="#A0DEA1" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[9]} data-color="brown" color="#edc183" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[10]} data-color="ivory" color="#F7EDB7" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[11]} data-color="silver" color="#DFE0ED" onClick={onClickColor}></Color></li>
                            <li><Color ref={colorRef[12]} data-color="gold" color="#D4AF37" onClick={onClickColor}></Color></li>
                        </ul>

                    </ColorWrap>
                </Option>
            </Filter>}
            <ListMenu>
                {!isSearch ? <p>???<span>{curIdList.length}</span>?????? ????????? ????????????.</p> : <p></p>}
                <ul>
                    <li><a onClick={onClickNameeSort}>?????????</a></li>
                    <li><a data-type="high" onClick={onClickPriceSort}>?????? ?????????</a></li>
                    <li><a data-type="low" onClick={onClickPriceSort}>?????? ?????????</a></li>
                    <li><a onClick={onClickRevieweSort}>???????????????</a></li>
                </ul>
            </ListMenu>
            <ListWrap>
                <List>
                    <ul>
                        {data[0].length !== 0 && data[curPage].map((item, idx) => {
                            return <li key={idx}><ProductItem id={item}></ProductItem></li>
                        })}
                    </ul>
                </List>
                <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={curPage} />
            </ListWrap>
        </Wrap>
    )
}
