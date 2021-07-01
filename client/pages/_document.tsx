import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from "styled-components";
interface IProps {
    styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<IProps> {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        );

        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }
    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}