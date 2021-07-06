import React, { useCallback } from 'react'
import useSWR from "swr";
import { useRouter } from "next/router"

import crypto from 'crypto';
import { SHA256 } from 'crypto-js';

import { Wrap, Titlearea, Form, Label, Input, Find, Button } from "./styles"

import { fetcherData } from '../../util/fetcher';
import { localFetcher, setInit } from '../../util/localFetcher';
import Link from 'next/link';
import { IUser } from '../../types';


export default function Login() {

    const { data: user, mutate } = useSWR("userKey", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 0 });

    const { data, error } = useSWR<{ [key: string]: IUser } | undefined>("users", fetcherData, { revalidateOnMount: true });
    const router = useRouter();

    const onSubmitLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const id = target["id"]["value"];
        const pswd = target["pswd"]["value"];

        const idHash = SHA256(id).toString();
        const key = Object.keys(data).find(key => key === idHash);
        const userInfo = data[key];
        if (!userInfo) {
            alert("해당 아이디는 존재하지 않습니다.")
            return;
        } else {

            const pwHash = await new Promise((resolve, reject) => {
                crypto.pbkdf2(pswd, userInfo.salt, 1, 64, 'sha512', (err, key) => {
                    resolve(key.toString('base64'));
                });
            })

            if (pwHash === userInfo.pswd) {
                sessionStorage.setItem("uid", key);
                router.back();
                return;
            } else {
                alert("비밀번호가 일치하지 않습니다!");
                return;
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
                    <Input type="text" id="id" placeholder="아이디"></Input>
                    <Input type="password" id="pswd" placeholder="비밀번호"></Input>
                    <Find>
                        <ul>
                            <li><Link href="/member/find"><a href="#">계정찾기</a></Link></li>
                            <li><span>/</span></li>
                            <li><a href="#">회원가입</a></li>
                        </ul>
                    </Find>
                    <Button type="submit">로그인</Button>
                </Form>
            </Wrap>
        </div>
    )
}
