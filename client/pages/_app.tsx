import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import { useEffect, useLayoutEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from 'next/router';

import Head from 'next/head'

import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';
import localFetcher from '../src/util/localFetcher';
import Loading from '../src/components/Loading';

import Wrap from "../src/layout/Wrap"

function App({ Component, pageProps }: AppProps) {

    const { data: localLoad } = useSWR("load", localFetcher);

    const router = useRouter();

    useEffect(() => {
        router.beforePopState(({ url, as }) => {
            console.log(router);
            router.reload();
            return false
        })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1" />
            </Head>
            <GlobalStyle></GlobalStyle>
            <SWRConfig value={{ revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false }}>
                {/* <div style={{ width: "1260px", minHeight: "100vh", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> */}
                <Wrap>
                    {localLoad && <Loading />}
                    <Header></Header>
                    <Component {...pageProps} />
                    <Footer></Footer>
                </Wrap>
                {/* </div> */}
            </SWRConfig>
        </ThemeProvider>
    )
}

export default App