import React, { useEffect, useState } from 'react'
import { Modal } from './styles'

interface Props {
    x: number,
    y: number,
    optionList: {},
    onCloseModal: (e: any) => void,
    setIsModal: (flag: boolean) => void,
}
export default function OptionModal({ x, y, optionList, onCloseModal, setIsModal }: Props) {

    useEffect(() => {
        console.log(optionList);
    }, [])

    return (
        <div style={{}}>
            <Modal x={x} y={y}>
                <h3>옵션 변경</h3>
                <p>상품이름</p>
                <div className="bar"></div>
                <ul>
                    {/* <li><span>상품옵션</span></li>
                    <li>
                        <label>컬러</label>
                        <select id={cartList[].id} onChange={onChangeColor}>
                            <option value="">-필수 옵션을 선택해주세요.</option>
                            {Object.keys(optionList).length !== 0 && Object.keys(optionList[cartList[id].id]).map((color, idx) => {
                                return <option key={idx} value={color}>{color}</option>
                            })}
                        </select>
                    </li>
                    <li>
                        <label>사이즈</label>
                        <select>
                            <option value="">-필수 옵션을 선택해주세요.</option>
                            {isOption && Object.keys(optionList).length !== 0 && Object.keys(optionList[cartList[id].id]).map((color, idx) => {
                                return <option key={idx} value={color}>{color}</option>
                            })}
                        </select>
                    </li> */}
                </ul>
                <div>
                    <button>변경</button>
                    <button onClick={onCloseModal}>취소</button>
                </div>
            </Modal>
        </div>
    )
}


