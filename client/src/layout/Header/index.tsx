import React from 'react'

import Link from "next/link"

import { Content, LeftCategory, RightCategory, Logo } from "./styles"



export default function Header() {
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
                        <li><Link href="/login"><a>LOGIN</a></Link></li>
                        <li><Link href="/signup/agree"><a>JOIN US</a></Link></li>
                        <li><Link href="/signup/join"><a>JOIN US2</a></Link></li>
                        <li><Link href="/signup/complete"><a>JOIN US3</a></Link></li>
                    </ul>
                </RightCategory>
            </Content>
        </div>
    )
}