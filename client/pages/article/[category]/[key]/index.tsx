import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Comment from '../../../../src/components/Comment';
import BoardTable from '../../../../src/components/BoardTable';
import ProductItem2 from '../../../../src/components/ProductItem2';
import { Title } from './styles';



export default function Index() {



    const router = useRouter();
    const [userKey, setUsetKey] = useState("");
    const [boardKey, setBoardKey] = useState("");
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");

    useEffect(() => {
        setUsetKey(window.sessionStorage.getItem("uid"));
    }, [])
    useEffect(() => {

        if (typeof router.query.key === "string") {
            setBoardKey(router.query.key)
        } if (typeof router.query.category === "string") {
            setCategory(router.query.category);
        } if (typeof router.query.product === "string") {
            setProductId(router.query.product);
        }


    }, [router])

    if (userKey === "" || boardKey === "" || category === "") {
        return <div></div>
    }

    return (
        <div>
            <Title>
                {category === "notice" && <h2>공지사항</h2>}
                {category === "free" && <h2>자유게시판</h2>}
                {category === "review" && <h2>상품후기</h2>}
                {category === "qna" && <h2>Q&A</h2>}
            </Title>
            {category === ("review" || "qna") && <ProductItem2 productId={productId} />}
            <BoardTable userKey={userKey} boardKey={boardKey}></BoardTable>
            <Comment boardKey={boardKey} />
        </div>
    )
}
