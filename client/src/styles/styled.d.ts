import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        media: {
            desktop: string | undefined,
            tablet: string | undefined,
            mobile: string | undefined,
        }
    }
}