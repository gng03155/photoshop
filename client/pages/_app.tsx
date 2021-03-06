import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import useSWR, { SWRConfig } from "swr";

import Head from 'next/head'
import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';
import { localFetcher } from '../src/util/localFetcher';
import Loading from '../src/components/Loading';

import Wrap from "../src/layout/Wrap"

function App({ Component, pageProps }: AppProps) {

    const { data: localLoad } = useSWR("load", localFetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false, refreshWhenOffline: false });

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