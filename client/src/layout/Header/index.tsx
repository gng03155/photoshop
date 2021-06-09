import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from 'swr'

import { Content, LeftCategory, RightCategory, Logo } from "./styles"

import localFetcher from '../../util/localFetcher'




export default function Header() {

    const [userKey, setUserKey] = useState("");

    const router = useRouter();

    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [])
    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [router])

    const onLogout = (e: any) => {
        window.sessionStorage.removeItem("uid");
        setUserKey(null);
    }

    return (
        <div style={{ backgroundColor: "rgba(0, 0, 255, 0.1)" }}>
            <Content>
                <LeftCategory>
                    <ul>
                        <li><a href="#">카테고리1</a></li>
                        <li><a href="#">카테고리2</a></li>
                        <li><a href="#">카테고리3</a></li>
                    </ul>
                </LeftCategory>
                <Logo>
                    <Link href="/">
                        <a><img src="/img/Logo.png" alt="logo" /></a>
                    </Link>
                </Logo>
                <RightCategory>
                    <ul>
                        {
                            userKey === null ?
                                <li><Link href="/login"><a>LOGIN</a></Link></li>
                                :
                                <li><Link href="/"><a onClick={onLogout}>LOGOUT</a></Link></li>
                        }
                        {
                            userKey === null ?
                                <li><Link href="/signup/agree"><a>JOIN US</a></Link></li>
                                :
                                <li><Link href="/mypage"><a>MY PAGE</a></Link></li>
                        }
                        <li><Link href="/signup/join"><a>JOIN US2</a></Link></li>
                        <li><Link href="/mypage"><a>JOIN US3</a></Link></li>
                    </ul>
                </RightCategory>
            </Content>
        </div>
    )
}