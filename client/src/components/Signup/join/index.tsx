import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react'
import fb from '../../../firebase';
import MemberForm from '../../MemberComponents/MemberForm'
import crypto from "crypto";
import SHA256 from 'crypto-js/sha256';
import { Button } from './styles';
import moment from 'moment';
import useSWR from 'swr';
import { localFetcher } from '../../../util/localFetcher';

export default function Join() {

    const { data: load, mutate } = useSWR("load", localFetcher);
    const [isOverWrap, setIsOverWrap] = useState(false);
    const router = useRouter();

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //중복체크
        if (!isOverWrap) {
            alert("입력하신 ID와 Email을 확인해주세요.");
            return;
        }

        const target = e.target as HTMLTextAreaElement;

        const values = {
            name: target["name"]["value"] || null,
            pswd: target["pswd"]["value"] || null,
            checkpswd: target["checkpswd"]["value"] || null,
            id: target["id"]["value"] || null,
            adrs: [target["zone"]["value"] || null, target["adrs"]["value"] || null, target["adrs2"]["value"] || null],
            phone: [target["phone1"]["value"], target["phone2"]["value"] || null, target["phone3"]["value"] || null] || "",
            mobile: [target["mobile1"]["value"], target["mobile2"]["value"] || null, target["mobile3"]["value"] || null],
            email: target["email"]["value"] || null,
            birth: [target["year"]["value"] || null, target["month"]["value"], target["day"]["value"]],
            salt: "",
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            level: 1,
            mileage: 3000,
        }

        // 공백 및 비밀번호 체크
        const isEmpty = checkEmpty(values, target);
        if (isEmpty) {
            return;
        } else if (checkPassword(values.pswd, values.checkpswd)) {
            target["checkpswd"].focus();
            return;
        }
        mutate(true, false);
        const { hashId, hashPw, salt } = await pswdHashing(values.id, values.pswd);

        values.pswd = hashPw;
        values.salt = salt;
        values["key"] = hashId;
        delete values.checkpswd;

        await fb.database().ref(`users/${hashId}`).set(values)
            .then(() => {
                console.log("회원가입이 성공적으로 이루어졌습니다!");
            })
            .catch((err) => { console.error(err) });

        const data = {
            name: values.name,
            id: values.id,
            email: values.email,
        }

        window.sessionStorage.setItem("uid", hashId);
        mutate(false, false);

        router.push({
            pathname: "/member/signup",
            query: {
                name: "complete",
                data: JSON.stringify(data),
            }
        }, "/member/signup");

    }, [isOverWrap, router])

    const checkPassword = useCallback(
        (pswd, chpswd) => {
            if (pswd !== chpswd) {
                alert("비밀번호가 일치하지 않습니다.");
                return true;
            } else {
                return false;
            }
        },
        [],
    )

    const pswdHashing = useCallback(async (id, pw) => {
        const { hashId, hashPw, salt } = await new Promise((resolve, reject) => {
            let hashId, hashPw, salt = "";
            crypto.randomBytes(64, (err, buf) => {
                //salt는 생성하는 해시값 이외에 추가적인 암호화 값
                salt = buf.toString('base64');
                hashId = SHA256(id).toString();
                crypto.pbkdf2(pw, salt, 1, 64, 'sha512', (err, key) => {
                    hashPw = key.toString('base64');
                    resolve({ hashId, hashPw, salt });
                });
            });
        })
        return { hashId, hashPw, salt };
    }, [])

    const checkEmpty = useCallback((values, target) => {


        if (values.email === null) {
            alert("이메일을 입력해주세요!");
            target["email"].focus();
            return true;
        } if (values.mobile[1] === null) {
            target["mobile2"].focus();
            alert("휴대전화를 입력해주세요!");
            return true;
        } if (values.mobile[2] === null) {
            target["mobile3"].focus();
            alert("휴대전화를 입력해주세요!");
            return true;
        } if (values.adrs[1] === null) {
            target["adrs2"].focus();
            alert("주소를 입력해주세요!");
            return true;
        } if (values.name === null) {
            target["name"].focus();
            alert("이름을 입력해주세요!");
            return true;
        } if (values.pswd === null) {
            target["pswd"].focus();
            alert("비밀번호를 입력해주세요!");
            return true;

        } if (values.checkpswd === null) {
            target["checkpswd"].focus();
            alert("비밀번호를 입력해주세요!");
            return true;
        } if (values.id === null) {
            target["id"].focus();
            alert("아이디를 입력해주세요!");
            return true;
        }

        return false;

    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <MemberForm setOverWrap={setIsOverWrap} />
                <Button>가입하기</Button>
            </form>
        </div>
    )
}
