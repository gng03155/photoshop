import moment from 'moment';
import React, { useState, useEffect, useCallback, useRef } from 'react'

import useSWR from 'swr';
import dynamic from "next/dynamic";

import fb from '../../firebase';
import { fetcherData } from '../../util/fetcher';

import { FileWrap, List } from "./styles"

//lightGallery
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const LightGallery = dynamic(
    () => {
        return import('lightgallery/react');
    },
    { ssr: false }
);

interface Props {
    boardKey: string
}

export default function FileList({ boardKey }: Props) {

    const { data: fileInfo } = useSWR(`board/file/${boardKey}`, fetcherData, { revalidateOnMount: true, initialData: null });

    useEffect(() => {
        console.log(fileInfo);
    }, [fileInfo])

    if (fileInfo === null) {
        return <div></div>
    }

    return (
        <FileWrap>
            <h3>첨부파일</h3>
            {(fileInfo !== undefined && fileInfo !== null) &&
                <LightGallery plugins={[lgZoom, lgThumbnail]}>
                    {fileInfo.map((value, idx) => {
                        return (
                            <a key={idx} data-src={value.url}>
                                <img src={value.url} />
                            </a>
                        )
                    })}
                </LightGallery>}
        </FileWrap>
    )
}
