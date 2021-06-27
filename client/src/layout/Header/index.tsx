import React, { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

import { Content, Logo, BoardCategory, MainMenu, SearchWrap, SearchInput } from "./styles"
import fb from '../../firebase'
import useSWR from 'swr'
import localFetcher from '../../util/localFetcher'



export default function Header() {




    const { data: load, mutate } = useSWR("load", localFetcher);

    const router = useRouter();

    const ref = useRef(null);
    const divRef = useRef(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [keyword, setKeyword] = useState("");
    const [userKey, setUserKey] = useState("");


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
            ref.current.style.height = "80px";
            ref.current.style.width = tt + "px";
        } else {
            ref.current.style.position = "relative";
            ref.current.style.width = "100%";
            ref.current.style.height = "100px";

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
        router.push(`/board/${id}`);
    }

    const onClickSearch = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const isActive = searchRef.current.classList.contains("active");
        console.log(isActive);
        if (!isActive) {
            searchRef.current.classList.add("active");
            searchRef.current.style.display = "block";
        } else {
            searchRef.current.classList.remove("active");
            searchRef.current.style.display = "none";
            setKeyword("");
        }
    }

    const moveSearch = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchRef.current.classList.remove("active");
        searchRef.current.style.display = "none";
        const pathName = router.pathname;
        setKeyword("");
        if (pathName !== "/category/search") {
            router.push({
                pathname: "/category/search",
                query: {
                    keyword,
                },
            });
        } else {
            console.log("같은페이지");
            router.push({
                pathname: "/category/search",
                query: {
                    keyword,
                },
            }, "/category/search", { shallow: true });
        }
    }

    const test = async () => {

        router.push("/signup?name=agree", "/signup");
        return;

        // mutate(!load, false);
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
            {/* <button style={{ position: "relative", zIndex: 1000 }} onClick={test}>test</button> */}
            <Content ref={ref}>
                <MainMenu>
                    <ul>
                        <li><Link href="/article/free?id=free&key=-McV-rHrRab1MvqYdjGL">test</Link></li>
                        <li><Link href="/category"><a>PRODUCT</a></Link></li>
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
                                <li>
                                    <Link href="/signup?name=agree" as="signup">
                                        <a>JOIN US</a>
                                    </Link>
                                </li>
                                :
                                <li><Link href="/mypage/main"><a>MY PAGE</a></Link></li>
                        }
                        <li><Link href="/cart" ><a>CART</a></Link></li>
                        <li className="search">
                            <a onClick={onClickSearch}>SEARCH</a>
                        </li>
                    </ul>
                </MainMenu>
                <SearchWrap ref={searchRef}>
                    <div>
                        <span>X</span>
                        <SearchInput>
                            <form onSubmit={moveSearch}>
                                <input type="text" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} placeholder="검색어를 입력해주세요." /><a onClick={moveSearch}></a>
                            </form>
                        </SearchInput>
                    </div>
                </SearchWrap>
            </Content>
        </div>
    )
}