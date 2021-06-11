import React from 'react'

import { Table, PageNation } from "./styles"

export default function Board() {
    return (
        <div>
            <Table>
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>시간</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>시간</td>
                        <td>조회수</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>시간</td>
                        <td>조회수</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>시간</td>
                        <td>조회수</td>
                    </tr>
                </tbody>
            </Table>
            <PageNation>
                <ul>
                    <li><a>&lt;</a></li>
                    {[1, 2, 3].map((value) => {
                        return (<li key={value}><a>{value}</a></li>)
                    })}
                    <li><a>&gt;</a></li>
                </ul>
            </PageNation>
        </div>
    )
}
