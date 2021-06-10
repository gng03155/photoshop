import React, { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

import { Content, LeftCategory, RightCategory, Logo } from "./styles"





export default function Header() {

    const [userKey, setUserKey] = useState("");
    const ref = useRef(null);
    const divRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
        addEventListener("scroll", scrollHeader);
        return () => { removeEventListener("scroll", scrollHeader) }
    }, []);

    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [router]);

    const scrollHeader = () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 0) {
            const tt = divRef.current.clientWidth;
            ref.current.style.position = "fixed";
            ref.current.style.width = tt + "px";
        } else {
            ref.current.style.position = "relative";
            ref.current.style.width = "100%";
        }
    }

    const onLogout = (e: any) => {
        window.sessionStorage.removeItem("uid");
        setUserKey(null);
    }

    return (
        <div ref={divRef} style={{ width: "100%" }}>
            <Content ref={ref}>
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