import React, { useRef, useState, useEffect } from 'react'
import useSWR from 'swr';
import fb from '../../firebase';
import { nanoid } from 'nanoid'

import { Wrap, WishWrap, Button, None } from "./styles"
import { fetcherData } from '../../util/fetcher'
import ProductItem2 from '../ProductItem2'

interface Props {
    userKey: string,
}
export default function Wishlist({ userKey }: Props) {

    const { data: wishList, revalidate: wishUpdate } = useSWR(userKey ? `like/${userKey}` : "null", fetcherData, { revalidateOnMount: true, initialData: null, compare: (a, b) => { return false } });

    const [isEdit, setIsEdit] = useState(false);
    const [selList, setSelList] = useState([]);

    const ref1 = useRef<HTMLButtonElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLUListElement>(null);

    useEffect(() => {
    }, []);

    const onClickEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        ref1.current.style.display = "none"
        ref2.current.style.display = "block"
        setIsEdit(true);
    }

    const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        ref1.current.style.display = "inline-block"
        ref2.current.style.display = "none"
        const collection = ref3.current.children;
        Array.from(collection).forEach((node) => {
            if (node.tagName === "LI") {
                node.classList.remove("sel");
            }
        })
        setIsEdit(false);
    }

    const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const isDelete = confirm("정말 삭제하시겠습니까?");
        if (!isDelete) {
            return;
        } else {
            await fb.database().ref(`like/${userKey}`).once("value").then(async (data) => {
                let temp = data.val();
                selList.map((val) => {
                    const idx = temp.indexOf(val);
                    temp.splice(idx, 1);
                })
                await data.ref.set(temp).then(() => { console.log("좋아요 삭제 완료") });
            })
            setSelList([]);
            alert("수정이 완료되었습니다");
            wishUpdate();

        }
    }

    const onSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (!isEdit) {
            return;
        }
        const tg = e.currentTarget as HTMLLIElement;
        const id = tg.dataset.id;
        const copy = [...selList];
        console.dir(e);

        if (copy.includes(id)) {
            const i = copy.indexOf(id);
            copy.splice(i, 1);
            setSelList(copy);
            tg.className = "";
        } else {
            copy.push(id);
            setSelList(copy);
            tg.className = "sel";
        }
    }

    if (wishList === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <h2>좋아요</h2>
            {wishList !== undefined ?
                <WishWrap>
                    <ul ref={ref3}>
                        {wishList.map((item) => {
                            return (
                                <li key={item} data-id={item} onClick={onSelect}>
                                    <ProductItem2 productId={item} />
                                </li>
                            )
                        })}
                    </ul>
                    <Button>
                        <button ref={ref1} onClick={onClickEdit}>편집</button>
                        <div ref={ref2}>
                            <button onClick={onClickDelete}>삭제</button>
                            <button onClick={onClickCancel}>취소</button>
                        </div>
                    </Button>
                </WishWrap> :
                <None><h3>현재 등록된 상품이 없습니다~!</h3></None>
            }
        </Wrap>
    )
}
