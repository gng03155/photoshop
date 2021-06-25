import React, { useCallback, useEffect, useState } from 'react'

import useSWR from 'swr';
import { useRouter } from 'next/router'
import DaumPostcode from 'react-daum-postcode';

import { fetcherData } from '../../../src/util/fetcher';
import { OrderArea, ShippingInfo, AddressBox, PhoneBox, EmailBox, OrderInfo, ThumbNail, Description, PaymentArea, OrderEnd, Wrap } from './styles';
import fb from '../../../src/firebase';
import moment from 'moment';
import localFetcher from '../../util/localFetcher';


interface Props {
    userKey: string,
    cartData: any,
}
export default function OrderPage({ userKey, cartData }: Props) {


    const { data: load, mutate } = useSWR("load", localFetcher);
    const { data: userInfo, error } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [cartList, setCartList] = useState<any>(cartData);

    const [isStandard, setIsStandard] = useState(true);

    const [name, setName] = useState("");
    const [adrs1, setAdrs1] = useState("");
    const [adrs2, setAdrs2] = useState("");
    const [adrs3, setAdrs3] = useState("");
    const [mobile1, setMobile1] = useState("");
    const [mobile2, setMobile2] = useState("");
    const [mobile3, setMobile3] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const [delMsg, setDelMsg] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);


    const [isAdress, setIsAdress] = useState(false);


    useEffect(() => {
        if (userInfo !== undefined) {
            setName(userInfo.name);
            setAdrs1(userInfo.adrs[0]);
            setAdrs2(userInfo.adrs[1]);
            setAdrs3(userInfo.adrs[2]);
            setMobile1(userInfo.mobile[0]);
            setMobile2(userInfo.mobile[1]);
            setMobile3(userInfo.mobile[2]);
            setEmail1(userInfo.email.split("@")[0]);
            setEmail2(userInfo.email.split("@")[1]);
        }
    }, [userInfo])

    useEffect(() => {
        const price = cartList.reduce((prev, cur) => {
            return prev + Number(cur.price) * Number(cur.num);
        }, 0);
        setTotalPrice(price);
    }, [cartList])

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
            setAdrs1(data.zonecode);
        if (data.address)
            setAdrs2(data.address);
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

    const onClickShipping = (e: React.MouseEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const tg = e.target as HTMLInputElement;
        const state = tg.value;
        if (state === "standard") {
            setName(userInfo.name);
            setAdrs1(userInfo.adrs[0]);
            setAdrs2(userInfo.adrs[1]);
            setAdrs3(userInfo.adrs[2]);
            setMobile1(userInfo.mobile[0]);
            setMobile2(userInfo.mobile[1]);
            setMobile3(userInfo.mobile[2]);
            setEmail1(userInfo.email.split("@")[0]);
            setEmail2(userInfo.email.split("@")[1]);

        } else if (state === "new") {

            setName("");
            setAdrs1("");
            setAdrs2("");
            setAdrs3("");
            setMobile1("");
            setMobile2("");
            setMobile3("");
            setEmail1("");
            setEmail2("");
        }

    }

    const onChangeValue = (e: any, value) => {
        value(e.target.value);
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>, setState) => {
        const tg = e.target as HTMLSelectElement;
        const value = tg.value;
        const inputElem = tg.nextElementSibling as HTMLInputElement;

        if (value !== "etc") {
            inputElem.style.display = "none";
            setState(value);
            return;
        }
        inputElem.style.display = "inline-block";
        setState("");

    }

    const onClickDeleteList = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const isDelete = confirm("정말로 해당 상품을 취소하시겠습니까?");
        if (!isDelete) {
            return;
        }
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        const copy = [...cartList];

        //파이어베이스 데이터 삭제
        fb.database().ref(`cart/${userKey}/${copy[idx].key}`).remove().then(
            () => {
                console.log("삭제완료");
            }
        );

        copy.splice(idx, 1);
        setCartList(copy);

        // 상품이 1개만 남았는데 삭제했을 경우
        if (idx === 0) {
            router.back();
            return;
        }
    }

    const onClickPayment = async (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const mob = mobile2 + mobile3;
        if (checkMobNumber(mob)) {
            console.log("숫자임");
        } else {
            alert("핸드폰 번호 항목이 숫자 형식이 아닙니다.");
            return;
        }

        if (checkEmail(email2)) {
            console.log("이메일맞음");
        } else {
            alert("이메일 주소가 잘못되었습니다.");
            return;
        }

        const rand1 = moment().format("YYMMDDHH");
        const rand2 = Math.floor(Math.random() * (999 - 100)) + 100;

        const orderNum = rand1 + String(rand2);

        mutate(true, false);
        const mainRef = await fb.database().ref(`order/order_list`).push();
        const mKey = mainRef.key;
        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        let pKeyList = [];
        for (let list of cartList) {
            const proRef = await fb.database().ref(`order/p_list`).push();
            const pKey = proRef.key;
            pKeyList.push(pKey);
            const proInfo = {
                name: list.name,
                id: list.id,
                price: list.price,
                num: list.num,
                option: list.option || null,
                thumb_src: list.thumb_src,
                mileage: 0,
                coupon: 0,
            }

            const productOrderInfo = {
                main_key: mKey,
                key: pKey,
                product_info: proInfo,
                date,
                shipping: "payed",
                order_num: orderNum,
            }

            await fb.database().ref(`cart/${userKey}/${list.key}`).remove().then(() => { (`cart/${userKey}/${list.key} 데이터 삭제 성공`) });

            await proRef.set(productOrderInfo).then(() => {
                console.log("order/p_list 데이터 성공");
            });

            await fb.database().ref(`order/shipping/payed/${pKey}`).set(pKey).then(() => { console.log(`order/shipping 데이터 성공`) });

        }

        const shippingInfo = {
            name,
            adrs: [adrs1, adrs2, adrs3],
            mobile: [mobile1, mobile2, mobile3],
            email: email1 + "@" + email2,
            msg: delMsg,
        }
        const payInfo = {
            type: "normal",
            price: totalPrice,
            sale: 0,
            del_pay: 0,
            is_pay: true,
        }
        const mainInfo = {
            order_num: orderNum,
            shipping_info: shippingInfo,
            pay_info: payInfo,
            product_list: pKeyList,
            date,
        }

        mainRef.set(mainInfo).then(() => { console.log(`order/order_list 데이터 성공`) })

        fb.database().ref(`order/user/${userKey}`).once("value").then((data) => {
            let copy = [];
            if (data.exists()) {
                copy = data.val();
            }
            for (let i of pKeyList) {
                copy.push(i);
            }
            data.ref.set(copy).then(() => { console.log(`order/user/${userKey} 데이터 성공`) });
        })

        mutate(false, false);
    }



    const checkMobNumber = (value) => {
        const chkStyle = /^[0-9]+$/;
        if (chkStyle.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    const checkEmail = (value) => {
        const chkStyle = /[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
        if (chkStyle.test(value)) {
            return true;
        } else {
            return false;
        }
    }



    if (userInfo === undefined) {
        return <div></div>
    }

    return (
        <Wrap>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>배송지</h2>
                    <a><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ShippingInfo>
                    <div>
                        <ul>
                            <li><label>회원 정보와 동일</label><input type="radio" name="shipping" defaultChecked={true} value="standard" onClick={onClickShipping} /></li>
                            <li><label>새로운 배송지</label><input type="radio" name="shipping" value="new" onClick={onClickShipping} /></li>
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
                                <td><input type="text" value={name} onChange={e => onChangeValue(e, setName)} /></td>
                            </tr>
                            <AddressBox>
                                <th>주소</th>
                                <td>
                                    <ul>
                                        <li>
                                            <input type="text" id="zone" placeholder="우편주소" value={adrs1} disabled />
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
                                        <li><input type="text" id="adrs" value={adrs2} placeholder="기본주소" disabled /></li>
                                        <li><input type="text" id="adrs2" placeholder="상세 주소를 입력해주세요. (선택)" value={adrs3} onChange={e => onChangeValue(e, setAdrs3)} /></li>
                                    </ul>
                                </td>
                            </AddressBox>
                            <PhoneBox>
                                <th>휴대전화</th>
                                <td>
                                    <select id="mobile1">
                                        {mobile1 !== undefined ? <option value="none" hidden>{userInfo.mobile[0]}</option> : <></>}
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                    <input type="text" id="mobile2" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요" value={mobile2} onChange={e => onChangeValue(e, setMobile2)} />
                                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                    <input type="text" id="mobile3" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요"
                                        value={mobile3} onChange={e => onChangeValue(e, setMobile3)} />
                                </td>
                            </PhoneBox>
                            <EmailBox>
                                <th>이메일</th>
                                <td>
                                    <input type="text" value={email1} onChange={e => onChangeValue(e, setEmail1)} />
                                    <span>@</span>
                                    <span className="wrap">
                                        <select onChange={e => onChangeSelect(e, setEmail2)}>
                                            {email1 !== undefined ? <option value="none" hidden>{userInfo.email.split("@")[1]}</option> : <></>}
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
                                        <input type="text" onChange={e => onChangeValue(e, setEmail2)} />
                                    </span>
                                </td>
                            </EmailBox>
                        </tbody>
                    </table>
                    <div>
                        <span className="wrap">
                            <select id="omessage_select" name="omessage_select" onChange={e => onChangeSelect(e, setDelMsg)}>
                                <option value="">-- 메시지 선택 (선택사항) --</option>
                                <option value="배송 전에 미리 연락바랍니다.">배송 전에 미리 연락바랍니다.</option>
                                <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                                <option value="부재 시 문 앞에 놓아주세요.">부재 시 문 앞에 놓아주세요.</option>
                                <option value="빠른 배송 부탁드립니다.">빠른 배송 부탁드립니다.</option>
                                <option value="택배함에 보관해 주세요.">택배함에 보관해 주세요.</option>
                                <option value="etc">직접 입력</option>
                            </select>
                            <input type="text" onChange={e => onChangeValue(e, setDelMsg)} />
                        </span>
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
                        {cartList.map((info, idx) => {
                            console.log(info.thumb_src);
                            return (
                                <li key={info.key}>
                                    <ThumbNail>
                                        <img src={info.thumb_src} alt="썸네일" />
                                    </ThumbNail>
                                    <Description>
                                        <h3>{info.name}</h3>
                                        <strong>옵션 : {info.option}</strong>
                                        <p>수량 : {info.num}</p>
                                        <p>상품 구매 금액 : {info.price * info.num}</p>
                                        <p>배송 : 무료배송</p>
                                    </Description>
                                    <a id={`${idx}`} onClick={onClickDeleteList}>X</a>
                                </li>
                            )
                        })}
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
                            <p>{totalPrice.toLocaleString()}원</p>
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
                            <strong>{totalPrice.toLocaleString()}원</strong>
                        </li>
                    </ul>
                </PaymentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h2>적립금 혜택</h2>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <PaymentArea>
                    <ul>
                        <li>
                            <p>상품 적립금</p>
                            <p>{totalPrice * 0.05}원</p>
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
                            <strong>{totalPrice * 0.05}원</strong>
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
            <OrderEnd>
                <button onClick={onClickPayment}>{totalPrice.toLocaleString()}원 결제</button>
                <p>무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다. 무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.</p>
                <p>최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.</p>
            </OrderEnd>
        </Wrap>
    )
}
