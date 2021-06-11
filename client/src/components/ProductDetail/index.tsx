import React, { useEffect, useRef, useCallback } from 'react'
import useSWR from 'swr';
import { fetcherData, fetcherStorage } from '../../util/fetcher';
import Board from '../Board'



import { InfoWrap, Info, Img, ProductAdd, OptionAdd, Form, ProductButton, DetailWrap, NaviBar, DetailInfo, BuyInfo, Review, QnA } from "./styles"

export default function ProductDetail() {


    const { data: detailImgs } = useSWR(`products/${1}/imgs/detail`, fetcherStorage, { revalidateOnMount: true, "initialData": [] });
    const { data: thumbImg } = useSWR(`products/${1}/imgs/thumb`, fetcherStorage, { revalidateOnMount: true, "initialData": [] });
    const { data: productInfo } = useSWR(`products/${1}`, fetcherData, { revalidateOnMount: true });

    const ref = new Array(4).fill(0).map((i) => { return useRef<HTMLDivElement>(null) });

    let detailOffset = 0;
    let infoOffset = 0;
    let reviewOffset = 0;
    let qnaOffset = 0;

    useEffect(() => {
        if (ref) {
            detailOffset = ref[0].current.offsetTop;
            infoOffset = ref[1].current.offsetTop;
            reviewOffset = ref[2].current.offsetTop;
            qnaOffset = ref[3].current.offsetTop;
        }
    }, [ref])

    useEffect(() => {
        console.log(detailImgs);
        console.log(detailImgs.length);
        console.log(thumbImg);
        console.log(thumbImg.length);
        console.log(productInfo);
    }, [detailImgs, thumbImg, productInfo])

    const onClickDetail = useCallback((e) => {
        e.preventDefault();
        console.log(detailOffset);
        window.scrollTo(0, detailOffset - 100);
    }, []);
    const onClickInfo = useCallback((e) => {
        e.preventDefault();
        console.log(detailOffset);
        window.scrollTo(0, infoOffset - 100);
    }, []);
    const onClickReview = useCallback((e) => {
        e.preventDefault();
        console.log(detailOffset);
        window.scrollTo(0, reviewOffset - 100);
    }, []);
    const onClickQna = useCallback((e) => {
        e.preventDefault();
        console.log(detailOffset);
        window.scrollTo(0, qnaOffset - 100);
    }, []);






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
                            <label>상품이름</label>
                            <div>
                                <button>small</button>
                                <button>medium</button>
                                <button>large</button>
                                <p>이것봐요!</p>
                            </div>
                        </OptionAdd>
                        <ProductAdd>
                            <label>상품이름</label>
                            <input type="number" min={1}
                                max={5} defaultValue="1"
                            />
                            <span>5000원</span>
                        </ProductAdd>
                        <ProductButton>
                            <nav><strong>0원</strong><span>(0개)</span></nav>
                            <div>
                                <button>구매하기</button>
                                <button>장바구니 담기</button>
                                <button>관심상품 등록</button>
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
