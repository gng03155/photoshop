import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetcherData } from '../../../util/fetcher';
import BoardList from '../../BoardComponents/BoardList';
import { Wrap } from './styles'


interface Props {
    userKey: string,
}

export default function UserBoardManager({ userKey }: Props) {


    const router = useRouter();

    const { data: userBoardList } = useSWR<string[] | undefined>(`board/user/${userKey}`, fetcherData, { revalidateOnMount: true, initialData: null });


    if (userBoardList === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>게시물관리</h2>
            <BoardList userKey={userKey} boardKeyList={userBoardList !== undefined ? Object.keys(userBoardList) : []} category="user" />
        </Wrap>
    )
}
