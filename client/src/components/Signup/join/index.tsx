import React, { useCallback, useState } from 'react'
import { TitleArea, Form, Table, IdBox, TextBox, AddressBox, PhoneBox, EmailBox, BirthBox, Button } from "./styles"

import DaumPostcode from "react-daum-postcode";

export default function Join() {

    const [isAdress, setIsAdress] = useState(false);

    const [zoneCode, setZoneCode] = useState("");
    const [address, setAddress] = useState("");

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
    const onSublit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        if (target["email"]["value"] === "") {
            alert("이메일을 작성해주세요!");
        }
    }, [])

    return (
        <div>
            <Form onSubmit={(e) => onSublit(e)}>
                <TitleArea><h3>기본 정보</h3></TitleArea>
                <Table>
                    <colgroup>
                        <col style={{ width: "100px" }} />
                        <col style={{ width: "auto" }} />
                    </colgroup>
                    <tbody>
                        <IdBox>
                            <th>아이디</th>
                            <td><input type="text" id="id" maxLength={12} onBlur={() => { }} /></td>
                        </IdBox>
                        <TextBox>
                            <th>비밀번호</th>
                            <td><input type="password" id="pswd" /></td>
                        </TextBox>
                        <TextBox>
                            <th>비밀번호 확인</th>
                            <td><input type="password" id="chekpswd" /></td>
                        </TextBox>
                        <TextBox>
                            <th>이름</th>
                            <td><input type="text" id="name" /></td>
                        </TextBox>
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
                            <th>일반전화</th>
                            <td>
                                <select id="phone1" >
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
                                <input type="text" id="phone2" maxLength={4} />
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <input type="text" id="phone3" maxLength={4} />
                            </td>
                        </PhoneBox>
                        <PhoneBox>
                            <th>휴대전화</th>
                            <td>
                                <select id="mobile1" id="mobile1">
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                </select>
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <input type="text" id="mobile2" maxLength={4} />
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <input type="text" id="mobile3" maxLength={4} />
                            </td>
                        </PhoneBox>
                        <EmailBox>
                            <th>이메일</th>
                            <td><input type="email" id="email" /></td>
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
                                        <input type="radio" name="chk_info" defaultChecked={true} />
                                        <label>양력</label>
                                        <input type="radio" name="chk_info" />
                                        <label>음력</label>
                                    </li>
                                    <li>
                                        <input type="text" maxLength={4} />
                                        <label>년</label>
                                        <input type="text" maxLength={2} />
                                        <label>월</label>
                                        <input type="text" maxLength={2} />
                                        <label>일</label>
                                    </li>
                                </ul>
                            </td>
                        </BirthBox>
                    </tbody>
                </Table>
                <Button type="submit">가입하기</Button>
            </Form>
        </div>
    )
}
