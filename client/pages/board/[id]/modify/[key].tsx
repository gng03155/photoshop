import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Board from '../../../../src/components/Board'

export default function Index() {
    const router = useRouter();

    const [boardKey, setBoardKey] = useState("");
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");


    useEffect(() => {
        if (typeof router.query.id === 'string') {
            setCategory(router.query.id);
        }
        if (typeof router.query.key === "string") {
            setBoardKey(router.query.key);
        }
        if (typeof router.query.product === "string") {
            setProductId(router.query.product);
        }
    }, [router])

    if (category === "" || boardKey === "") {
        return <div></div>
    } else {
        if (category !== "free" && category !== "qna" && category !== "review") {
            return <div></div>
        }
    }

    return (
        <div>
            <Board boardKey={boardKey} category={category} productId={productId} />
        </div>
    )
}
