import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Board from '../../../../src/components/Board'


export default function Write() {
    const router = useRouter();
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");
    useEffect(() => {
        console.log(router);
        if (typeof router.query.id === 'string') {
            setCategory(router.query.id);
        }
        if (typeof router.query.product === "string") {
            setProductId(router.query.product);
        }
    }, [router])
    if (category === "") {
        return <div></div>
    } else {
        if (category !== "free" && category !== "qna" && category !== "review") {
            return <div></div>
        }
    }
    return (
        <div>
            <Board category={category} productId={productId} />
        </div>
    )
}
