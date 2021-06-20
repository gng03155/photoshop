import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Board from '../../../../src/components/Board'

export default function Index() {
    const router = useRouter();

    const [boardKey, setBoardKey] = useState("");

    useEffect(() => {
        if (typeof router.query.key === "string") {
            console.log(router.query);
            setBoardKey(router.query.key);
        }
    }, [router])

    if (boardKey === "") {
        return <div></div>
    }

    return (
        <div>
            <Board boardKey={boardKey} />
        </div>
    )
}
