import React, { useCallback, useState, Dispatch } from 'react'
import Router from "next/router";
import DaumPostcode from "react-daum-postcode";
import crypto from "crypto";
import SHA256 from 'crypto-js/sha256';


import { TitleArea, Table, IdBox, TextBox, AddressBox, PhoneBox, EmailBox, BirthBox, Button, PostWrap } from "./styles"

import fb from '../../../firebase';
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';
import { IUser } from '../../../types';

interface Props {
    userInfo?: IUser,
    setOverWrap?: Dispatch<boolean>,
}
export default function MemberForm({ userInfo, setOverWrap }: Props) {

    const [isAdress, setIsAdress] = useState(false);

    const [password, setPassWord] = useState("");

    const [zoneCode, setZoneCode] = useState<string>(userInfo !== undefined ? userInfo.adrs[0] : "");
    const [address, setAddress] = useState<string>(userInfo !== undefined ? userInfo.adrs[1] : "");

    const { data: userList } = useSWR<{ [key: string]: IUser } | undefined>(`/users`, fetcherData, { revalidateOnMount: true });

    const [postPos, setPostPos] = useState({ x: 0, y: 0 });


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


    const equalPw = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        if (tg.value !== password) {
            tg.nextElementSibling.classList.add("active")
        } else {
            tg.nextElementSibling.classList.remove("active")
        }
    }, [password])

    const overlapCheckId = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        const sibling = tg.nextElementSibling as HTMLSpanElement;
        const value = tg.value;
        let isOverlap = false;
        for (let key in userList) {
            if (userList[key].id === value) {
                isOverlap = true;
                break;
            }
        }
        if (isOverlap) {
            sibling.classList.add("active")
            sibling.innerText = "중복된 아이디 입니다.";
            setOverWrap(false);
        } else {
            sibling.classList.add("active")
            sibling.innerText = "사용 가능한 아이디 입니다.";
            setOverWrap(true);
        }
    }, [userList])

    const overlapCheckEmail = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        const sibling = tg.nextElementSibling as HTMLSpanElement;
        const value = tg.value;
        let isOverlap = false;
        for (let key in userList) {
            if (userList[key].email === value) {
                isOverlap = true;
                break;
            }
        }
        if (isOverlap) {
            sibling.classList.add("active")
            sibling.innerText = "중복된 이메일 입니다.";
            setOverWrap(false);
        } else {
            sibling.classList.add("active")
            sibling.innerText = "사용 가능한 이메일 입니다.";
            setOverWrap(true);
        }
    }, [userList])

    return (
        <div>
            <TitleArea><h3>기본 정보</h3></TitleArea>
            <Table>
                <colgroup>
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <IdBox>
                        <th className="req">아이디</th>
                        <td><input type="text" id="id" maxLength={12} pattern="^[a-zA-Z0-9]+$" title="아이디는 영문자,숫자로만 입력해주세요!" defaultValue={userInfo !== undefined ? userInfo.id : ""} disabled={userInfo !== undefined ? true : false} onBlur={overlapCheckId} /><span className="msg"></span></td>
                    </IdBox>
                    <TextBox>
                        <th className="req">비밀번호</th>
                        <td><input type="password" id="pswd" maxLength={16} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$" title="영문자/숫자/특수문자를 각 1개이상 포함해서 8~16자 내로 입력해주세요!" onBlur={e => { setPassWord(e.target.value) }} /></td>
                    </TextBox>
                    <TextBox>
                        <th className="req">비밀번호 확인</th>
                        <td><input type="password" id="checkpswd" maxLength={16} onBlur={equalPw} /><span className="msg">비밀번호가 일치 하지 않음!</span></td>
                    </TextBox>
                    <TextBox>
                        <th className="req">이름</th>
                        <td><input type="text" id="name" defaultValue={userInfo !== undefined ? userInfo.name : ""} disabled={userInfo !== undefined ? true : false} /></td>
                    </TextBox>
                    <AddressBox>
                        <th className="req">주소</th>
                        <td>
                            <ul>
                                <li>
                                    <input type="text" id="zone" value={zoneCode} placeholder="우편번호" disabled />
                                    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSearchAdress(e)}>주소검색</button>
                                </li>
                                <li><input type="text" id="adrs" value={address} placeholder="기본주소" disabled /></li>
                                <li><input type="text" id="adrs2" placeholder="상세 주소를 입력해주세요. (선택)" defaultValue={userInfo !== undefined ? userInfo.adrs[2] : ""} /></li>
                                {isAdress &&
                                    <PostWrap x={postPos.x} y={postPos.y}>
                                        <a onClick={onCloseAddress}><img src="/img/close.png" alt="닫기" /></a>
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
                        <th>일반전화</th>
                        <td>
                            <select id="phone1" defaultValue={userInfo !== undefined ? userInfo.phone[0] : "02"}>
                                <option value="02">02</option>
                                <option value="031">031</option>
                                <option value="032">032</option>
                                <option value="033">033</option>
                                <option value="041">041</option>
                                <option value="042">042</option>
                                <option value="043">043</option>
                                <option value="044">044</option>
                                <option value="051">051</option>
                                <option value="052">052</option>
                                <option value="053">053</option>
                                <option value="054">054</option>
                                <option value="055">055</option>
                                <option value="061">061</option>
                                <option value="062">062</option>
                                <option value="063">063</option>
                                <option value="064">064</option>
                                <option value="0502">0502</option>
                                <option value="0503">0503</option>
                                <option value="0504">0504</option>
                                <option value="0505">0505</option>
                                <option value="0506">0506</option>
                                <option value="0507">0507</option>
                                <option value="070">070</option>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="016">016</option>
                                <option value="017">017</option>
                                <option value="018">018</option>
                                <option value="019">019</option>
                                <option value="0508">0508</option>
                            </select>
                            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                            <input type="text" id="phone2" maxLength={4} pattern="^[0-9]+$" title="올바른 전화번호를 입력해주세요" defaultValue={userInfo !== undefined ? userInfo.phone[1] : ""} />
                            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                            <input type="text" id="phone3" maxLength={4} pattern="^[0-9]+$" title="올바른 전화번호를 입력해주세요" defaultValue={userInfo !== undefined ? userInfo.phone[2] : ""} />
                        </td>
                    </PhoneBox>
                    <PhoneBox>
                        <th className="req">휴대전화</th>
                        <td>
                            <select id="mobile1" defaultValue={userInfo !== undefined ? userInfo.mobile[0] : "010"}>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="016">016</option>
                                <option value="017">017</option>
                                <option value="018">018</option>
                                <option value="019">019</option>
                            </select>
                            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                            <input type="text" id="mobile2" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요" defaultValue={userInfo !== undefined ? userInfo.mobile[1] : ""} />
                            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                            <input type="text" id="mobile3" maxLength={4} pattern="^[0-9]+$" title="올바른 휴대번호를 입력해주세요" defaultValue={userInfo !== undefined ? userInfo.mobile[2] : ""} />
                        </td>
                    </PhoneBox>
                    <EmailBox>
                        <th className="req">이메일</th>
                        <td><input type="email" id="email" defaultValue={userInfo !== undefined ? userInfo.email : ""} disabled={userInfo !== undefined ? true : false} onBlur={overlapCheckEmail} /> <span className="msg"></span></td>
                    </EmailBox>
                </tbody>
            </Table>
            <TitleArea><h3>추가 정보</h3></TitleArea>
            <Table>
                <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <BirthBox>
                        <th>생년월일</th>
                        <td>
                            <ul>
                                <li>
                                    <input type="radio" name="birth_type" id="chk_birt1" defaultChecked={true} />
                                    <label htmlFor="chk_birt1">양력</label>
                                    <input type="radio" name="birth_type" id="chk_birt2" />
                                    <label htmlFor="chk_birt2">음력</label>
                                </li>
                                <li>
                                    <div><input type="text" id="year" maxLength={4} defaultValue={userInfo !== undefined ? userInfo.birth[0] !== undefined ? userInfo.birth[0] : "" : ""} />
                                        <label>년</label></div>
                                    <div><input type="text" id="month" maxLength={2} defaultValue={userInfo !== undefined ? userInfo.birth[1] !== undefined ? userInfo.birth[1] : "" : ""} />
                                        <label>월</label></div>
                                    <div><input type="text" id="day" maxLength={2} defaultValue={userInfo !== undefined ? userInfo.birth[2] !== undefined ? userInfo.birth[2] : "" : ""} />
                                        <label>일</label></div>
                                </li>
                            </ul>
                        </td>
                    </BirthBox>
                </tbody>
            </Table>
        </div>
    )
}
