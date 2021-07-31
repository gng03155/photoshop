import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr';
import fb from '../../../firebase';
import { IBoard } from '../../../types';

import { fetcherData } from '../../../util/fetcher';
import PageNation from '../../PageNation'
import ReviewItem from '../../ProductComponents/ReviewItem';

import { NoBoard, Table, WriteButton, ReviewBoard, Lock, Wrap } from "./styles"

interface Props {
    boardKeyList?: string[] | undefined,
    userKey: string,
    category: string,
    boardRevalidate: any,
}

export default function BoardList({ boardKeyList, userKey, category, boardRevalidate }: Props) {

    const router = useRouter();

    const [data, setData] = useState<[IBoard[] | undefined]>([[]]);
    const [pageNumber, setPageNumber] = useState(0);
    const [curPage, setCurPage] = useState(0);


    const [isRoute, setIsRoute] = useState(false);

    const { data: allList, revalidate: allRevalidate, mutate } = useSWR<{ [key: string]: IBoard }>(`board/board_list`, fetcherData, { revalidateOnMount: true, initialData: null, compare: (a, b) => false });
    // const { data: boardKeyList, revalidate: bKeyRvdate } = useSWR(`board/category/${category}`, fetcherData, { revalidateOnMount: true, initialData: null });

    //board 타입 정의
    const boardType = {
        free: "자유",
        review: "리뷰",
        qna: "Q&A",
        notice: "공지사항",
    }
    useEffect(() => {
        router.events.on('routeChangeComplete', init);
        return () => {
            router.events.off('routeChangeComplete', init);
        }
    }, []);

    useEffect(() => {
        allRevalidate();
        boardRevalidate();
    }, [router])

    useEffect(() => {
        if (allList !== undefined && allList !== null && boardKeyList !== undefined) {
            setBoardList();
        }
        setIsRoute(true);
    }, [allList, boardKeyList])

    const init = (url) => {
        setIsRoute(false);
    }


    const setBoardList = () => {

        let listKeys = Object.keys(allList)
        let temp = [];
        for (let key of boardKeyList) {
            const num = listKeys.indexOf(key);
            if (num === -1) {
                continue;
            }
            const value = allList[listKeys[num]];
            if (temp !== null)
                temp.push(value)
        }
        if (temp.length === 0) {
            return;
        }

        temp.reverse();

        let totalIdx = Math.floor(temp.length / 8);

        const copy: [IBoard[] | undefined] = [[]];
        for (let i = 0; i <= totalIdx; i++) {
            let list = [];
            for (let j = i * 8; j < (i * 8) + 8; j++) {
                if (j >= boardKeyList.length) {
                    break;
                }
                list.push(temp[j])
            }
            copy.push(list);
        }

        copy.splice(0, 1);
        setPageNumber(copy.length);
        setData(copy);
    }

    const onSetPage = (num) => {
        setCurPage(num);
    }

    const onClickBoard = useCallback(async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const tg = e.currentTarget as HTMLAnchorElement;
        e.preventDefault();
        const type = tg.dataset.type;
        const user = tg.dataset.user;
        const key = tg.dataset.key;
        const category = tg.dataset.category;
        const productId = tg.dataset.product;
        if (type === "private") {
            if (userKey === user) {
                await onUpdateHits(key);
                if (category === ("review" || "qna")) {
                    router.push({
                        pathname: `/article/${category}/${key}`,
                        query: { product: productId },
                    });
                } else {
                    router.push({
                        pathname: `/article/${category}/${key}`
                    });
                }
            } else {
                alert("비밀글로 작성자만 볼 수 있습니다.");
                return;
            }
        } else if (type === "public") {
            await onUpdateHits(key);
            if (category === ("review" || "qna")) {

                router.push({
                    pathname: `/article/${category}/${key}`,
                    query: { product: productId },
                });
            } else {
                router.push({
                    pathname: `/article/${category}/${key}`
                });
            }
        }



    }, [userKey])

    const onUpdateHits = async (key) => {
        await fb.database().ref(`board/board_list/${key}`).once("value").then((data) => {
            if (data.exists) {
                let temp = data.val().hits;
                temp = Number(temp) + 1;
                data.ref.update({
                    hits: temp,
                })
            }
        })
    }

    const onClickWrite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (router.query.product) {
            router.push({
                pathname: `/board/${category}/write`,
                query: {
                    product: router.query.product,
                }
            });
        } else {
            router.push({
                pathname: `/board/${category}/write`
            });
        }
    }

    if (allList === null || isRoute === false) {
        return <div></div>
    }


    return (
        <Wrap>
            {category === "review" &&
                <ReviewBoard>
                    <ul>
                        {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                            return (
                                <li key={value.id}>
                                    <a data-product={value.product_info ? `${value.product_info.id}` : ""} data-category={value.category} data-key={value.id} data-type={value.type} data-user={value.user_info.key} onClick={onClickBoard}>
                                        <ReviewItem productInfo={value.product_info} boardKey={value.id} />
                                    </a>
                                </li>
                            )
                        }) :
                            <NoBoard><h3>등록된 게시글이 없습니다.</h3></NoBoard>}
                    </ul>
                </ReviewBoard>}
            {category === "user" &&
                <Table>
                    <colgroup>
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>분류</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{(8 * curPage) + idx + 1}</td>
                                    <td>{boardType[value.category]}</td>
                                    <td><a data-product={value.product_info ? `${value.product_info.id}` : ""} data-category={value.category} data-key={value.id} data-type={value.type} data-user={value.user_info.key} onClick={onClickBoard}>{value.title}</a></td>
                                    <td>{value.user_info.name}</td>
                                    <td>{value.date}</td>
                                    <td>{value.hits}</td>
                                </tr>
                            )
                        }) :
                            <tr>
                                <td colSpan={6}><NoBoard><h3>등록된 게시글이 없습니다.</h3></NoBoard></td>
                            </tr>
                        }
                    </tbody>
                </Table>}
            {(category !== "review" && category !== "user") && <Table>
                <colgroup>
                    <col style={{ width: "7%" }} />
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {pageNumber !== 0 ? data[curPage].map((value, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{(8 * curPage) + idx + 1}</td>
                                <td><a data-product={value.product_info ? `${value.product_info.id}` : ""} data-category={value.category} data-key={value.id} data-type={value.type} data-user={value.user_info.key} onClick={onClickBoard}>{value.title}</a>{value.type === "private" && <Lock />}</td>
                                <td>{value.user_info.name}</td>
                                <td>{value.date}</td>
                                <td>{value.hits}</td>
                            </tr>
                        )
                    }) :
                        <tr>
                            <td colSpan={5}><NoBoard><h3>등록된 게시글이 없습니다.</h3></NoBoard></td>
                        </tr>
                    }

                </tbody>
            </Table>}
            {(userKey !== "" && category !== "notice") && <WriteButton>
                <button onClick={onClickWrite}>글쓰기</button>
            </WriteButton>}
            <PageNation onSetPage={onSetPage} pageNumber={pageNumber} curNumber={0}></PageNation>
        </Wrap>
    )
}
