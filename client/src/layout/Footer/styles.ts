import styled from "styled-components"

export const FooterMenu = styled.div`
    /* width : 1440px;
    margin : 0 auto; */
    ul{
        display: flex;
        margin-left: -15px;
        li{
            a{
                display: block;
                padding: 10px 15px;
                font-size: 16px;
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
    width : 1440px;
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
