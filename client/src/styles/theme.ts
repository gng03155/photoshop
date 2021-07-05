import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';



const sizes: { [key: string]: number } = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
};

// const media = {
//   desktop: (...args) => undefined,
//   tablet: (...args) => undefined,
//   phone: (...args) => undefined,
// };

// Object.keys(sizes).reduce((acc, label: string) => {
//   acc[label] = (...args) => CSS`
//     @media (max-width: ${sizes[label]}px) {
//       ${CSS(args.shift(), ...args)}
//     }
//   `;
//   return acc;
// },media);

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const theme: DefaultTheme = {
    color: {
    },
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