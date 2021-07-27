import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Board from '../../../../src/components/BoardComponents/BoardWrite'


export default function Write() {
    const router = useRouter();
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
        if (typeof router.query.product === "string") {
            setProductId(router.query.product);
        }
    }, [router])
    if (category === "") {
        return <div></div>
    } else {
        if (category !== "free" && category !== "qna" && category !== "review" && category !== "notice" && userKey !== "") {
            return <div></div>
        }
    }
    return (
        <div>
            <Board category={category} productId={productId} userKey={userKey} />
        </div>
    )
}
