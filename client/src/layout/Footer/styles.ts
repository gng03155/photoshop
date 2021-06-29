import styled from "styled-components"


export const Wrap = styled.div`
    position: absolute;
    width: 100%;
    max-width: 100%;
    left: 0;
    /* bottom: 0; */
    /* height : auto; */
    background-color: #444;
`

export const FooterWrap = styled.footer`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #444;
    width : 1260px;
    height: auto;
    margin : 0 auto;
    padding: 30px 20px;
    color : #111;
    
    @media (max-width : 1259px){
        width  : 100%;
    }

`

// export const FooterBg = styled.div`
//     position: absolute;
//     width: 100vw;
//     height : 300px;
//     left: 0;
//     top: 0;
//     background: #333;
//     z-index: -1;
// `

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
                    font-size: 1.2vw;
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
        margin-right: 20px;
        p {
            font-size: 16px;
            margin-top: 10px;
            span{
                font-size: 14px;
                margin-top: 5px;
            }
        }
    }
    div:last-child{
        margin : 0;
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
        & > div > p{
            font-size : 1.5vw;
        }
    }      
`;

export const Gap = styled.p`
    margin : 10px 0;
`
