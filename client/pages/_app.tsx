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
import { useMediaQuery } from 'react-responsive';

function App({ Component, pageProps }: AppProps) {

    const { data: localLoad } = useSWR("load", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 1000 });
    const { data: user, revalidate } = useSWR("userKey", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false, refreshInterval: 1000 });

    const isMobile = useMediaQuery({ maxWidth: 480 });

    useEffect(() => {
        // window.addEventListener('load', function () {
        //     console.log("load 실행");
        //     document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
        //     setTimeout(() => window.scrollTo(0, 1), 100);
        // });
        // document.documentElement.requestFullscreen();
        // let vh = window.innerHeight * 0.01;
        // document.documentElement.style.setProperty("--vh", `${vh}px`);


    }, [])

    useEffect(() => {
        // if (isMobile) {
        //     window.document.body.style.width = "100%";
        //     window.document.body.style.height = "100%";
        //     window.document.body.style.overflowY = "hidden";
        //     window.document.documentElement.style.width = "100%";
        //     window.document.documentElement.style.height = "99.9%";
        //     window.document.documentElement.style.overflow = "hidden";
        // } else {
        //     window.document.body.style.width = "auto";
        //     window.document.body.style.height = "auto";
        //     window.document.body.style.overflowY = "visible";
        //     window.document.documentElement.style.width = "auto";
        //     window.document.documentElement.style.height = "auto";
        //     window.document.documentElement.style.overflow = "visible";
        // }
    }, [isMobile])

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