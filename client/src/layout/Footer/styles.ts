import styled from "styled-components"


export const Wrap = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    height : auto;
    overflow-y: hiddne;
`

export const FooterWrap = styled.footer`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 1260px;
    height: auto;
    margin : 0 auto;
    padding: 30px 20px;
    color : #111;
    
    @media (max-width : 1259px){
        width  : 100%;
    }

`

export const FooterBg = styled.div`
    position: absolute;
    width : 100vw;
    height : 100%;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background-color : #444;
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
                    font-size: 2vw;
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

export const CsBankInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    h3 {

    }
    div {
        margin: 10px 0px 10px 0;
    }
    div:last-child{
        margin-right: 0;
    }

    ${props => props.theme.media.tablet}{
        width: 100%;
        justify-content: space-between;
    }  

    ${props => props.theme.media.mobile}{
        flex-direction: column;
        div:first-child{
            align-self: flex-start;
        }
        div:last-child{
            align-self: flex-end;
        }
    }  
`

export const CScontent = styled.div`
    strong{
        font-size: 20px;
    }
    p{
        font-size : 16px;
    }
    span {
        font-size: 12px;
    }
`;

export const BANKcontent = styled.div`
    
    p{
        font-size : 16px;
    }
`;

export const CompanyInfo = styled.div`
    display: flex;
    justify-content: space-between;
    div{
        p {
            font-size: 14px;
            margin-top: 10px;
            color : #777;
        }
        span{
                font-size: 12px;
                margin-top: 5px;
                color : #666;
        }
    }
    div:last-child{
        margin : 0;
    }

    div:nth-child(1){
        width : 40%;
    }
    div:nth-child(2){
        width : 19.999%;
    }
    div:nth-child(3){
        width : 40%;
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
        & > div > p{
            font-size : 2vw;
        }
    }      
`;

export const Gap = styled.p`
    margin : 10px 0;
`
