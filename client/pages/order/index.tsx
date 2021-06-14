import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { fetcherData } from '../../src/util/fetcher';

import { OrderArea, ShippingInfo, AddressBox, PhoneBox, EmailBox, OrderInfo, ThumbNail, Description, PaymentArea, OrderEnd } from './styles';
import DaumPostcode from 'react-daum-postcode';

export default function Order() {


    const [userKey, setUserKey] = useState("");

    const { data: userInfo, error } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [isAdress, setIsAdress] = useState(false);
    const [zoneCode, setZoneCode] = useState("");
    const [address, setAddress] = useState("");


    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [router])

    useEffect(() => {
        if (typeof router.query.data === "string") {
            const data = JSON.parse(router.query.data);
            console.log(data);
        }
    }, [router])

    useEffect(() => {
    }, [userInfo])

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setIsAdress(false);

        if (data.zonecode)
            setZoneCode(data.zonecode);
        if (data.address)
            setAddress(data.address);
    };

    const onSearchAdress = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setIsAdress(true);
        },
        [],
    );

    const onClickArrow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const tg = e.currentTarget as HTMLDivElement;
        const chlid = tg.lastChild as HTMLAnchorElement;
        chlid.classList.toggle("active");

        const contentArea = tg.nextElementSibling as HTMLDivElement;
        const ht = window.getComputedStyle(contentArea).maxHeight;
        // const dp = contentArea.style.visibility;
        // contentArea.style.visibility = dp === "visible" ? "hidden" : "visible";
        contentArea.style.maxHeight = ht === "0px" ? "500px" : "0px";


    }


    return (
        <div style={{ borderLeft: "1px solid #ececec", borderRight: "1px solid #ececec" }}>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>배송지</h2>
                    <a><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ShippingInfo>
                    <div>
                        <ul>
                            <li><label>회원 정보와 동일</label><input type="radio" name="shipping" /></li>
                            <li><label>새로운 배송지</label><input type="radio" name="shipping" /></li>
                        </ul>
                    </div>
                    <table>
                        <colgroup>
                            <col style={{ width: "150px" }} />
                            <col style={{ width: "auto" }} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>받는사람</th>
                                <td><input type="text" /></td>
                            </tr>
                            <AddressBox>
                                <th>주소</th>
                                <td>
                                    <ul>
                                        <li>
                                            <input type="text" id="zone" placeholder="우편주소" value={zoneCode} disabled />
                                            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSearchAdress(e)}>주소검색
                                                {isAdress &&
                                                    <DaumPostcode style={{
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: "-50px",
                                                        left: "0px",
                                                        width: '400px',
                                                        height: '400px',
                                                    }} onComplete={handleComplete} />
                                                }
                                            </button>
                                        </li>
                                        <li><input type="text" id="adrs" placeholder="기본주소" value={address} disabled /></li>
                                        <li><input type="text" id="adrs2" placeholder="상세 주소를 입력해주세요. (선택)" /></li>
                                    </ul>
                                </td>
                            </AddressBox>
                            <PhoneBox>
                                <th>휴대전화</th>
                                <td>
                                    <select id="mobile1">
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                    <input type="text" id="mobile2" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요" />
                                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                    <input type="text" id="mobile3" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요" />
                                </td>
                            </PhoneBox>
                            <EmailBox>
                                <th>이메일</th>
                                <td>
                                    <input type="text" />
                                    <span>@</span>
                                    <select >
                                        <option value="">-이메일 선택-</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                        <option value="nate.com">nate.com</option>
                                        <option value="hotmail.com">hotmail.com</option>
                                        <option value="yahoo.com">yahoo.com</option>
                                        <option value="empas.com">empas.com</option>
                                        <option value="korea.com">korea.com</option>
                                        <option value="dreamwiz.com">dreamwiz.com</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="etc">직접입력</option>
                                    </select>
                                </td>
                            </EmailBox>
                        </tbody>
                    </table>
                    <div>
                        <select id="omessage_select" name="omessage_select">
                            <option value="oMessage-0">-- 메시지 선택 (선택사항) --</option>
                            <option value="oMessage-1">배송 전에 미리 연락바랍니다.</option>
                            <option value="oMessage-2">부재 시 경비실에 맡겨주세요.</option>
                            <option value="oMessage-3">부재 시 문 앞에 놓아주세요.</option>
                            <option value="oMessage-4">빠른 배송 부탁드립니다.</option>
                            <option value="oMessage-5">택배함에 보관해 주세요.</option>
                            <option value="oMessage-input">직접 입력</option>
                        </select>
                    </div>
                </ShippingInfo>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>주문상품</h2>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <OrderInfo>
                    <ul>
                        <li>
                            <ThumbNail>
                                <img src="/img/ch2.jpg" alt="썸네일" />
                            </ThumbNail>
                            <Description>
                                <h3>상품이름</h3>
                                <strong>옵션 : 빨강/스몰</strong>
                                <p>수량 : 5개</p>
                                <p>상품 구매 금액 : 1000원</p>
                                <p>배송 : 무료배송</p>
                            </Description>
                            <a>X</a>
                        </li>
                        <li>
                            <ThumbNail>
                                <img src="/img/ch2.jpg" alt="썸네일" />
                            </ThumbNail>
                            <Description>
                                <h3>상품이름</h3>
                                <strong>옵션 : 빨강/스몰</strong>
                                <p>수량 : 5개</p>
                                <p>상품 구매 금액 : 1000원</p>
                                <p>배송 : 무료배송</p>
                            </Description>
                            <a>X</a>
                        </li>
                    </ul>
                </OrderInfo>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>결제 정보</h2>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <PaymentArea>
                    <ul>
                        <li>
                            <p>주문상품</p>
                            <p>100000원</p>
                        </li>
                        <li>
                            <p>할인/부가결제</p>
                            <p>-0원</p>
                        </li>
                        <li>
                            <p>배송비</p>
                            <p>+0원</p>
                        </li>
                        <li>
                            <strong>결제금액</strong>
                            <strong>100000원</strong>
                        </li>
                    </ul>
                </PaymentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={() => { alert("준비중입니다.") }}>
                    <h2>결제수단</h2>
                    <a><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <div></div>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>적립금 혜택</h2>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <PaymentArea>
                    <ul>
                        <li>
                            <p>상품별 적립금</p>
                            <p>100원</p>
                        </li>
                        <li>
                            <p>회원 적립금</p>
                            <p>0원</p>
                        </li>
                        <li>
                            <p>쿠폰 적립금</p>
                            <p>0원</p>
                        </li>
                        <li>
                            <strong>적립 예정금액</strong>
                            <strong>100원</strong>
                        </li>
                    </ul>
                </PaymentArea>
            </OrderArea>
            <OrderEnd>
                <button>100000원 결제</button>
                <p>무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다. 무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.</p>
                <p>최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.</p>
            </OrderEnd>
        </div>
    )
}
