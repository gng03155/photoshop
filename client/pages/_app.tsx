import { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global-styles"
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

import Header from "../src/layout/Header"
import Footer from '../src/layout/Footer';

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle></GlobalStyle>
            <Header></Header>
            <Component {...pageProps} />
            <Footer></Footer>
        </ThemeProvider>
    )
}

export default App