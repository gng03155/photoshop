import React from 'react'

import Loader from "react-loader-spinner";

import { Wrap, LoaderWrap } from "./styles"

export default function Loading() {
    return (
        <Wrap>
            <LoaderWrap>
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={150}
                    width={150}
                />
                <h2>로딩중입니다. 잠시만 기다려주세요~!</h2>
            </LoaderWrap>
        </Wrap>
    )
}
