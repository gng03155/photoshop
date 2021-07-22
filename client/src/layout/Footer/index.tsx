import React from 'react'
import { Wrap, FooterWrap, FooterMenu, Content, CompanyInfo, CScontent, BANKcontent, Gap, CsBankInfo, FooterBg } from "./styles"
export default function Footer() {
    return (
        <Wrap>
            <FooterBg />
            <FooterWrap>
                <FooterMenu>
                    <ul>
                        <li><a>회사소개</a></li>
                        <li><a>이용약관</a></li>
                        <li><a>개인정보취급방침</a></li>
                        <li><a>이용안내</a></li>
                    </ul>
                </FooterMenu>
                <Content>
                    <CompanyInfo>
                        <div>
                            <p>Business License No</p>
                            <span>000-00-00000</span>
                            <p>E-commerce Permit</p>
                            <span>신고준비중</span>
                        </div>
                        <div>
                            <div className="center_box">
                                <p>Company</p>
                                <span>포토샵</span>
                                <p>CEO</p>
                                <span>WJS</span>
                            </div>
                        </div>
                        <div>
                            <p>Tel</p>
                            <span>010-1234-5678</span>
                            <p>Adress</p>
                            <span>000-000 사랑시 고백구 행복동</span>
                            <p>Personal Information Manager</p>
                            <span>홍길동</span>
                        </div>
                    </CompanyInfo>
                    <CsBankInfo>
                        <CScontent>
                            <h3>COSTOMER CENTER</h3>
                            <div></div>
                            <strong>010-1234-5678</strong><br />
                            <strong>070-1234-5678</strong>
                            <Gap></Gap>
                            <p>MON-FRI <span>AM 10:00 ~ PM 06:00</span></p>
                            <p>SAT-SUN HOLIDAY OFF</p>
                        </CScontent>
                        <BANKcontent>
                            <h3>BANK INFO</h3>
                            <div></div>
                            <p>국민 000000-00-000000</p>
                            <p>우리 0000-00-000000</p>
                            <p>신한 000-000-000000</p>
                            <Gap></Gap>
                            <p>예금주 홍길동</p>
                        </BANKcontent>
                    </CsBankInfo>
                </Content>
            </FooterWrap>
        </Wrap>
    )
}
