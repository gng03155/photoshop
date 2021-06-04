import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"

import { Title, Progress } from "./styles"

import Agreement from '../../src/components/Signup/agreement'
import Join from '../../src/components/Signup/join'
import Complete from '../../src/components/Signup/complete'


export default function signup() {

    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        let id = "";

        if (typeof router.query.id === "string") {
            id = router.query.id;
        }

        setQuery(id);

        addClass();

    }, [router])

    const addClass = () => {

    }


    return (
        <div>
            <Title>
                <h2>회원가입</h2>
                <Progress state={query}>
                    <div>
                        <span className={query === "agree" ? 'active' : ''}>약관동의</span>
                    </div>
                    <div>
                        <span className={query === "join" ? 'active' : ''}>정보입력</span>
                    </div>
                    <div>
                        <span className={query === "complete" ? 'active' : ''}>가입완료</span>
                    </div>
                </Progress>
            </Title>
            {query === "agree" && <Agreement />}
            {query === "join" && <Join />}
            {query === "complete" && <Complete />}
        </div>
    )
}
