import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import { useEffect, useLayoutEffect } from "react";
import useSWR from "swr";


import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';
import loadFetcher from '../src/util/loadFetcher';

function App({ Component, pageProps }: AppProps) {

    const { data } = useSWR("load", url => loadFetcher(url));
    const { data: userKey } = useSWR("user", loadFetcher);

    useEffect(() => {
        console.log(userKey);
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle></GlobalStyle>
            <div style={{ width: "1440px", margin: "0 auto" }}>
                <Header></Header>
                <Component {...pageProps} />
                <Footer></Footer>
            </div>
        </ThemeProvider>
    )
}

export default App