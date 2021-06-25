import React, { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

import { Content, Logo, BoardCategory, MainMenu } from "./styles"
import fb from '../../firebase'
import useSWR from 'swr'
import localFetcher from '../../util/localFetcher'



export default function Header() {

    const [userKey, setUserKey] = useState("");
    const ref = useRef(null);
    const divRef = useRef(null);
    const router = useRouter();

    const { data: load, mutate } = useSWR("load", localFetcher);

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

    const onClickBoard = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const id = tg.dataset.id;
        router.push(`/board/${id}`, undefined, { shallow: true });
    }

    const test = async () => {
        mutate(!load, false);
        // for (let i = 1; i <= 8; i++) {
        //     let storage1 = fb.storage().ref(`products/A00${i}/imgs/detail/test`);
        //     let storage2 = fb.storage().ref(`products/A00${i}/imgs/thumb/test`);
        //     await storage1.put(null);
        //     await storage2.put(null);
        // }
        // console.log("폴더생성완료!")

        // let stoRef = fb.database().ref(`cart/user_id3`);
        // let val = await stoRef.get().then((value) => {
        //     return value.val();
        // })
        // const aa = stoRef.push("test").toString();
        // console.log(aa.split("user_id3/")[1]);
        // .set({
        //     name: "name",
        //     test: "test",
        //     hoho: "hoho",
        // });

        // console.log(Object.keys(val).length);
        // let dataRef = fb.database().ref(`cart/user_id2/02`);
        // dataRef.set({
        //     name: "name",
        //     test: "test",
        //     num: "num",
        // })

    }

    return (
        <div ref={divRef} style={{ width: "100%", height: "100px" }}>
            <button style={{ position: "relative", zIndex: 1000 }} onClick={test}>test</button>
            <Content ref={ref}>
                <MainMenu>
                    <ul>
                        <li><Link href="/article/free?id=free&key=-McV-rHrRab1MvqYdjGL">test</Link></li>
                        <li><Link href="/product/1"><a>PRODUCT</a></Link></li>
                        <li className="board">
                            <Link href="/board/free"><a>BOARD</a></Link>
                            <BoardCategory>
                                <ul>
                                    <li><a onClick={onClickBoard} data-id="notice" href="#">notice</a></li>
                                    <li><a onClick={onClickBoard} data-id="review" href="#">review</a></li>
                                    <li><a onClick={onClickBoard} data-id="qna" href="#">q&a</a></li>
                                    <li><a onClick={onClickBoard} data-id="free" href="#">free</a></li>
                                </ul>
                            </BoardCategory>
                        </li>
                    </ul>
                </MainMenu>
                <Logo>
                    <Link href="/">
                        <a><img src="/img/Logo.png" alt="logo" /></a>
                    </Link>
                </Logo>
                <MainMenu>
                    <ul>
                        {
                            userKey === null ?
                                <li><Link href="/login"><a>LOGIN</a></Link></li>
                                :
                                <li><Link href="/"><a onClick={onLogout}>LOGOUT</a></Link></li>
                        }
                        {
                            userKey === null ?
                                <li><Link as="/signup" href="/signup?name=agree"><a>JOIN US</a></Link></li>
                                :
                                <li><Link href="/mypage/main"><a>MY PAGE</a></Link></li>
                        }
                        <li><Link href="/cart" ><a>CART</a></Link></li>
                        <li><Link href="/category"><a>CATEGORY</a></Link></li>
                    </ul>
                </MainMenu>
            </Content>
        </div>
    )
}