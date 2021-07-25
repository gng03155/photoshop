import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Board from '../../../../src/components/BoardComponents/BoardWrite'

export default function Index() {
    const router = useRouter();

    const [boardKey, setBoardKey] = useState("");
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");
    const [userKey, setUserKey] = useState("");

    useEffect(() => {
        if (window.sessionStorage.getItem("uid") !== null) {
            setUserKey(window.sessionStorage.getItem("uid"));
        } else {
            router.push("/login");
        }
    }, [])
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
        if (category !== "free" && category !== "qna" && category !== "review" && userKey !== "") {
            return <div></div>
        }
    }

    return (
        <div>
            <Board boardKey={boardKey} category={category} productId={productId} userKey={userKey} />
        </div>
    )
}
