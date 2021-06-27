import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import { useEffect, useLayoutEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from 'next/router';

import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';
import localFetcher from '../src/util/localFetcher';
import Loading from '../src/components/Loading';

function App({ Component, pageProps }: AppProps) {

    const { data: localLoad } = useSWR("load", localFetcher);

    const router = useRouter();

    useEffect(() => {
        router.beforePopState(({ url, as }) => {
            router.reload();
            console.log('뒤로가기누름!!');
            return true
        })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle></GlobalStyle>
            <div style={{ width: "1260px", minHeight: "100vh", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <SWRConfig value={{ revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false }}>
                    {localLoad && <Loading />}
                    <Header></Header>
                    <Component {...pageProps} />
                    <Footer></Footer>
                </SWRConfig>
            </div>
        </ThemeProvider>
    )
}

export default App