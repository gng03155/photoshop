import React from 'react'
import { Head, Section, Button } from "./styles"

export default function Complete() {
    return (
        <div>
            <div style={{ display: 'table', width: '100%' }}>
                <Head>
                    <p>회원가입이 완료되었습니다</p>
                    <span>물음표</span>님은
                    <strong>[킹반회원]</strong>회원이십니다.
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
                        <td>입니다.</td>
                    </tr>
                    <tr>
                        <th>이 름</th>
                        <td>입니다.</td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>입니다.</td>
                    </tr>
                </tbody>
            </Section>
            <Button>완료</Button>
        </div>
    )
}
