import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"

import { Title, Progress } from "../../../page_style/member/signup/styles"

import Agreement from '../../../src/components/Signup/agreement'
import Join from '../../../src/components/Signup/join'
import Complete from '../../../src/components/Signup/complete'


export default function signup() {

    const router = useRouter();
    const [query, setQuery] = useState("");
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        if (window.sessionStorage.getItem("uid") !== null) {
            router.push("/");
            return;
        }
    }, [])

    useEffect(() => {

        const name = router.query.name;
        if (name === undefined) {
            router.push("/member/signup?name=agree", "/signup");
            return;
        }
        if (typeof name === "string") {
            if (name === "complete") {
                if (typeof router.query.data === "string")
                    setUserData(JSON.parse(router.query.data));
            }
            setQuery(name);
        }

    }, [router])

    if (query === "") {
        return <div></div>
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
            {query === "complete" && <Complete userData={userData} />}
        </div>
    )
}