import styled from "styled-components"

export const SectionWrap = styled.section`
     width: 100%;
    
`

export const NewItem = styled.div`
    margin-bottom: 50px;
     h3{
        margin: 50px 0;
        font-size: 25px;
     }

     ul{
         display:flex ;
         justify-content: space-between;
         width: 100%;
         li{
            width: 23%;
         }
     }
    
`

export const BestItem = styled.div`
    margin-bottom: 50px;
     h3{
        margin: 50px 0;
        font-size: 25px;
     }

     ul{
         display:flex ;
         justify-content: space-between;
         flex-wrap: wrap;
         width: 100%;
         li{
            width: 23%;
            margin-bottom: 20px;
         }
     }
    
`

export const InteraciveImg = styled.div`
    position: relative;
    width:100vw;
    height : 480px;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
     img{
         position: absolute;
         left: 0;
         top: -1000px;
         width: 100%;
         height : 1000px;
     }

`


