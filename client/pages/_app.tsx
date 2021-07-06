import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import { useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from 'next/router';

import Head from 'next/head'
import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';
import { localFetcher, init, setInit } from '../src/util/localFetcher';
import Loading from '../src/components/Loading';

import Wrap from "../src/layout/Wrap"

function App({ Component, pageProps }: AppProps) {

    const { data: localLoad } = useSWR("load", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 1000 });
    const { data: user, revalidate } = useSWR("userKey", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 1000 });

    useEffect(() => {
        // window.addEventListener('load', function () {
        //     setTimeout(scrollTo, 0, 0, 1);
        // });
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1" />
                <meta name="mobile-web-app-capable" content="no" />
                <meta name="apple-mobile-web-app-capable" content="no" />
            </Head>
            <GlobalStyle></GlobalStyle>
            <SWRConfig value={{ revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false }}>
                <Wrap>
                    {localLoad && <Loading />}
                    <Header></Header>
                    <Component {...pageProps} />
                    <Footer></Footer>
                </Wrap>
            </SWRConfig>
        </ThemeProvider>
    )
}

export default App