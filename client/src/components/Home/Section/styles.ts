import styled from "styled-components"

export const SectionWrap = styled.section`
     width: 100%;
    
`

export const NewItem = styled.div`
   width : 100%;
    margin-bottom: 50px;
     h3{
        margin: 50px 0;
        font-size: 25px;
     }

     ul{
         width : 100%;
         display:flex ;
         justify-content: space-between;
         flex-wrap: wrap;
         width: 100%;
         & > li{
            width: 23%;
            margin-bottom: 20px;
         }
         ${props => props.theme.media.tablet}{
            li{
               width : 47%;
            }
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
         display:flex;
         justify-content: space-between;
         flex-wrap: wrap;
         width: 100%;
         & > li{
            width: 23%;
            margin-bottom: 20px;
         }
         ${props => props.theme.media.tablet}{
            li{
               width : 47%;
            }
         }
     }

    
`

export const InteractiveWrap = styled.div`
   width : 100%;
   height : 480px;
   overflow: hidden;
   ${props => props.theme.media.mobile}{
      height : 360px;
   }


`


export const InteraciveImg = styled.div`
    position : fixed;
    visibility: hidden;
    -webkit-transform: translateZ(0);
    top : 0;
    left: 0;
    width:100%;
    max-width: 100%;
    height : 480px;
    overflow: hidden;
    z-index: -1;
     a{
         position: absolute;
         left: 0;
         top: 0;
         width : 100%;
         height: 100vh;
         background: url("/img/louvre_desk.jpg") no-repeat;
         background-size: 100% 100%;
         cursor: default;
     }

     ${props => props.theme.media.mobile}{
        height : 360px;
       a{
         height : 100vh;
         background: url("/img/louvre_mob.jpg") no-repeat;
         background-size: 100% 100%;

      } 
   }
`


