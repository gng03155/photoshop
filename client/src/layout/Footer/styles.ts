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
    align-items: center;
    width : 1260px;
    height: auto;
    margin : 0 auto;
    padding: 30px 0px;
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
    ul{
        display: flex;
        li{
            position: relative;
            a{
                display: block;
                padding: 10px 15px;
                font-size: 16px;
                color : #111;
            }
        }
        li:after{
            position: absolute;
            content:"";
            width : 1px;
            height : 15px;
            background-color: #333;
            right: 0;
            top: 15px;
        }

        li:last-child:after{
            width : 0;
        }

        ${props => props.theme.media.tablet}{
            justify-content: space-between;
            li{

                a{
                    font-size: 2vw;
                }
            }
        }

        ${props => props.theme.media.mobile}{
            justify-content: space-between;
            li{

                a{
                    padding: 10px 4px;
                }
            }
            li:after{
                height : 15px;
                top: 12px;
            }
        }

    }
`;


export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width : 100%;
    border-top : 1px solid #555;

`;

export const CompanyInfo = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    
    & > div{
        display: flex;
        flex-direction: column;
        width : auto;
    }
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

    & > div:nth-child(1){
        margin-right: 50px;
    }
    & > div:nth-child(2){
        margin-right: 50px;
    }


    div.center_box{
        margin: 0 auto;
    }

    ${props => props.theme.media.desktop}{
        p{
            font-size : 12px;
        }
        span{
            font-size : 10px;
        }
        & > div:nth-child(1){
            margin-right: 15px;
        }
        & > div:nth-child(2){
            margin-right: 15px;
        }   
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
        justify-content: flex-start;
        & > div > p{
        }
        & > div > span{
        }
        && > div{
            margin : 0;
            /* width : 35%; */
        }
        & > div:nth-child(1){
            margin-right: 10%;
        }
        & > div:nth-child(2){
            margin-right: 10%;
        }   
    }      
`;

export const Gap = styled.p`
    margin : 10px 0;
`


export const CsBankInfo = styled.div`
    display: flex;
    h3 {

    }
    div {
        margin : 10px 0;
        margin-left : 50px;
    }
    div:last-child{
        margin-right: 0;
    }
    ${props => props.theme.media.desktop}{
        div{
            margin-left: 15px;
        }
    }
    ${props => props.theme.media.tablet}{
        width: 100%;
        justify-content: flex-start;
        div{
            margin-left: 0;
        }
        div:last-child{
            margin-left: 0;
        }
    }  

    ${props => props.theme.media.mobile}{
        flex-direction: column;
        div{
            margin-left: 0;
        }
    }  
`

export const CScontent = styled.div`
    strong{
        font-size: 16px;
    }
    p{
        font-size : 14px;
    }
    span {
        font-size: 12px;
    }

    ${props => props.theme.media.desktop}{
        h3{
            font-size: 16px;
        }
        strong{
            font-size: 14px;
        }
        p{

        }
    }
    ${props => props.theme.media.mobile}{
        h3{
            font-size: 20px;
        }
        strong{
            font-size: 18px;
        }
        p{
            font-size: 16px;
        }
    }  
`;

export const BANKcontent = styled.div`
    
    p{
        font-size : 14px;
    }
    ${props => props.theme.media.desktop}{
        p{
            font-size: 12px;
        }
    }
    ${props => props.theme.media.mobile}{
        p{
            font-size: 16px;
        }
    }  
`;