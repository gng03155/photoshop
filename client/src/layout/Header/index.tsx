import React from 'react'

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
                    <a href="#">
                        <img src="/img/Logo.png" alt="logo" />
                    </a>
                </Logo>
                <RightCategory>
                    <ul>
                        <li><a href="#">카테고리4</a></li>
                        <li><a href="#">카테고리5</a></li>
                        <li><a href="#">카테고리6</a></li>
                        <li><a href="#">카테고리7</a></li>
                    </ul>
                </RightCategory>
            </Content>
        </div>
    )
}