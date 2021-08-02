import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fb from '../../../firebase';
import { fetcherData } from '../../../util/fetcher';
import FileList from '../FileList';
import { Button, Table } from './styles'
import { IBoard } from '../../../types';

interface Props {
    boardKey: string,
    userKey: string,
}

export default function BoardRead({ boardKey, userKey }: Props) {
    const router = useRouter();


    const [isUser, setIsUser] = useState(false);

    const { data: boardInfo } = useSWR<IBoard | undefined>(boardKey ? `board/board_list/${boardKey}` : "null", fetcherData, { revalidateOnMount: true });

    useEffect(() => {
        if (boardInfo !== undefined) {
            if (boardInfo.user_info.key === userKey) {
                setIsUser(true);
            }
        }
    }, [boardInfo, userKey])

    const onClickDelete = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const isDelete = confirm("정말로 삭제하시겠습니까?");
        if (!isDelete) {
            return;
        } else {
            await fb.database().ref(`board/board_list/${boardKey}`).remove().then(() => { console.log(`board/board_list/${boardKey} 데이터 삭제완료`) });
            const copy = await fb.database().ref(`board/category/${boardInfo.category}/`).once("value").then((data) => {
                if (data.exists())
                    return data.val()
                else { return [] }
            })
            const idx = copy.indexOf(boardKey);
            copy.splice(idx, 1);
            await fb.database().ref(`board/category/${boardInfo.category}`).set(copy).then(() => { console.log(`board/category/${boardInfo.category}/${boardKey} 데이터 삭제 완료`) });

            await fb.database().ref(`board/comment/${boardKey}`).remove().then(() => { console.log(`board/comment/${boardKey} 데이터 삭제 완료`) });

            await fb.database().ref(`board/file/${boardKey}`).remove().then(() => { console.log(`board/file/${boardKey} 데이터 삭제 완료`) });

            await fb.storage().ref(`file/${boardKey}`).listAll().then((res) => {
                for (let i of res.items) {
                    i.delete().then(() => { "`file/${boardKey}` 데이터 삭제 완료" });
                }
            }).catch(() => { console.log("파일없음") });

            router.push({
                pathname: `/board/${boardInfo.category}/`,
            })
        }
    }, [fb, boardKey, boardInfo, router])

    const onClickEdit = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (router.query.product) {
            router.push({
                pathname: `/board/${boardInfo.category}/modify/${boardKey}`,
                query: {
                    product: router.query.product,
                }
            });
        } else {
            router.push({
                pathname: `/board/${boardInfo.category}/modify/${boardKey}`,
            });
        }
    }, [router, boardInfo, boardKey])

    const onClickbList = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push({
            pathname: `/board/${boardInfo.category}/`,
        })
    }, [router, boardInfo])

    if (boardInfo === undefined) {
        return <div></div>
    }

    return (
        <div>
            <Table>
                <colgroup>
                    <col style={{ width: 150 }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td className="title">{boardInfo.title}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td className="title">{boardInfo.user_info.name}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="some">
                                <strong>작성일</strong>
                                <span>{boardInfo.date}</span>
                                <strong>조회수</strong>
                                <span>{boardInfo.hits}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="desc">
                                <div dangerouslySetInnerHTML={{ __html: boardInfo.content }}></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <FileList boardKey={boardKey} />
            <Button>
                <button onClick={onClickbList}>목록</button>
                {isUser && <div>
                    <button onClick={onClickEdit}>수정</button>
                    <button onClick={onClickDelete}>삭제</button>
                </div>}
            </Button>
        </div>
    )
}
