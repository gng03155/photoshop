import React, { useCallback, useEffect, useState } from 'react'

import useSWR from 'swr';
import { useRouter } from 'next/router'
import DaumPostcode from 'react-daum-postcode';

import { fetcherData } from '../../../util/fetcher';
import { OrderArea, ShippingInfo, AddressBox, PhoneBox, EmailBox, OrderInfo, ThumbNail, Description, PaymentArea, OrderEnd, Wrap, PostWrap, ContentArea } from './styles';
import fb from '../../../firebase';
import moment from 'moment';
import { localFetcher } from '../../../util/localFetcher';
import { NewItem } from '../../Home/Section/styles';
import { ICart, IUser } from '../../../types';


interface Props {
    userKey: string,
    cartData: ICart[],
}
export default function OrderPage({ userKey, cartData }: Props) {


    const { data: load, mutate } = useSWR("load", localFetcher);
    const { data: userInfo, error } = useSWR<IUser | undefined>(`${userKey ? `/users/${userKey}` : ''}`, fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const [cartList, setCartList] = useState<ICart[]>(cartData);

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

    const [mileage, setMileage] = useState(0);
    const [productSale, setProductSale] = useState(0);
    const [delPrice, setDelPrice] = useState(0);


    const [postPos, setPostPos] = useState({ x: 0, y: 0 });

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
        console.log(data);
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
            const tg = e.target as HTMLButtonElement;
            const parent = tg.parentElement.parentElement;
            const x = window.pageXOffset + parent.getBoundingClientRect().left;
            const y = window.pageYOffset + parent.getBoundingClientRect().top;
            setPostPos({ x, y });
            setIsAdress(true);
        },
        [],
    );

    const onCloseAddress = useCallback(() => {
        setIsAdress(false);
    }, [])

    const onClickArrow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const tg = e.currentTarget as HTMLDivElement;
        const chlid = tg.lastChild as HTMLAnchorElement;
        chlid.classList.toggle("active");

        const contentArea = tg.nextElementSibling as HTMLDivElement;

        const clientHt = contentArea.firstElementChild.clientHeight;
        const ht = window.getComputedStyle(contentArea).height;

        contentArea.style.height = ht === "0px" ? `${clientHt}px` : "0px";
    }, [])

    const onClickShipping = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
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

    }, [userInfo])

    const onChangeValue = useCallback((e: any, value) => {
        value(e.target.value);
    }, [])

    const onChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>, setState) => {
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

    }, [])

    const onClickDeleteList = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const isDelete = confirm("????????? ?????? ????????? ?????????????????????????");
        if (!isDelete) {
            return;
        }
        const tg = e.target as HTMLAnchorElement;
        const idx = Number(tg.id);
        const copy = [...cartList];

        //?????????????????? ????????? ??????
        fb.database().ref(`cart/${userKey}/${copy[idx].key}`).remove().then(
            () => {
                console.log("????????????");
            }
        );

        copy.splice(idx, 1);
        setCartList(copy);

        // ????????? 1?????? ???????????? ???????????? ??????
        if (idx === 0) {
            router.back();
            return;
        }
    }, [cartList, userKey, fb])

    const onClickPayment = useCallback(async (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const mob = mobile2 + mobile3;
        if (checkMobNumber(mob)) {
            console.log("?????????");
        } else {
            alert("????????? ?????? ????????? ?????? ????????? ????????????.");
            return;
        }

        if (checkEmail(email2)) {
            console.log("???????????????");
        } else {
            alert("????????? ????????? ?????????????????????.");
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
            const optionList = list.option.split("/");
            const mile = ((Number(list.price) * Number(list.num)) * 0.05);
            pKeyList.push(pKey);

            const proInfo = {
                name: list.name,
                id: list.id,
                price: list.price,
                num: list.num,
                option: list.option || null,
                thumb_src: list.thumb_src,
                mileage: mile,
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

            await fb.database().ref(`cart/${userKey}/${list.key}`).remove().then(() => { (`cart/${userKey}/${list.key} ????????? ?????? ??????`) });

            await proRef.set(productOrderInfo).then(() => {
                console.log("order/p_list ????????? ??????");
            });

            await fb.database().ref(`order/shipping/payed/${pKey}`).set(pKey).then(() => { console.log(`order/shipping ????????? ??????`) });

            await fb.database().ref(`products/stock/${list.id}`).once("value").then((data) => {
                if (data.exists()) {
                    const main = data.val();
                    let mainKey = "";
                    let subKey = "";
                    for (let key in main) {
                        if (main[key].name === optionList[0]) {
                            mainKey = key;
                            break;
                        }
                    }
                    if (mainKey !== "") {
                        for (let key in main[mainKey]) {
                            if (main[mainKey][key]["name"] === optionList[1]) {
                                subKey = key;
                            }
                        }

                        let temp = main[mainKey][subKey]["num"];
                        temp = Number(temp) - Number(proInfo.num);
                        temp = temp < 0 ? 0 : temp;

                        data.ref.child(`${mainKey}/${subKey}`).update({
                            num: temp,
                        }).then(() => { console.log(`${mainKey}/${subKey} ?????? ???????????? ??????`) })

                    }
                }
            })

        }

        const totalMile = totalPrice * 0.05;

        let userMile = Number(userInfo.mileage);

        //???????????? ????????? ??????
        await fb.database().ref(`users/${userKey}`).once("value").then((data) => {
            if (data.exists) {
                let temp = Number(data.val().mileage);
                temp = temp + totalMile - mileage;
                data.ref.update({ mileage: temp });
            }
        })

        await fb.database().ref(`mileage/history/${userKey}`).push({
            order: orderNum,
            order_key: mKey,
            total_mileage: userMile + totalMile,
            use_mileage: totalMile,
            state: "increase",
            type: "buy",
            date,
        })

        if (mileage !== 0) {
            await fb.database().ref(`mileage/history/${userKey}`).push({
                order: orderNum,
                order_key: mKey,
                total_mileage: userMile + totalMile - mileage,
                use_mileage: mileage,
                state: "decrease",
                type: "buy",
                date,
            })
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
            total_price: totalPrice,
            pay_price: totalPrice - mileage - productSale + delPrice,
            get_mileage: totalMile,
            use_mileage: mileage,
            sale: mileage + productSale,
            del_pay: delPrice,
            is_pay: true,
        }
        const mainInfo = {
            order_num: orderNum,
            shipping_info: shippingInfo,
            pay_info: payInfo,
            product_list: pKeyList,
            date,
        }


        //?????? ??????????????? ????????? ??????
        await mainRef.set(mainInfo).then(() => { console.log(`order/order_list ????????? ??????`) })

        await fb.database().ref(`order/user/${userKey}`).once("value").then((data) => {
            let copy = [];
            if (data.exists()) {
                copy = data.val();
            }
            for (let i of pKeyList) {
                copy.push(i);
            }
            data.ref.set(copy).then(() => { console.log(`order/user/${userKey} ????????? ??????`) });
        })

        mutate(false, false);

        router.push({
            pathname: "/mypage/[id]",
            query: {
                orderKey: mKey,
            },
        }, "/mypage/order_detail");

        return;
    }, [adrs1, adrs2, adrs3, mobile1, mobile2, mobile3, email1, email2, delMsg, fb, cartList, userKey, totalPrice, userInfo, mileage, productSale, router])

    const onChangeMileage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        const maxMileage = Number(userInfo.mileage);

        // [^0]\w[1-9]
        // const regex = /(?<=^0)[1-9]+/g;
        // if (regex.test(e.target.value)) {
        //     value = Number(e.target.value.match(regex).join());
        // }


        if (value > totalPrice) {
            alert("?????? ?????? ???????????? ?????????????????????.");
            setMileage(0);
            return;
        }

        if (value > maxMileage) {
            alert("???????????? ???????????? ?????????????????????.");
            setMileage(maxMileage);
            return;
        } else {
            setMileage(value);
        }
    }, [userInfo, totalPrice])

    const checkMobNumber = useCallback((value) => {
        const chkStyle = /^[0-9]+$/;
        if (chkStyle.test(value)) {
            return true;
        } else {
            return false;
        }
    }, [])

    const checkEmail = useCallback((value) => {
        const chkStyle = /[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
        if (chkStyle.test(value)) {
            return true;
        } else {
            return false;
        }
    }, [])



    if (userInfo === undefined) {
        return <div></div>
    }

    return (
        <Wrap>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h3>?????????</h3>
                    <a><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ContentArea>
                    <ShippingInfo>
                        <div>
                            <ul>
                                <li><label>?????? ????????? ??????</label><input type="radio" name="shipping" defaultChecked={true} value="standard" onClick={onClickShipping} /></li>
                                <li><label>????????? ?????????</label><input type="radio" name="shipping" value="new" onClick={onClickShipping} /></li>
                            </ul>
                        </div>
                        <table>
                            <colgroup>
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "auto" }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>????????????</th>
                                    <td><input type="text" value={name} onChange={e => onChangeValue(e, setName)} /></td>
                                </tr>
                                <AddressBox>
                                    <th>??????</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <input type="text" id="zone" placeholder="????????????" value={adrs1} disabled />
                                                <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSearchAdress(e)}>????????????</button>
                                            </li>
                                            <li><input type="text" id="adrs" value={adrs2} placeholder="????????????" disabled /></li>
                                            <li><input type="text" id="adrs2" placeholder="?????? ????????? ??????????????????. (??????)" value={adrs3} onChange={e => onChangeValue(e, setAdrs3)} /></li>
                                            {isAdress &&
                                                <PostWrap x={postPos.x} y={postPos.y}>
                                                    <a onClick={onCloseAddress}><img src="/img/close.png" alt="??????" /></a>
                                                    <DaumPostcode style={{
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: "0px",
                                                        left: "0px",
                                                        width: '100%',
                                                        height: '400px',
                                                        border: "5px solid #000",
                                                    }} onComplete={handleComplete} />
                                                </PostWrap>
                                            }
                                        </ul>
                                    </td>
                                </AddressBox>
                                <PhoneBox>
                                    <th>????????????</th>
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
                                        <input type="text" id="mobile2" maxLength={4} pattern="^[0-9]+$" title="????????? ??????????????? ??????????????????" value={mobile2} onChange={e => onChangeValue(e, setMobile2)} />
                                        <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                        <input type="text" id="mobile3" maxLength={4} pattern="^[0-9]+$" title="????????? ??????????????? ??????????????????"
                                            value={mobile3} onChange={e => onChangeValue(e, setMobile3)} />
                                    </td>
                                </PhoneBox>
                                <EmailBox>
                                    <th>?????????</th>
                                    <td>
                                        <input type="text" value={email1} onChange={e => onChangeValue(e, setEmail1)} />
                                        <span>@</span>
                                        <span className="wrap">
                                            <select onChange={e => onChangeSelect(e, setEmail2)}>
                                                {email1 !== undefined ? <option value="none" hidden>{userInfo.email.split("@")[1]}</option> : <></>}
                                                <option value="">-????????? ??????-</option>
                                                <option value="naver.com">naver.com</option>
                                                <option value="daum.net">daum.net</option>
                                                <option value="nate.com">nate.com</option>
                                                <option value="hotmail.com">hotmail.com</option>
                                                <option value="yahoo.com">yahoo.com</option>
                                                <option value="empas.com">empas.com</option>
                                                <option value="korea.com">korea.com</option>
                                                <option value="dreamwiz.com">dreamwiz.com</option>
                                                <option value="gmail.com">gmail.com</option>
                                                <option value="etc">????????????</option>
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
                                    <option value="">-- ????????? ?????? (????????????) --</option>
                                    <option value="?????? ?????? ?????? ??????????????????.">?????? ?????? ?????? ??????????????????.</option>
                                    <option value="?????? ??? ???????????? ???????????????.">?????? ??? ???????????? ???????????????.</option>
                                    <option value="?????? ??? ??? ?????? ???????????????.">?????? ??? ??? ?????? ???????????????.</option>
                                    <option value="?????? ?????? ??????????????????.">?????? ?????? ??????????????????.</option>
                                    <option value="???????????? ????????? ?????????.">???????????? ????????? ?????????.</option>
                                    <option value="etc">?????? ??????</option>
                                </select>
                                <input type="text" onChange={e => onChangeValue(e, setDelMsg)} />
                            </span>
                        </div>
                    </ShippingInfo>
                </ContentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h3>????????????</h3>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ContentArea>
                    <OrderInfo>
                        <ul>
                            {cartList.map((info, idx) => {
                                return (
                                    <li key={info.key}>
                                        <ThumbNail>
                                            <img src={info.thumb_src} alt="?????????" />
                                        </ThumbNail>
                                        <Description>
                                            <h3>{info.name}</h3>
                                            <strong>?????? : {info.option}</strong>
                                            <p>?????? : {info.num}</p>
                                            <p>?????? ?????? ?????? : {Number(info.price) * Number(info.num)}</p>
                                            <p>?????? : ????????????</p>
                                        </Description>
                                        <a id={`${idx}`} onClick={onClickDeleteList}>X</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </OrderInfo>
                </ContentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h3>????????? ??????</h3>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ContentArea>
                    <PaymentArea>
                        <ul>
                            <li>
                                <p>?????? ?????????</p>
                                <p>{userInfo.mileage}???</p>
                            </li>
                            <li>
                                <p>?????? ????????????</p>
                                <p>{totalPrice * 0.05}???</p>
                            </li>
                            <li>
                                <strong>?????? ?????????</strong>
                                <div>
                                    <input type="number" value={mileage === 0 ? "" : mileage} placeholder={"0"} onChange={onChangeMileage} />
                                    <span>???</span>
                                </div>
                            </li>
                        </ul>
                    </PaymentArea>
                </ContentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={onClickArrow}>
                    <h3>?????? ??????</h3>
                    <a ><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <ContentArea>
                    <PaymentArea>
                        <ul>
                            <li>
                                <p>????????????</p>
                                <p>{totalPrice.toLocaleString()}???</p>
                            </li>
                            <li>
                                <p>??????</p>
                                <p>- {productSale}???</p>
                            </li>
                            <li>
                                <p>????????? ??????</p>
                                <p>- {mileage}???</p>
                            </li>
                            <li>
                                <p>?????????</p>
                                <p>+ {delPrice}???</p>
                            </li>
                            <li>
                                <strong>????????????</strong>
                                <strong>{(totalPrice - mileage - productSale + delPrice).toLocaleString()}???</strong>
                            </li>
                        </ul>
                    </PaymentArea>
                </ContentArea>
            </OrderArea>
            <OrderArea>
                <div onClick={() => { alert("??????????????????.") }}>
                    <h3>????????????</h3>
                    <a><img src="/img/bg_fold.png" alt="fold" /></a>
                </div>
                <div></div>
            </OrderArea>
            <OrderEnd>
                <button onClick={onClickPayment}>{(totalPrice - mileage - productSale + delPrice).toLocaleString()}??? ??????</button>
                <p>?????????????????? ???????????? ?????? ????????? ?????????????????? ????????? ????????? ????????? ????????? ?????? ?????? ?????? ?????? ????????? ?????? ?????????????????? ???????????? ????????????. ?????????????????? ???????????? ?????? ?????????????????? ??????????????? ????????? ???????????? ???????????? ????????? ????????????.</p>
                <p>?????? ?????? ?????? ????????? ?????????????????? ???????????? ????????? ???????????????.</p>
            </OrderEnd>
        </Wrap>
    )
}
