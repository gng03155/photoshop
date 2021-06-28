import { useRouter } from 'next/router';
import React from 'react'
import { Wrap, Maileage, Delivery, Menu } from "./styles"


export default function Main() {


    const router = useRouter();

    const onClickCategory = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        const tg = e.currentTarget as EventTarget & HTMLLIElement;
        const name = tg.dataset.name;
        console.log(name);
        router.push(`/mypage/${name}`);
        return;

    }

    return (
        <Wrap>
            <h2>마이페이지</h2>
            <Maileage>
                <ul>
                    <li>
                        <span>가용적립금</span>
                        <span>원</span>
                    </li>
                    <li>
                        <span>사용적립금</span>
                        <span>원</span>
                    </li>
                    <li>
                        <span>쿠폰</span>
                        <span>개</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>총 적립금</span>
                        <span>원</span>
                    </li>
                    <li>
                        <span>총 주문</span>
                        <span>원(회)</span>
                    </li>
                </ul>
            </Maileage>
            <h2>나의 주문처리 현황</h2>
            <Delivery>
                <ul>
                    <li className="item">
                        <p>입금전</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송준비중</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송중</p>
                        <strong>0</strong>
                    </li>
                    <li className="item">
                        <p>배송완료</p>
                        <strong>0</strong>
                    </li>
                    <li className="list">
                        <p>취소 : 0</p>
                        <p>교환 : 0</p>
                        <p>반품 : 0</p>
                    </li>
                </ul>
            </Delivery>
            <Menu>
                <ul>
                    <li data-name="order" onClick={onClickCategory}>
                        <div></div>
                        <strong>Order</strong>
                        <p>주문내역</p>
                        <span>고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.</span>
                    </li>
                    <li data-name="modify" onClick={onClickCategory}>
                        <div></div>
                        <strong>Profile</strong>
                        <p>회원정보</p>
                        <span>회원이신 고객님의 개인정보를 관리하는 공간입니다.</span>
                    </li>
                    <li data-name="like" onClick={onClickCategory}>
                        <div></div>
                        <strong>Wishlist</strong>
                        <p>관심상품</p>
                        <span>관심상품으로 등록하신 상품의 목록을 보여드립니다.</span>
                    </li>
                    <li data-name="board" onClick={onClickCategory}>
                        <div></div>
                        <strong>Board</strong>
                        <p>게시물 관리</p>
                        <span>고객님께서 작성하신 게시물을 관리하는 공간입니다.</span>
                    </li>
                    <li>
                        <div></div>
                        <strong>mileage</strong>
                        <p>적립금</p>
                        <span>적립금은 상품 구매 시 사용하실 수 있습니다.</span>
                    </li>
                    <li>
                        <div></div>
                        <strong>Coupon</strong>
                        <p>쿠폰</p>
                        <span>고객님이 보유하고 계신 쿠폰내역을 보여드립니다.</span>
                    </li>
                    <li>
                        <div></div>
                        <strong>Address</strong>
                        <p>배송 주소록 관리</p>
                        <span>자주 사용하는 배송지를 등록하고 관리하실 수 있습니다.</span>
                    </li>
                    <li>
                        <div></div>
                        <strong>Subscription</strong>
                        <p>정기배송 관리</p>
                        <span>고객님께서 신청하신 정기배송의 신청 정보 및 내역을 확인하실 수 있습니다.</span>
                    </li>
                </ul>
            </Menu>
        </Wrap>
    )
}
