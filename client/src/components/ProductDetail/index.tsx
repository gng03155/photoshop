import { useRouter } from 'next/router';
import React, { useEffect, useRef, useCallback, useState } from 'react'
import useSWR from 'swr';
import fb from '../../firebase';

import { fetcherData, fetcherStorage } from '../../util/fetcher';
import Board from '../BoardList'

import { InfoWrap, Info, Img, ProductAdd, OptionAdd, Color, Form, ProductButton, DetailWrap, NaviBar, DetailInfo, BuyInfo, Review, QnA, LikeBtn, CartBtn } from "./styles"



interface Props {
    id: string,
}

export default function ProductDetail({ id }: Props) {

    const { data: detailImgs } = useSWR(`products/${id}/imgs/detail`, fetcherStorage, { revalidateOnMount: true, "initialData": [] });
    const { data: thumbImg } = useSWR(`products/${id}/imgs/thumb`, fetcherStorage, { revalidateOnMount: true, "initialData": [] });
    const { data: productInfo } = useSWR(`products/product/${id}`, fetcherData, { revalidateOnMount: true });
    const ref = new Array(4).fill(0).map((i) => { return useRef<HTMLDivElement>(null) });

    const router = useRouter();

    const colorRef = useRef<HTMLDivElement>();
    const sizeRef = useRef<HTMLDivElement>();

    const [userKey, setUserKey] = useState(null);

    const [isProduct, setIsProduct] = useState(false);
    const [isColor, setIsColor] = useState(false);
    const [buyProductInfo, setBuyProductInfo] = useState([]);
    const [option, setOption] = useState([]);
    const [selOption, setSelOption] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNum, setTotalNum] = useState(0);



    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [router]);

    const onClickDetail = useCallback((e) => {
        e.preventDefault();
        window.scrollTo(0, ref[0].current.offsetTop - 100);
    }, []);
    const onClickInfo = useCallback((e) => {
        e.preventDefault();
        window.scrollTo(0, ref[1].current.offsetTop - 100);
    }, []);
    const onClickReview = useCallback((e) => {
        e.preventDefault();
        window.scrollTo(0, ref[2].current.offsetTop - 100);
    }, []);
    const onClickQna = useCallback((e) => {
        e.preventDefault();
        window.scrollTo(0, ref[3].current.offsetTop - 100);
    }, []);


    const onClickBuy = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (buyProductInfo.length === 0) {
            alert("상품을 선택해주세요!");
            return;
        }
        if (userKey === null) {
            router.push("/login");
            return;
        }

        for (let info of buyProductInfo) {
            const dataRef = fb.database().ref(`cart/${userKey}`).push();
            const key = dataRef.toString().split(`${userKey}/`)[1]
            const idx = buyProductInfo.indexOf(info);
            dataRef.set({
                id: info.id,
                name: info.name,
                num: info.num,
                price: info.price,
                option: info.option,
                delivery: info.delivery,
                key: key,
                thumbnail_src: thumbImg[0],
            })
            info.key = key;
        }
        const copy = [...buyProductInfo];
        router.push({
            pathname: "/order",
            query: {
                data: JSON.stringify(copy),
            },
        }, `/order/${userKey}`);

    }, [userKey, buyProductInfo])


    const onChangeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, ""));
        if (value >= 5) {
            alert("최대 5개까지 주문 가능합니다!");
            value = 5;
        } else if (value === 0) {
            alert("최소 1개이상 주문해주세요!");
            value = 1;
        }
        const idx = Number(e.target.name);
        const copy = [...buyProductInfo];
        const price = Number(copy[idx].price);
        copy[idx].num = value;
        copy[idx].buy_price = price * value;

        calcPrice(copy);

        setBuyProductInfo(copy);
    }

    const calcPrice = (copy) => {
        let totalP = 0;
        let totalN = 0;


        for (let item of copy) {
            totalP = totalP + Number(item.buy_price);
            totalN = totalN + Number(item.num);
        }

        setTotalPrice(totalP);
        setTotalNum(totalN);

    }

    const onClickDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        const copy = [...buyProductInfo];
        const copyOpt = [...option];

        const opIdx = copyOpt.indexOf(`${copy[idx].size}`);

        copyOpt.splice(opIdx, 1);
        copy.splice(idx, 1);

        calcPrice(copy);
        setBuyProductInfo(copy);
        setOption(copyOpt);

    }

    const onClickMinus = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        const copy = [...buyProductInfo];
        let num = Number(copy[idx].num);
        if (num <= 1) {
            return
        }
        num--;
        const price = Number(copy[idx].price);
        copy[idx].buy_price = price * num;
        copy[idx].num = String(num);
        calcPrice(copy);
        setBuyProductInfo(copy);

    }

    const onClickPlus = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        const copy = [...buyProductInfo];
        let num = Number(copy[idx].num);
        if (num >= 5) {
            return
        }
        num++;
        const price = Number(copy[idx].price);
        copy[idx].buy_price = price * num;
        copy[idx].num = String(num);
        calcPrice(copy);
        setBuyProductInfo(copy);
    }

    const onClickColor = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const name = tg.id;
        const nodes = tg.parentElement.parentElement.childNodes;
        colorRef.current.firstChild.childNodes.forEach((node) => {
            const elem = node.firstChild as HTMLAnchorElement;
            elem.classList.remove("active");
        })
        sizeRef.current.firstChild.childNodes.forEach((node) => {
            const elem = node.firstChild as HTMLAnchorElement;
            elem.classList.remove("active");
        })
        tg.classList.add("active");

        setSelOption(name + "/");

        setIsColor(true);

    }

    const setBuyList = (name, info) => {
        setIsProduct(true);
        setOption([...option, selOption + name]);
        info.option = selOption + name;
        setBuyProductInfo([...buyProductInfo, info]);
        setTotalPrice(totalPrice + Number(info.price));
        setTotalNum(totalNum + 1);
    }

    const onClickSize = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (!isColor) {
            alert("컬러를 먼저 선택해주세요!");
            return;
        }
        const tg = e.target as HTMLAnchorElement;
        const name = tg.id;
        const nodes = tg.parentElement.parentElement.childNodes;
        sizeRef.current.firstChild.childNodes.forEach((node) => {
            const elem = node.firstChild as HTMLAnchorElement;
            elem.classList.remove("active");
        })

        tg.classList.add("active");


        let info = {
            id: productInfo.id,
            name: productInfo.name,
            option: "",
            num: "1",
            price: productInfo.price,
            buy_price: productInfo.price,
            delivery: productInfo.delivery,
            thumb_src: thumbImg[0],
        };
        if (option.includes(selOption + name)) {
            alert("이미 등록된 옵션입니다!");
            return;
        }
        setBuyList(name, info);
    }

    if (productInfo === undefined || detailImgs.length === 0 || thumbImg.length === 0) {
        return (<div></div>)
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <InfoWrap>
                <Img><img src={thumbImg.length > 0 ? thumbImg[0] : ""} alt="#" /></Img>
                <Info>
                    <table>
                        <tbody>
                            <tr>
                                <th>상품명</th>
                                <td><span>{productInfo?.name}</span></td>
                            </tr>
                            <tr>
                                <th>상품요약정보</th>
                                <td><span>{productInfo?.some_desc}</span></td>
                            </tr>
                            <tr>
                                <th>소비자가</th>
                                <td><span>{productInfo?.price}원</span></td>
                            </tr>
                            <tr>
                                <th>판매가</th>
                                <td><span><span>{productInfo?.price}원</span></span></td>
                            </tr>
                            <tr>
                                <th>국내·해외 배송</th>
                                <td><span><span>{productInfo?.derivery === 0 ? "국내배송" : "해외배송"}</span></span></td>
                            </tr>
                        </tbody>
                    </table>
                    <Form>
                        <OptionAdd>
                            <label>컬러</label>
                            <div ref={colorRef}>
                                <ul>
                                    {productInfo.color.map((value, idx) => {
                                        return <li key={idx}><Color color={value} id={value} onClick={onClickColor}></Color></li>
                                    })}
                                </ul>
                                <p>(필수선택)</p>
                            </div>
                        </OptionAdd>
                        <OptionAdd>
                            <label>사이즈</label>
                            <div ref={sizeRef}>
                                <ul>
                                    {productInfo.size.map((value, idx) => {
                                        return <li key={idx}><a id={value} onClick={onClickSize}>{value}</a></li>
                                    })}
                                </ul>
                                <p>(필수선택)</p>
                            </div>
                        </OptionAdd>
                        {isProduct && buyProductInfo.map((item, idx) => {
                            return <ProductAdd key={idx}>
                                <label>{item.name} - {item.option}</label>
                                <ul>
                                    <li><a id={`${idx}`} onClick={onClickMinus}></a></li>
                                    <li><input name={String(idx)} type="text" value={item.num} onChange={onChangeNum} maxLength={2}
                                    /></li>
                                    <li><a id={`${idx}`} onClick={onClickPlus}></a></li>
                                    <li><a id={`${idx}`} onClick={onClickDelete}></a></li>
                                </ul>
                                <span>{item.buy_price}원</span>
                            </ProductAdd>
                        })}
                        <ProductButton>
                            <nav><strong>{totalPrice}원</strong><span>({totalNum}개)</span></nav>
                            <div>
                                <ul>
                                    <li><button onClick={onClickBuy}>구매하기</button></li>
                                    <li>
                                        <LikeBtn className="active">
                                            <a></a>
                                            <span>1000</span>
                                        </LikeBtn>
                                    </li>
                                    <li>
                                        <CartBtn>
                                            <a></a>
                                        </CartBtn>
                                    </li>
                                </ul>
                            </div>
                        </ProductButton>
                    </Form>
                </Info>
            </InfoWrap>
            <DetailWrap>
                <DetailInfo ref={ref[0]}>
                    <NaviBar>
                        <ul>
                            <li onClick={onClickDetail} className="active"><a>상품상세정보</a></li>
                            <li onClick={onClickInfo}><a>상품구매안내</a></li>
                            <li onClick={onClickReview}><a>상품사용후기</a></li>
                            <li onClick={onClickQna}><a>상품Q&A</a></li>
                        </ul>
                    </NaviBar>
                    <div>
                        {detailImgs !== null ? detailImgs.map((url, idx) => {
                            return <img key={idx} src={url} alt="#" />
                        }) : <></>}
                    </div>
                </DetailInfo>
                <BuyInfo ref={ref[1]}>
                    <NaviBar>
                        <ul>
                            <li onClick={onClickDetail} ><a>상품상세정보</a></li>
                            <li onClick={onClickInfo} className="active"><a>상품구매안내</a></li>
                            <li onClick={onClickReview}><a>상품사용후기</a></li>
                            <li onClick={onClickQna}><a>상품Q&A</a></li>
                        </ul>
                    </NaviBar>
                    <BuyInfo>
                        <div>
                            <h3>상품 결제 정보</h3>
                            <p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다. </p>
                            <p>무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다. </p>
                            <br />
                            <p>주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.</p>
                        </div>
                        <div>
                            <h3>배송 정보</h3>
                            <p>배송 방법 : 택배</p>
                            <p>배송 지역 : 전국지역</p>
                            <p>배송 비용 : 무료</p>
                            <p>배송 기간 : 3일 ~ 7일</p>
                            <p>배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.</p>
                            <p>고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.</p>
                        </div>
                        <div>
                            <h3>교환 및 반품정보</h3>
                            <p>- 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.</p>
                            <p>- 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내</p>
                            <p>※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)</p>
                        </div>
                        <div>
                            <h3>서비스문의</h3>
                            <p>서비스 문의안내 노출</p>
                        </div>
                    </BuyInfo>
                </BuyInfo>
                <Review ref={ref[2]}>
                    <NaviBar>
                        <ul>
                            <li onClick={onClickDetail} ><a>상품상세정보</a></li>
                            <li onClick={onClickInfo} ><a>상품구매안내</a></li>
                            <li onClick={onClickReview} className="active"><a>상품사용후기</a></li>
                            <li onClick={onClickQna}><a>상품Q&A</a></li>
                        </ul>
                    </NaviBar>
                    <h2>Review</h2>
                    <Board></Board>
                </Review>
                <QnA ref={ref[3]}>
                    <NaviBar>
                        <ul>
                            <li onClick={onClickDetail}><a>상품상세정보</a></li>
                            <li onClick={onClickInfo} ><a>상품구매안내</a></li>
                            <li onClick={onClickReview}><a>상품사용후기</a></li>
                            <li onClick={onClickQna} className="active"><a>상품Q&A</a></li>
                        </ul>
                    </NaviBar>
                    <h2>Q&A</h2>
                    <Board></Board>
                </QnA>
            </DetailWrap>
        </div>
    )
}
