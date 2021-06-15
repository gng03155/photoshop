import React, { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import fb from '../../src/firebase';
import { fetcherData } from '../../src/util/fetcher'
import { BasketItem, BasketWrap, Wrap, ProductInfo, Quantity, OrderPrice, OrderButton, Modal } from './styles'

export default function Cart() {


    const [userKey, setUserKey] = useState("");

    const { data: cartList, revalidate: cartUpdate } = useSWR(`cart/${userKey}`, fetcherData, { revalidateOnMount: true, compare: (a, b) => { return false } });


    const ref = new Array(50).fill(0).map(() => { return useRef<HTMLInputElement>(null) })

    useEffect(() => {
        setUserKey(window.sessionStorage.getItem("uid"));
    }, [])

    useEffect(() => {
        if (cartList === undefined) {

        }
        console.log(cartList)
    }, [cartList])


    const onClickMinus = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const key = tg.id;
        const copy = { ...cartList };
        let num = Number(copy[key].num);
        if (num === 1) {
            return;
        }
        copy[key].num = Number(copy[key].num) - 1;
        fb.database().ref(`cart/${userKey}/${key}`).update(copy[key]);
        alert("수량이 변경되었습니다.")
        cartUpdate();

    }

    const onClickPlus = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const tg = e.target as HTMLAnchorElement;
        const key = tg.id;
        const copy = { ...cartList };
        let num = Number(copy[key].num);
        if (num >= 5) {
            return;
        }
        copy[key].num = Number(copy[key].num) + 1;
        fb.database().ref(`cart/${userKey}/${key}`).update(copy[key]);
        alert("수량이 변경되었습니다.")
        cartUpdate();
    }
    const onChangeAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {

        const changeMode = ref[0].current.checked ? true : false;

        ref.forEach((elem) => {
            if (elem.current !== null) {
                elem.current.checked = changeMode;
            }

        })
    }

    const onClickDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const isDelete = confirm("정말 삭제하시겠습니까?");
        if (!isDelete) {
            return;
        }

        const tg = e.target as HTMLAnchorElement;
        const key = tg.id;
        fb.database().ref(`cart/${userKey}/${key}`).remove();

        alert("삭제가 완료되었습니다.");
        cartUpdate();

    }

    const onClickSelectDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {


        const keyList = [];

        ref.forEach((elem, idx) => {
            if (elem.current !== null) {
                if (elem.current.checked) {
                    keyList.push(elem.current.id);
                    elem.current.checked = false;
                }

            }
        })

        if (keyList === undefined) {
            alert("선택된 항목이 없습니다.");
        } else {
            for (let key of keyList) {
                await fb.database().ref(`cart/${userKey}/${key}`).remove();
            }
            alert("삭제가 완료되었습니다.");
            cartUpdate();
        }

    }

    const onClickAllDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (cartList === null) {
            return;
        }
        const isDelete = confirm("등록된 장바구니 목록을 모두 비우시겠습니까?");
        if (!isDelete) {
            return;
        }
        fb.database().ref(`cart/${userKey}`).remove();
        alert("삭제가 완료되었습니다.");
        cartUpdate();
    }

    const tt = (e: any) => {
        e.preventDefault();
        console.log(ref);
    }


    // if (cartList === undefined) {
    //     return <div></div>
    // }

    return (
        <Wrap>
            <button onClick={tt}>테스트</button>
            <h2>장바구니</h2>
            <BasketWrap>
                <table>
                    <colgroup>
                        <col style={{ width: "4%" }} />
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "16%" }} />
                        <col style={{ width: "7%" }} />
                        <col style={{ width: "9%" }} />
                        <col style={{ width: "7%" }} />
                        <col style={{ width: "12%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th><input ref={ref[0]} type="checkbox" onChange={onChangeAllCheck} /></th>
                            <th>번호</th>
                            <th>상품정보</th>
                            <th>판매가</th>
                            <th>수량</th>
                            <th>적립금</th>
                            <th>배송구분</th>
                            <th>합계</th>
                            <th>주문관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(cartList !== undefined && cartList !== null) && Object.keys(cartList).map((id, idx) => {
                            return (
                                <tr key={idx}>
                                    <td> <input ref={ref[idx + 1]} id={cartList[id].key} type="checkbox" /></td>
                                    <td><span>{idx + 1}</span></td>
                                    <td>
                                        <ProductInfo>
                                            <div>
                                                <img src={cartList[id].thumbnail_src} alt="썸네일" />
                                            </div>
                                            <ul>
                                                <li><p>{cartList[id].name}</p></li>
                                                <li><p className="option">[옵션 : {cartList[id].option}]</p></li>
                                                <li>
                                                    <a>옵션 변경</a>
                                                    <Modal>
                                                        <h3>옵션 변경</h3>
                                                        <p>상품이름</p>
                                                        <div className="bar"></div>
                                                        <ul>
                                                            <li><span>상품옵션</span></li>
                                                            <li><label>컬러</label><select name="" id=""></select></li>
                                                            <li><label>사이즈</label><select name="" id=""></select></li>
                                                        </ul>
                                                        <div>
                                                            <button>변경</button>
                                                            <button>취소</button>
                                                        </div>
                                                    </Modal>
                                                </li>
                                            </ul>
                                        </ProductInfo>
                                    </td>
                                    <td><p>{cartList[id].price}</p></td>
                                    <td><Quantity>
                                        <ul>
                                            <li><a id={cartList[id].key} onClick={onClickMinus}></a></li>
                                            <li><input type="text" value={cartList[id].num} maxLength={2}
                                                readOnly /></li>
                                            <li><a id={cartList[id].key} onClick={onClickPlus}></a></li>
                                        </ul>
                                    </Quantity></td>
                                    <td><p>100원</p></td>
                                    <td><p>무료배송</p></td>
                                    <td><p>{cartList[id].price * cartList[id].num}원</p></td>
                                    <td className="state"><a id={cartList[id].key} onClick={onClickDelete}>삭제하기</a></td>
                                </tr>
                            )
                        })}
                        {cartList === null &&
                            <tr><td colSpan={9}>현재 장바구니에 등록된 상품이 없습니다!!</td></tr>
                        }
                    </tbody>
                </table>
                <div>
                    <button onClick={onClickSelectDelete}>선택삭제</button>
                    <button onClick={onClickAllDelete}>장바구니 비우기</button>
                </div>
            </BasketWrap>
            <OrderPrice>
                <table>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "50%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>총 상품금액</th>
                            <th>배송비</th>
                            <th>할인합계</th>
                            <th>총 결제금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{(cartList !== undefined && cartList !== null) && Object.keys(cartList).reduce(
                                (acc, cur) => {
                                    return acc + Number(cartList[cur].price) * Number(cartList[cur].num)
                                }, 0
                            )}원</td>
                            <td>0원</td>
                            <td>0원</td>
                            <td>{(cartList !== undefined && cartList !== null) && Object.keys(cartList).reduce(
                                (acc, cur) => {
                                    return acc + Number(cartList[cur].price) * Number(cartList[cur].num)
                                }, 0
                            )}원</td>
                        </tr>
                    </tbody>
                </table>
            </OrderPrice>
            <OrderButton>
                <button>전체 상품 주문</button>
                <button>선택 상품 주문</button>
            </OrderButton>
        </Wrap>
    )
}
