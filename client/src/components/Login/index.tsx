import React, { useCallback } from 'react'
import useSWR from "swr";
import { useRouter } from "next/router"

import { Wrap, Titlearea, Form, Label, Input, Find, Button } from "./styles"

import { fetcherData } from '../../util/fetcher';
import crypto from 'crypto';
import { SHA256 } from 'crypto-js';
import localFetcher from '../../util/localFetcher';


export default function Login() {

    const { data, error } = useSWR("users", fetcherData, { revalidateOnMount: true });

    const router = useRouter();

    const onSubmitLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const id = target["id"]["value"];
        const pswd = target["pswd"]["value"];

        const idHash = SHA256(id).toString();
        console.log(data);
        const key = Object.keys(data).find(key => key === idHash);
        const userInfo = data[key];
        if (!userInfo) {
            console.log("해당 아이디는 존재하지 않습니다.")
            return;
        } else {

            const pwHash = await new Promise((resolve, reject) => {
                crypto.pbkdf2(pswd, userInfo.salt, 1, 64, 'sha512', (err, key) => {
                    resolve(key.toString('base64'));
                });
            })

            if (pwHash === userInfo.pswd) {
                console.log("비밀번호가 일치합니다!");
                sessionStorage.setItem("uid", key);
                router.push("/");


            } else {
                alert("비밀번호가 일치하지 않습니다!");
            }
        }
    }, [data])


    return (
        <div>
            <Wrap>
                <Titlearea>
                    <h2>로그인</h2>
                </Titlearea>
                <Form onSubmit={(e) => onSubmitLogin(e)}>
                    <Label>
                        <Input type="text" id="id" placeholder="아이디"></Input>
                    </Label>
                    <Label>
                        <Input type="password" id="pswd" placeholder="비밀번호"></Input>
                    </Label>
                    <Find>
                        <ul>
                            <li><a href="#">아이디 찾기</a></li>
                            <li><a href="#">비밀번호 찾기</a></li>
                            <li><a href="#">회원가입</a></li>
                        </ul>
                    </Find>
                    <Button type="submit">로그인</Button>
                </Form>
            </Wrap>
        </div>
    )
}
