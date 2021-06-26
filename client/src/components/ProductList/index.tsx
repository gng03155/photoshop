import React, { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr';
import { fetcherData } from '../../util/fetcher';
import PageNation from '../PageNation';
import ProductItem from '../ProductItem';

import { Wrap, ListMenu, ListWrap, List, Filter, CategoryWrap, ColorWrap, Option, FilterButton, Color } from "./styles"


interface Props {
    proIdList: string[],
}


export default function ProductList({ proIdList }: Props) {

    const { data: productList } = useSWR(`/products/product`, fetcherData, { revalidateOnMount: true });

    const { data: categoryList } = useSWR(`/products/category`, fetcherData, { revalidateOnMount: true });

    const { data: reviewList } = useSWR(`/products/review`, fetcherData, { revalidateOnMount: true });

    const [data, setData] = useState<string[][]>([[null]]);

    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);
    const [curIdList, setCurIdList] = useState([]);


    const [selectColor, setSelectColor] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);

    useEffect(() => {

        for (let i = 0; i < 20; i++) {
            proIdList.push(`A008`);
        }

        setPage(proIdList);

    }, []);

    useEffect(() => {

    }, [productList, categoryList])

    const setPage = (idList) => {
        const num = idList.length;
        if (num === 0) {
            setCurPage(0)
            setPageNumber(0);
            setData([[]]);
            setCurIdList([]);
            return;
        }
        let totalIdx = Math.floor(num / 8);
        // totalIdx = totalIdx !== 0 ? totalIdx : 1;
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
        if (num % 8 === 0) {
            copy.splice(-1, 1);
        }
        copy.splice(0, 1);
        setPageNumber(copy.length);
        setCurIdList(idList);
        setCurPage(0);
        setData(copy);
    }

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

    const setCategory = (selectCategory?, isAll = false) => {

        let cateList = [];
        if (isAll) {
            cateList = Object.keys(productList);
        } else {
            for (let name of selectCategory) {
                if (categoryList[name])
                    cateList.push(categoryList[name]);
            }
            cateList = cateList.flat(2);
        }

        setPage(cateList);


    }

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

    const setColor = (selectColor?, isAll = false) => {
        let idList = [];
        let cateList = [];

        //전체카테고리
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
                    //컬러체크
                    for (let color of selectColor) {
                        if (productList[name]["color"].includes(color)) {
                            idList.push(name);
                            break;
                        }
                    }

                }
            }
        }

        setPage(idList);

    }

    const onClickAllCategory = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        const tg = e.target as HTMLAnchorElement;
        const children = Array.from(tg.parentElement.children);
        children.forEach((node) => {
            if (node.tagName === "INPUT") {
                const elem = node as HTMLInputElement;
                elem.checked = false;
            }
        })
        setCurIdList(Object.keys(productList));
        setSelectCategory([]);
        setCategory([], true);
    }

    const onClickAllColor = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const tg = e.target as HTMLAnchorElement;
        const children = Array.from(tg.parentElement.children);
        children.forEach((node) => {
            if (node.tagName === "A") {
                const elem = node as HTMLAnchorElement;
                elem.classList.remove("active");
            }
        })
        setSelectColor([]);
        setColor([], true);
    }

    const onClickPriceSort = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;

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

    }

    const onClickNameeSort = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;

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

    }

    const onClickRevieweSort = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;

        let rList = [];
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

    }
    const onSetPage = (num) => {
        setCurPage(num);
    }

    if (proIdList.length === 0) {
        return <div></div>
    }

    return (
        <Wrap>
            <Filter>
                <h3>필터</h3>
                <Option>
                    <p>카테고리</p>
                    <CategoryWrap>
                        <a className="all" onClick={onClickAllCategory}>전체</a>
                        <label htmlFor="wall">wall</label>
                        <input id="wall" type="checkbox" onChange={onChangeCategory} />
                        <label htmlFor="pixel">pixel</label>
                        <input id="pixel" type="checkbox" onChange={onChangeCategory} />
                        <label htmlFor="animal">animal</label>
                        <input id="animal" type="checkbox" onChange={onChangeCategory} />
                        <label htmlFor="natural">natural</label>
                        <input id="natural" type="checkbox" onChange={onChangeCategory} />
                    </CategoryWrap>
                </Option>
                <Option>
                    <p>컬러</p>
                    <ColorWrap>
                        <Color className="all" onClick={onClickAllColor}>전체</Color>
                        <Color data-color="red" color="red" onClick={onClickColor}></Color>
                        <Color data-color="orange" color="orange" onClick={onClickColor}></Color>
                        <Color data-color="yellow" color="yellow" onClick={onClickColor}></Color>
                        <Color data-color="blue" color="blue" onClick={onClickColor}></Color>
                        <Color data-color="navy" color="navy" onClick={onClickColor}></Color>
                        <Color data-color="purple" color="purple" onClick={onClickColor}></Color>
                        <Color data-color="green" color="green" onClick={onClickColor}></Color>
                    </ColorWrap>
                </Option>
                {/* <FilterButton>
                    <button>선택 초기화</button>
                    <button>적용</button>
                </FilterButton> */}
            </Filter>
            <ListMenu>
                <p>총<span>{curIdList.length}</span>개의 상품이 있습니다.</p>
                <ul>
                    <li><a onClick={onClickNameeSort}>상품명</a></li>
                    <li><a data-type="high" onClick={onClickPriceSort}>높은 가격순</a></li>
                    <li><a data-type="low" onClick={onClickPriceSort}>낮은 가격순</a></li>
                    <li><a onClick={onClickRevieweSort}>상품리뷰순</a></li>
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
