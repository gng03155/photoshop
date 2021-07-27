import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router';
import fb from '../../../firebase';
import MemberForm from '../MemberForm'
import crypto from "crypto";
import SHA256 from 'crypto-js/sha256';
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';
import { Button } from './styles';
import { localFetcher } from '../../../util/localFetcher';
import { IUser } from '../../../types';
interface Props {
    userKey: string,
}
export default function Member({ userKey }: Props) {

    const router = useRouter();

    const { data: userInfo } = useSWR<IUser | undefined>(`users/${userKey}`, fetcherData, { revalidateOnMount: true })

    const { data: load, mutate } = useSWR("load", localFetcher);

    const formRef = useRef<HTMLFormElement>(null)

    const [isOverWrap, setIsOverWrap] = useState(false);

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;

        const values = {
            id: target["id"]["value"] || null,
            pswd: target["pswd"]["value"] || null,
            checkpswd: target["checkpswd"]["value"] || null,
            adrs: [target["zone"]["value"] || null, target["adrs"]["value"] || null, target["adrs2"]["value"] || null],
            phone: [target["phone1"]["value"], target["phone2"]["value"] || null, target["phone3"]["value"] || null] || "",
            mobile: [target["mobile1"]["value"], target["mobile2"]["value"] || null, target["mobile3"]["value"] || null],
            email: target["email"]["value"] || null,
            birth: [target["year"]["value"] || null, target["month"]["value"], target["day"]["value"]],
            salt: "",
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
        delete values.checkpswd;

        await fb.database().ref(`users/${userKey}`).update({
            pswd: values.pswd,
            adrs: [values.adrs[0], values.adrs[1], values.adrs[2]],
            phone: [values.phone[0], values.phone[1], values.phone[2]],
            mobile: [values.mobile[0], values.mobile[1], values.mobile[2]],
            email: values.email,
            birth: values.birth,
            salt: values.salt,
        })

        mutate(false, false);

        router.push("/mypage/main");

    }, [])

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

    const pswdHashing = async (id, pw) => {
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
    }

    const checkEmpty = useCallback((values, target) => {

        if (values.pswd === null) {
            target["pswd"].focus();
            alert("비밀번호를 입력해주세요!");
            return true;
        }
        if (values.checkpswd === null) {
            target["checkpswd"].focus();
            alert("비밀번호를 입력해주세요!");
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
        }

        return false;

    }, [])

    const onClickDelete = async (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const isDelete = confirm("정말로 계정을 삭제하시겠습니까?");
        if (!isDelete) {
            return;
        }


        const target = formRef.current as HTMLFormElement;
        const values = {
            pswd: target["pswd"]["value"] || null,
            checkpswd: target["checkpswd"]["value"] || null,
        }


        // 공백 및 비밀번호 체크
        const isEmpty = checkEmpty(values, target);
        if (isEmpty) {
            return;
        } else if (checkPassword(values.pswd, values.checkpswd)) {
            target["checkpswd"].focus();
            return;
        }

        const pwHash = await new Promise((resolve, reject) => {
            crypto.pbkdf2(values.pswd, userInfo.salt, 1, 64, 'sha512', (err, key) => {
                resolve(key.toString('base64'));
            });
        })

        if (pwHash === userInfo.pswd) {
        } else {
            alert("비밀번호가 일치하지 않습니다!");
        }
    }

    const onClickCancel = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/mypage/main");
    }

    if (userInfo === undefined) {
        return <div></div>
    }

    return (
        <div>
            <form ref={formRef} onSubmit={onSubmit}>
                <MemberForm
                    userInfo={userInfo}
                    setOverWrap={setIsOverWrap}
                />
                <Button>
                    <button type="button" onClick={onClickCancel}>취소</button>
                    <button type="submit">회원정보수정</button>
                    <button type="button" onClick={onClickDelete}>회원탈퇴</button>
                </Button>
            </form>
        </div>
    )
}
