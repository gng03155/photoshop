import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';

const sizes: { [key: string]: number } = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const theme: DefaultTheme = {
    media: {
        // 미디어 쿼리 정의
        desktop: customMediaQuery(sizes.desktop),
        tablet: customMediaQuery(sizes.tablet),
        mobile: customMediaQuery(sizes.mobile),
    },
};


export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;