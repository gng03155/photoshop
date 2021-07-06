import React, { useCallback, useEffect, useState } from 'react'
import { Page } from "./styles"
interface Props {
    onSetPage: (num) => void
    pageNumber: number,
    curNumber: number,
}
export default function PageNation({ onSetPage, pageNumber, curNumber }: Props) {
    const [pageList, setPageList] = useState<string[][]>([[null]]);


    const [curPage, setCurPage] = useState(curNumber);

    useEffect(() => {
        setCurPage(curNumber);
    }, [curNumber])

    const onClickPage = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        onSetPage(idx);
        setCurPage(idx);
        window.scrollTo(0, 0);
    }, [])

    const onClickFirst = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === 0) {
            return;
        }
        onSetPage(0);
        setCurPage(0);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

    const onClickPrev = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === 0) {
            return;
        }
        onSetPage(curPage - 1);
        setCurPage(curPage - 1);
        window.scrollTo(0, 0);
    }, [curPage, pageList])

    const onClickNext = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === pageNumber - 1) {
            return;
        }
        onSetPage(curPage + 1);
        setCurPage(curPage + 1);
        window.scrollTo(0, 0);
    }, [curPage, pageNumber])

    const onClickLast = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (curPage === pageNumber - 1) {
            return;
        }
        window.scrollTo(0, 0);
        onSetPage(pageNumber - 1);
        setCurPage(pageNumber - 1);

    }, [curPage, pageNumber])

    if (pageNumber === 0) {
        return <div></div>
    }

    return (
        <div>
            <Page>
                <ul>
                    <li><a onClick={onClickFirst}><img src="/img/btn_page_first.gif" alt="#" /></a></li>
                    <li><a onClick={onClickPrev}><img src="/img/btn_page_prev.gif" alt="#" /></a></li>
                    {Array(pageNumber).fill(0).map((item, idx) => {
                        return (
                            <li key={idx} className="page_number">
                                <a id={`${idx}`}
                                    onClick={onClickPage}
                                    className={curPage === idx ? "active" : ""}
                                >
                                    {idx + 1}
                                </a>
                            </li>)
                    })}
                    <li><a onClick={onClickNext}><img src="/img/btn_page_next.gif" alt="#" /></a></li>
                    <li><a onClick={onClickLast}><img src="/img/btn_page_last.gif" alt="#" /></a></li>
                </ul>
            </Page>
        </div>
    )
}
