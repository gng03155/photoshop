# PHOTOSHOP
## Info

>React + Next.js + Typescript 기반으로 개발된 프로젝트</br>
>Next.js + SWR을 활용한 SSR 프로젝트</br>
>Firebase의 Realtime database , storage를 사용해서 백엔드 구축</br>
>반응형 작업 완료</br>
>Vercel로 배포 했습니다.

## Install
```
//client dir
npm install
npm run dev
```
## 구조
```
root                   			 
│
├── page              
|     ├──root
|     ├──article
|     ├──board
|     ├──cart
|     ├──category
|     ├──member
|     ├──mypage
|     ├──order
|     └──product
|
├── components              
|     ├──BoardComponents
|     ├──Cart
|     ├──Home
|     ├──Loading
|     ├──MemberComponenets
|     ├──MypageComponents
|     ├──PageNation
|     ├──Signup
|     └──ProductComponents
|
├── layout             
│     ├── Wrap
│     ├── Header       
│     └── Footer             
|
├── styles                 
│     ├── global-styles.ts
│     ├── styled.ts
│     ├── theme-components.ts
│     └── theme.ts   
|
├── utill              
|     ├──fetcher.tsx
|     └──localFetcher.tsx
|
├── firebase
|
└── Index.tsx
```
## 사용 기술 스택
React , Typescript , Redux , Redux-thunk , express , puppeteer

## 실행화면
![photo_mark](https://user-images.githubusercontent.com/73515375/127759277-d0c79f93-4ff0-48c3-9ed4-9b5d76f2356f.gif)
## 개발 이슈
>[Notion](https://www.notion.so/photoshop-2c6ae95cf7024776b252071dc1c1b550 , "notion link")
