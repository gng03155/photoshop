import styled from "styled-components"

export const FooterWrap = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 100%;
    height : 300px;
    color : #111;

    &:before{
        position: absolute;
        left: 0;
        content: "";
        width : 100vw;
        height : 300px;
        background-color: #444;
        z-index: -1;
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
    ul{
        display: flex;
        margin-left: -15px;
        li{
            a{
                display: block;
                padding: 10px 15px;
                font-size: 16px;
                color : #111;
            }
        }
    }
`;

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


export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width : 100%;
    padding: 25px 0;
    margin : 0 auto;

    ${CScontent}, ${BANKcontent} {

        h3 {

        }
        div {
            margin: 10px 0;
            width: 200px;
            height: 2px;
            background: #ccc;
        }
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
`;

export const Gap = styled.p`
    margin : 10px 0;
`
