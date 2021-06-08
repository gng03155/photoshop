import React, { useState, useEffect } from "react";

import useSWR from "swr"

import fetcher from '../src/util/fetcher';
import loadFetcher from '../src/util/loadFetcher';

export default function Home() {
  const { data: userKey, error: err } = useSWR("user", { revalidateOnMount: false, refreshInterval: 0 });
  const { data, error } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcher);

  useEffect(() => {
    console.log(userKey);
    console.log(data);
    console.log(`session : ${sessionStorage.getItem("uid")}`);

  }, [userKey, data]);

  return (
    <div className="container">
      <div>
        <span>{userKey} 적용 완료</span>
      </div>
    </div>
  );
}