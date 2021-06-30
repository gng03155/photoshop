import React, { useEffect, useState, useRef, RefObject, MutableRefObject } from 'react'
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'
import useSWR from 'swr'

import { BasketWrap, Wrap, ProductInfo, Quantity, OrderPrice, OrderButton, Modal, MiniBasket, MiniHead, MiniContent, MiniSide, SideContent, MiniBox } from './styles'

import fb from '../../../src/firebase';
import { fetcherData } from '../../../src/util/fetcher'


interface Props {
    userKey: string,
}

export default function CartList({ userKey }: Props) {


    const router = useRouter();


    const { data: cartList, revalidate: cartUpdate } = useSWR(`cart/${userKey}`, fetcherData, { revalidateOnMount: true, initialData: null, compare: (a, b) => { return false } });

    const [optionList, setOptionList] = useState({});
    const [isModal, setIsModal] = useState(false);
    const [isOption, setIsOption] = useState(false);
    const [modalProps, setModalProps] = useState({ x: 0, y: 0, productId: "", cartKey: "" });

    const [selColor, setSelColor] = useState("");

    // const [ref, setRef] = useState<MutableRefObject<HTMLInputElement>[] | null>(null);
    // /[useRef<HTMLInputElement>(null)]
    const ref = new Array(50).fill(0).map(() => { return useRef<HTMLInputElement>(null) })

    const isTablet = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        if (cartList !== null && cartList !== undefined) {
            let keys = [];
            for (let key in cartList) {
                keys.push(cartList[key].id);
            }
            //중복된 id값 필터링
            const set = new Set(keys);
            const ids = Array.from(set);
            setStock(ids);
        }
    }, [cartList])

    const setStock = async (ids) => {
        const temp = {};

        for (let id of ids) {
            const option = await fb.database().ref(`products/stock/${id}`).get().then((data) => { return data.val(); });
            temp[id] = option;
        }

        setOptionList(temp);

    }

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
                }

            }
        })

        if (keyList.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
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

    const onClickOrder = (e: React.MouseEvent<HTMLButtonElement>) => {

        if (cartList === undefined) {
            alert("주문 가능한 상품이 없습니다.");
            return;
        }

        const tg = e.target as HTMLButtonElement;
        const name = tg.name;
        const copy = [];
        if (name === "all") {
            for (let key in cartList) {
                copy.push(cartList[key]);
            }
        } else if (name === "sel") {
            ref.forEach((elem, idx) => {
                if (elem.current !== null) {

                    if (elem.current.checked) {
                        copy.push(cartList[elem.current.id]);
                    }
                }
            })
            if (copy.length === 0) {
                alert("선택된 항목이 없습니다.")
                return;
            }
        }
        router.push({
            pathname: "/order",
            query: {
                data: JSON.stringify(copy),
            },
        }, `/order`);


    }


    const onSubmitOption = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsModal(false);
        setIsOption(false);

        const option1 = e.target[0].value as HTMLSelectElement;
        const option2 = e.target[1].value as HTMLSelectElement;
        if (option1.value === "" || option2.value === "") {
            alert("옵션을 선택해주세요");
        }


        const copy = { ...cartList };
        const key = modalProps.cartKey;
        copy[key].option = `${option1}/${option2}`;
        fb.database().ref(`cart/${userKey}/${key}`).update(copy[key]);
        alert("옵션이 수정되었습니다.")
        cartUpdate();
    }

    const openOptionModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        const tg = e.target as HTMLAnchorElement;

        const x = window.pageXOffset + tg.getBoundingClientRect().left;
        const y = window.pageYOffset + tg.getBoundingClientRect().top + tg.clientHeight;
        const id = tg.id;
        const key = tg.dataset.key;

        setIsModal(true);
        setModalProps({ x, y, productId: id, cartKey: key });

    }

    const onCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOption(false);
        setIsModal(false);
    }

    const onChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tg = e.target as HTMLSelectElement;

        const value = tg.value;

        if (value === "") {
            setIsOption(false);
            setSelColor("");
            return;
        }

        setIsOption(true);
        setSelColor(value);
    }



    if (cartList === null || ref === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>장바구니</h2>
            {isTablet ? <BasketWrap>
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
                                <tr key={cartList[id]["key"]}>
                                    <td> <input ref={ref[idx + 1]} id={cartList[id].key} type="checkbox" /></td>
                                    <td><span>{idx + 1}</span></td>
                                    <td>
                                        <ProductInfo>
                                            <div>
                                                <img src={cartList[id].thumb_src} alt="썸네일" />
                                            </div>
                                            <ul>
                                                <li><p>{cartList[id].name}</p></li>
                                                <li><p className="option">[옵션 : {cartList[id].option}]</p></li>
                                                <li>
                                                    <a id={cartList[id].id} data-key={cartList[id].key} onClick={openOptionModal}>옵션 변경</a>
                                                </li>
                                            </ul>
                                        </ProductInfo>
                                    </td>
                                    <td><p>{cartList[id].price}</p></td>
                                    <td>
                                        <Quantity>
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
                        {cartList === undefined &&
                            <tr><td colSpan={9}>현재 장바구니에 등록된 상품이 없습니다!!</td></tr>
                        }
                    </tbody>
                </table>
                <div>
                    <button onClick={onClickSelectDelete}>선택삭제</button>
                    <button onClick={onClickAllDelete}>장바구니 비우기</button>
                </div>
            </BasketWrap>
                :
                <MiniBasket>
                    <ul>
                        <li>
                            <MiniBox>
                                <div>
                                    <input ref={ref[0]} type="checkbox" onChange={onChangeAllCheck} />
                                    <label>전체 선택</label>
                                </div>
                                <div>
                                    <a>선택삭제</a>
                                    <a>전체삭제</a>
                                </div>
                            </MiniBox>
                        </li>
                        {(cartList !== undefined && cartList !== null) && Object.keys(cartList).map((id, idx) => {
                            return (
                                <li>
                                    <MiniHead>
                                        <input ref={ref[idx + 1]} id={cartList[id].key} type="checkbox" />
                                        <label>선택</label>
                                        <a id={cartList[id].key} onClick={onClickDelete}>X</a>
                                    </MiniHead>
                                    <MiniContent>
                                        <ProductInfo>
                                            <div>
                                                <img src={cartList[id].thumb_src} alt="썸네일" />
                                            </div>
                                            <ul>
                                                <li><p>{cartList[id].name}</p></li>
                                                <li><p className="option">[옵션 : {cartList[id].option}]</p></li>
                                                <li>
                                                    <a id={cartList[id].id} data-key={cartList[id].key} onClick={openOptionModal}>옵션 변경</a>
                                                </li>
                                                <li>
                                                    <Quantity>
                                                        <ul>
                                                            <li><a id={cartList[id].key} onClick={onClickMinus}></a></li>
                                                            <li><input type="text" value={cartList[id].num} maxLength={2}
                                                                readOnly /></li>
                                                            <li><a id={cartList[id].key} onClick={onClickPlus}></a></li>
                                                        </ul>
                                                    </Quantity>
                                                </li>
                                            </ul>
                                        </ProductInfo>
                                        <SideContent>
                                            <p>재고 5개 이상</p>
                                            <p>{cartList[id].price * cartList[id].num}원</p>
                                        </SideContent>
                                    </MiniContent>
                                    <MiniSide>
                                        <div>
                                            <span>배송비</span>
                                            <span>무료배송</span>
                                        </div>
                                        <div>
                                            <span>적립금</span>
                                            <span>100원</span>
                                        </div>
                                    </MiniSide>
                                </li>
                            )
                        })}
                    </ul>
                </MiniBasket>}
            <OrderPrice>
                <table>
                    <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "40%" }} />
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
                <button name="all" onClick={onClickOrder}>전체 상품 주문</button>
                <button name="sel" onClick={onClickOrder} >선택 상품 주문</button>
            </OrderButton>
            {isModal &&
                <Modal x={modalProps.x} y={modalProps.y}>
                    <form onSubmit={onSubmitOption}>
                        <h3>옵션 변경</h3>
                        <p>상품이름</p>
                        <div className="bar"></div>
                        <ul>
                            <li><span>상품옵션</span></li>
                            <li>
                                <label>컬러</label>
                                <select defaultValue="" onChange={onChangeColor}>
                                    <option value="">-필수 옵션을 선택해주세요.</option>
                                    {Object.keys(optionList[modalProps.productId]).map((option, idx) => {
                                        return <option key={idx} value={optionList[modalProps.productId][option]["name"]}>{optionList[modalProps.productId][option]["name"]}</option>
                                    })}
                                </select>
                            </li>
                            <li>
                                <label>사이즈</label>
                                <select defaultValue="">
                                    <option value="">-필수 옵션을 선택해주세요.</option>
                                    {isOption && Object.keys(optionList[modalProps.productId]).map((option, idx) => {
                                        if (optionList[modalProps.productId][option]["name"] === selColor) {
                                            return Object.keys(optionList[modalProps.productId][option]).map((sub, idx) => {
                                                if (idx === 0 || sub === "name") {
                                                } else {
                                                    return <option key={idx} value={optionList[modalProps.productId][option][sub]["name"]}>{optionList[modalProps.productId][option][sub]["name"]} 남은재고 {optionList[modalProps.productId][option][sub]["num"]}</option>
                                                }
                                            })
                                        } else {
                                        }
                                    })}
                                </select>
                            </li>
                        </ul>
                        <div>
                            <button type="submit">변경</button>
                            <button onClick={onCloseModal}>취소</button>
                        </div>
                    </form>
                </Modal>}
        </Wrap >
    )
}
