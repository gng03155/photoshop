import React, { useState, useEffect } from "react";

import useSWR from "swr"
import Banner from '../src/components/Home/Banner';
import Section from '../src/components/Home/Section';

import fetcher from '../src/util/fetcher';
import localFetcher from '../src/util/localFetcher';

export default function Home() {

  const [userKey, setUserKey] = useState("");

  const { data, error } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcher, { revalidateOnMount: true });

  useEffect(() => {
    setUserKey(window.sessionStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    if (data)
      console.log(`${data.name}님의 로그인이 성공적으로 이루어졌습니다.`);
  }, [data]);

  return (
    <div className="container">
      <div>
        <Banner></Banner>
        <Section></Section>
      </div>
    </div>
  );
}

