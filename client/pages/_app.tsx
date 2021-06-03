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
            <div style={{ width: "1440px", margin: "0 auto" }}>
                <Header></Header>
                <Component {...pageProps} />
                <Footer></Footer>
            </div>
        </ThemeProvider>
    )
}

export default App