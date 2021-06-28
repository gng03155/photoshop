import React from 'react'
import { MainWrap } from './styles'

interface Props {
    children: JSX.Element[],
}

export default function Wrap({ children }: Props) {
    return (
        <MainWrap>
            {children}
        </MainWrap>
    )
}
