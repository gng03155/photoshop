import React from 'react'
import Agreement from '../src/components/Signup/agreement'
import Join from '../src/components/Signup/join'

export default function signup() {
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>회원가입페이지입니다.</h2>
            {/* <Agreement /> */}
            <Join />
        </div>
    )
}
