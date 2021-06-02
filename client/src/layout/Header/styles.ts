import styled from 'styled-components';

export const Content = styled.div`
    display : flex;
    width: 1440px;
    height: 100px;
    padding: 10px 0;
    margin: 0 auto;
    justify-content: flex-start;
    align-items : center;
    text-align: center;

    & > div {
        width: 33%;
    }

`;

export const LeftCategory = styled.div`
    ul {        
        display: flex;
        justify-content: flex-end;
        li{
            a {
                display: block;
                font-size : 20px;
                padding: 0px 10px;
            }
        }
    }
`;

export const Logo = styled.div`
    a {
        display: block;
        img{
            
        }
    }
`;

export const RightCategory = styled.div`
    ul {   
        display: flex;
        li{
            a {
                display: block;
                font-size : 20px;
                padding: 0px 10px;
            }
        }
    }
`;
