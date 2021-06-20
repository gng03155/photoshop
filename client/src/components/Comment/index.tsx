import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr';
import fb from '../../firebase';
import { fetcherData } from '../../util/fetcher';
import { CommentWrap, CommentWrite, CommentList, CommentInfo, CommentTop, CommentForm } from './styles'

interface Props {
    boardKey: string
}

export default function Comment({ boardKey }: Props) {

    const [userKey, setUserKey] = useState("");
    const { data: userInfo } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcherData, { revalidateOnMount: true });

    const { data: commentInfo, revalidate: commentUpdate } = useSWR(`board/comment/${boardKey}`, fetcherData, { revalidateOnMount: true, initialData: null });

    // const [comment, SetComment] = useState("");
    // const TEST = `<p>안녕<br />하<br />세 여<br /></p>`;

    useEffect(() => {
        console.log(window.sessionStorage.getItem("uid"));
        setUserKey(window.sessionStorage.getItem("uid"));
    }, []);

    const onSubmitComment = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tg = e.target as HTMLFormElement;
        const val = tg["comment"].value;
        console.log(val);
        if (val === "") {
            alert("댓글을 입력해주세요.");
            return;
        }
        const name = userInfo.name;
        const date = moment().format("YYYY-MM-DD HH:mm:ss");


        const lines = val.split("\n");
        let resultString = "<p>";
        for (let i = 0; i < lines.length; i++) {
            resultString += lines[i] + "</br>";
        }
        resultString += "</p>";
        const key = fb.database().ref().push().key;
        fb.database().ref(`board/comment/${boardKey}/${key}`).set({
            name,
            date,
            key,
            user_key: userKey,
            comment: resultString,
        }).then(() => { console.log("댓글 등록 성공"); })
            .catch(err => console.log(err));
        commentUpdate();
    }, [userInfo])

    if (commentInfo === null) {
        return <div></div>
    }

    return (
        <CommentWrap>
            <h3>전체 댓글 {commentInfo !== undefined ? Object.keys(commentInfo).length : 0}개</h3>
            {commentInfo !== undefined &&
                <CommentList>
                    {Object.keys(commentInfo).map((key, idx) => {
                        return (<CommentInfo key={idx}>
                            <CommentTop>
                                <strong>{commentInfo[key].name}</strong>
                                <span>{commentInfo[key].date}</span>
                                <a>삭제</a>
                            </CommentTop>
                            <CommentForm>
                                <div dangerouslySetInnerHTML={{ __html: commentInfo[key].comment }}></div>
                            </CommentForm>
                        </CommentInfo>)
                    })}
                </CommentList>}
            {userInfo !== undefined ? <CommentWrite>
                <ul>
                    <form onSubmit={e => onSubmitComment(e)}>
                        <li>
                            <label>이름 :</label>
                            <input value={userInfo?.name || ""} type="text" disabled />
                        </li>
                        <li>
                            <textarea name="comment"></textarea>
                            <button type="submit">등록</button>
                        </li>
                    </form>
                </ul>
            </CommentWrite> : <div><h3>로그인을 하시면 댓글을 등록하실 수 있습니다.</h3></div>}
        </CommentWrap>
    )
}
