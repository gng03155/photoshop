import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [text, setText] = useState<string>("자바스크립트");

  return (
    <div className="container">
      <div>
        <span>{text} 적용 완료</span>
      </div>
    </div>
  );
}