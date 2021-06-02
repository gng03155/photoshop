import React from 'react'

import { Wrap, Titlearea, Form, Label, Input, Find, Button } from "./styles"

export default function Login() {
    return (
        <div>
            <Wrap>
                <Titlearea>
                    <h2>로그인</h2>
                </Titlearea>
                <Form>
                    <Label>
                        <Input type="email" id="email" name="email" placeholder="아이디"></Input>
                    </Label>
                    <Label>
                        <Input type="password" id="password" name="password" placeholder="비밀번호"></Input>
                    </Label>
                </Form>
                <Find>
                    <ul>
                        <li><a href="#">아이디 찾기</a></li>
                        <li><a href="#">비밀번호 찾기</a></li>
                        <li><a href="#">회원가입</a></li>
                    </ul>
                </Find>
                <Button>로그인</Button>
            </Wrap>
        </div>
    )
}
