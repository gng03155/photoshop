import styled from "styled-components"

export const FooterWrap = styled.footer`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #444;
    width : 100%;
    height: auto;
    padding: 25px 0;
    color : #111;

    &:before{
        position: absolute;
        top: 0;
        left: -20%;
        content: "";
        width : 20%;
        height : 100%;
        background-color: #444;
        /* position: absolute;
        left: 0;
        content: "";
        width : 100vw;
        height : 300px;
        background-color: #444;
        z-index: -1; */
    }
    &:after{
        position: absolute;
        top: 0;
        right: -20%;
        content: "";
        width : 20%;
        height : 100%;
        background-color: #444;
        /* position: absolute;
        left: 0;
        content: "";
        width : 100vw;
        height : 300px;
        background-color: #444;
        z-index: -1; */
    } 

`

export const FooterBg = styled.div`
    position: absolute;
    width: 100vw;
    height : 300px;
    left: 0;
    top: 0;
    background: #333;
    z-index: -1;
`

export const FooterMenu = styled.div`
    width: 100%;
    ul{
        width: 100%;
        display: flex;
        li{
            a{
                display: block;
                padding: 10px 15px;
                font-size: 16px;
                color : #111;
            }
        }
        ${props => props.theme.media.tablet}{
            justify-content: space-between;
            li{

                a{
                    font-size: 12px;
                    padding: 0;
                }
            }
        }
    }
`;


export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width : 100%;

    ${props => props.theme.media.tablet}{
        justify-content: flex-start;
        flex-wrap: wrap;
    }        

`;

export const ContentWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width : 55%;
    h3 {

    }
    div {
        margin: 10px 0;
        width: 200px;
    }
`

export const CScontent = styled.div`
    
    strong{
        font-size: 20px;
    }
    p{
        font-size : 16px;
    }
`;

export const BANKcontent = styled.div`
    
    p{
        font-size : 16px;
    }
`;

export const CompanyInfo = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
    div{
        p {
            font-size: 16px;
            margin-top: 10px;
            span{
                font-size: 14px;
                margin-top: 5px;
            }
        }
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
    }      
`;

export const Gap = styled.p`
    margin : 10px 0;
`
