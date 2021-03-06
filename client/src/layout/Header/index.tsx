import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"
import { useMediaQuery } from 'react-responsive'

import { Content, Logo, BoardCategory, MainMenu, SearchWrap, SearchInput, SideMenu, Inner, SubMenuWrap, MenuIcon, BG, SideClose, Wrap } from "./styles"

export default function Header() {

    const router = useRouter();

    const ref = useRef(null);
    const divRef = useRef(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    const [keyword, setKeyword] = useState("");
    const [userKey, setUserKey] = useState("");

    let isTablet = false;

    const isMobile = useMediaQuery({ maxWidth: 480 });

    if (typeof window !== "undefined") {
        isTablet = useMediaQuery({ minWidth: 768 });
    }


    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
        addEventListener("scroll", scrollHeader);
        addEventListener("resize", onResize);
        return () => {
            removeEventListener("scroll", scrollHeader);
            removeEventListener("resize", onResize);
        }
    }, []);

    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [router]);

    const onResize = (e) => {
        const width = divRef.current.clientWidth;
        ref.current.style.width = width + "px";
    }

    const scrollHeader = useCallback(() => {
        const ofWidth = document.body.offsetWidth;
        let cWidth = divRef.current.clientWidth + "px";

        let scrollTop = 0;
        scrollTop = document.documentElement.scrollTop;


        if (ofWidth <= 1260) {
            cWidth = (ofWidth - 40) + "px";
        }

        if (scrollTop > 0) {
            ref.current.style.position = "fixed";
            ref.current.style.top = "0px";
            ref.current.style.width = cWidth;
            ref.current.style.height = "80px";
        } else {
            ref.current.style.position = "relative";
            ref.current.style.width = "100%";
            ref.current.style.height = "100px";

        }
    }, [divRef, ref])

    const onLogout = useCallback((e: any) => {
        window.sessionStorage.removeItem("uid");
        setUserKey(null);
        router.reload();
    }, [router])

    const onClickBoard = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const id = tg.dataset.id;
        router.push(`/board/${id}`);
    }, [router])

    const onClickSearch = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const isActive = searchRef.current.classList.contains("active");
        if (!isActive) {
            searchRef.current.classList.add("active");
            searchRef.current.style.height = "200px";
        } else {
            searchRef.current.classList.remove("active");
            searchRef.current.style.height = "0px";
            setKeyword("");
        }
    }, [searchRef])

    const moveSearch = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword === "") {
            alert("검색어를 입력해주세요");
            return;
        }
        searchRef.current.classList.remove("active");
        searchRef.current.style.height = "0px";

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
            router.push({
                pathname: "/category/search",
                query: {
                    keyword,
                },
            }, "/category/search", { shallow: true });
        }
    }, [keyword, searchRef, router])

    const onClickCancelSearch = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        searchRef.current.classList.remove("active");
        searchRef.current.style.height = "0px";
        setKeyword("");
    }, [searchRef])

    const onClickToggle = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toggleRef.current.style.visibility = "visible";
        toggleRef.current.style.opacity = "1";
    }, [toggleRef])

    const onClickToggleClose = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        toggleRef.current.style.visibility = "hidden";
        toggleRef.current.style.opacity = "0";
    }, [toggleRef])

    const onClickSub = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const tg = e.target as HTMLAnchorElement;
        const friend = tg.nextElementSibling;
        friend.classList.toggle("active");
    }, [])

    const test = async () => {
        //폴더추가
        // for (let i = 1; i <= 32; i++) {
        //     let storage1 = fb.storage().ref(`products/A0${i}/imgs/detail/test`);
        //     let storage2 = fb.storage().ref(`products/A0${i}/imgs/thumb/test`);
        //     await storage1.put(null);
        //     await storage2.put(null);
        //     await fb.storage().ref(`products/A0${i}/imgs/detail/test`).delete().catch(() => { console.log("text파일 없음") });
        //     await fb.storage().ref(`products/A0${i}/imgs/thumb/test`).delete().catch(() => { console.log("text파일 없음") });
        // }
        // console.log("폴더생성완료!")

        // 재고 추가
        // await fb.database().ref("/products/product").once("value").then(async (data) => {
        //     let temp = data.val();
        //     for (let key in temp) {
        //         let aa = {}

        //         //컬러 이름 생성
        //         temp[key]["color"].forEach((item, idx) => {
        //             aa[`option${idx + 1}`] = {
        //                 name: item
        //             }
        //         })
        //         let bb = {}
        //         //컬러 사이즈 생성
        //         temp[key]["size"].forEach((item, idx) => {
        //             bb[`sub_option${idx + 1}`] = {
        //                 name: item,
        //                 num: "10",
        //             }
        //         })

        //         for (let k in aa) {
        //             aa[k] = Object.assign(aa[k], bb);
        //         }

        //         await data.ref.parent.child(`/stock/${key}`).set(aa).then(() => {
        //             console.log(`/stock/${key} 데이터 생성 성공`)
        //         });

        //     }
        // })

    }
    return (
        <Wrap ref={divRef}>
            <Content ref={ref}>
                <MainMenu>
                    {isTablet ?
                        <ul className="left">
                            <li><Link href="/">BRAND</Link></li>
                            <li><Link href="/category"><a>PRODUCT</a></Link></li>
                            <li className="board">
                                <a>BOARD</a>
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
                        :
                        <MenuIcon>
                            <a className="toggle" onClick={onClickToggle}></a>
                        </MenuIcon>
                    }
                </MainMenu>
                <Logo>
                    <Link href="/">
                        <a><img src="/img/Logo2.png" alt="logo" /></a>
                    </Link>
                </Logo>
                <MainMenu>
                    {isTablet ?
                        <ul className="right">
                            {
                                userKey === null ?
                                    <li><Link href="/member/login"><a>LOGIN</a></Link></li>
                                    :
                                    <li><Link href="/"><a onClick={onLogout}>LOGOUT</a></Link></li>
                            }
                            {
                                userKey === null ?
                                    <li>
                                        <Link href="/member/signup?name=agree" as="/member/signup">
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
                        :
                        <MenuIcon><a className="search" onClick={onClickSearch}></a></MenuIcon>}
                </MainMenu>
                <SideMenu ref={toggleRef}>
                    <SideClose>
                        <a onClick={onClickToggleClose}><img src="/img/big_close.png" alt="닫기" /></a>
                    </SideClose>
                    <Inner>
                        <li onClick={onClickToggleClose}>
                            {userKey === null ? <Link href="/member/login"><a>login&nbsp;/&nbsp;</a></Link> : <a onClick={onLogout}>logout</a>}
                            {/* <span>/</span> */}
                            {userKey === null && <Link href="/member/signup?name=agree" as="/member/signup"><a>join us</a></Link>}
                        </li>
                        <li className="page" onClick={onClickToggleClose}>
                            <Link href="/mypage/main"><a>mypage</a></Link>
                        </li>
                        <li className="page" onClick={onClickToggleClose}>
                            <Link href="/cart"><a>cart</a></Link>
                        </li>
                        <li className="page" onClick={onClickToggleClose}>
                            <Link href="/category"><a>product</a></Link>
                        </li>
                        <li className="page">
                            <a onClick={onClickSub}>board</a>
                            <SubMenuWrap>
                                <li onClick={onClickToggleClose}><a onClick={onClickBoard} data-id="notice">notice</a></li>
                                <li onClick={onClickToggleClose}><a onClick={onClickBoard} data-id="free">free</a></li>
                                <li onClick={onClickToggleClose}><a onClick={onClickBoard} data-id="review">review</a></li>
                                <li onClick={onClickToggleClose}><a onClick={onClickBoard} data-id="qna">q&a</a></li>
                            </SubMenuWrap>
                        </li>
                    </Inner>
                </SideMenu>
                <SearchWrap ref={searchRef}>
                    <div>
                        <span onClick={onClickCancelSearch} >X</span>
                        <SearchInput>
                            <form onSubmit={moveSearch}>
                                <input type="text" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} placeholder="검색어를 입력해주세요." /><a onClick={moveSearch}></a>
                            </form>
                        </SearchInput>
                    </div>
                </SearchWrap>
                <BG />
            </Content>
        </Wrap>
    )
}