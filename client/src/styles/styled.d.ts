import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        color: {

        };
        media: {
            desktop: string | undefined,
            tablet: string | undefined,
            mobile: string | undefined,
        }
    }
}