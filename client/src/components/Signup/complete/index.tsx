import { useRouter } from 'next/router';
import React from 'react'
import { Head, Section, Button } from "./styles"


interface Props {
    userData: {
        name: string,
        id: string,
        email: string,
    }

}
export default function Complete({ userData }: Props) {

    const router = useRouter();

    const onClickSuccess = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/");
    }

    return (
        <div>
            <div style={{ display: 'table', width: '100%' }}>
                <Head>
                    <p>회원가입이 완료되었습니다</p>
                    <span>{userData.name}</span>님은
                    <strong>[일반회원]</strong>회원이십니다.
                </Head>
            </div>
            <Section>
                <colgroup>
                    <col style={{ width: "80px" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>{userData.id}입니다.</td>
                    </tr>
                    <tr>
                        <th>이 름</th>
                        <td>{userData.name}입니다.</td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>{userData.email}입니다.</td>
                    </tr>
                </tbody>
            </Section>
            <Button onClick={onClickSuccess} >완료</Button>
        </div>
    )
}
