import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import crypto from 'crypto';
import { SHA256 } from 'crypto-js';

import { fetcherData } from '../../../src/util/fetcher'
import { Button, Form, Wrap } from './styles'

import dynamic from 'next/dynamic';
import * as emailjs from 'emailjs-com'
import fb from '../../../src/firebase';
import router from 'next/router';

export default function MemberFind() {

    const { data: userList } = useSWR("users", fetcherData, { revalidateOnMount: true });

    const [email, setEamil] = useState("");

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (userList !== undefined) {
            console.log(userList);
        }
    }, [userList])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        let userKey = "";
        for (let user in userList) {
            if (userList[user].email === email) {
                userKey = user;
            }
        }

        if (userKey === "") {
            alert("존재하지 않는 이메일 주소입니다.");
            return;
        }


        const temp = Math.random().toString(36).slice(2);

        const { hashPw, salt } = await pswdHashing(temp);


        console.log(hashPw, salt);

        const user_id = userList[userKey]["id"].split("");
        user_id.splice(-1, 1, "*");
        await fb.database().ref(`users/${userKey}`).update({
            pswd: hashPw,
            salt: salt,
        }).then(() => { console.log(`users/${userKey} 데이터 수정 완료`) });

        const templateParams = {
            user_id: user_id.join(""),
            temp_pswd: temp,
            reply_to: "gng03155@naver.com"
        }
        emailjs.send("service_e6jvk2h", "template_525p953", templateParams, "user_sHb4QuKiFSeI36QJCwZX3").then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    }

    const pswdHashing = async (pw) => {
        const { hashPw, salt } = await new Promise((resolve, reject) => {
            let hashPw, salt = "";
            crypto.randomBytes(64, (err, buf) => {
                //salt는 생성하는 해시값 이외에 추가적인 암호화 값
                salt = buf.toString('base64');
                crypto.pbkdf2(pw, salt, 1, 64, 'sha512', (err, key) => {
                    hashPw = key.toString('base64');
                    resolve({ hashPw, salt });
                });
            });
        })
        return { hashPw, salt };
    }


    const onClickCancel = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const aa = router.back();
    }

    return (
        <Wrap>
            <h2>계정찾기</h2>
            <Form onSubmit={onSubmit}>
                <p className="lead">이메일 주소를 입력해 주세요</p>
                <p>회원 가입시 입력하신 이메일 주소를 입력하시면,</p>
                <p>해당 이메일로 아이디 및 임시 비밀번호를 보내드립니다.</p>
                <input type="email" value={email} onChange={(e) => { setEamil(e.target.value) }} placeholder="이메일 주소" />
                <Button>
                    <button type="submit">계정찾기</button>
                    <a onClick={onClickCancel}>취소</a>
                </Button>
            </Form>
        </Wrap >
    )
}
