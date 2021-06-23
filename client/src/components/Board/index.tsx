import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from 'ckeditor4-react';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import moment from 'moment';

import { Wrap, BoardWrap, Title, SubContent, File, PassWord, Button, ItemWrap } from "./styles"
import fb from '../../firebase';
import { fetcherData } from '../../util/fetcher';
import ProductItem2 from '../ProductItem2';
import localFetcher from '../../util/localFetcher';
// import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import('../../src/components/test'), {
//   ssr: false
// })

interface Props {
    boardKey?: string,
    category?: string,
    productId?: string,
    userKey: string,
}
export default function Board({ boardKey, category, productId, userKey }: Props) {

    const router = useRouter();


    const { data: userInfo, error } = useSWR(`${userKey ? `/users/${userKey}` : 'null'}`, fetcherData, { revalidateOnMount: true });

    const { data: productList } = useSWR(category === ("review" || "qna") ? `/products/product` : "null", fetcherData, { revalidateOnMount: true, initialData: null });
    const { data: boardInfo } = useSWR(boardKey ? `board/board_list/${boardKey}` : "null", fetcherData, { revalidateOnMount: true, initialData: null });
    const { data: fileInfo } = useSWR(boardKey ? `board/file/${boardKey}` : "null", fetcherData, { revalidateOnMount: true, initialData: null });

    const { data: load, mutate } = useSWR("load", localFetcher);

    const [product, setProduct] = useState(productId);

    const [data, setData] = useState("");


    const [fileName, setFileName] = useState(["파일을 선택해주세요", "파일을 선택해주세요", "파일을 선택해주세요"]);
    const [changeFiles, setChangeFiles] = useState([false, false, false]);

    const fileRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    }, [])

    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (fileInfo !== undefined && fileInfo !== null) {
            const copy = [...fileName];
            fileInfo.forEach((value, idx) => {
                copy[idx] = value.name;
            })
            setFileName(copy);
        };
    }, [fileInfo])



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        mutate(true, false);
        const tg = e.target as HTMLFormElement;
        const radios = tg["radio"] as HTMLInputElement[];
        let type = "";
        radios.forEach((elem) => {
            if (elem.checked) {
                type = elem.id;
            }
        })

        const info = {
            title: (tg["Title"] as HTMLInputElement).value,
            content: data,
            pswd: (tg["pswd"] as HTMLInputElement).value,
            type,
        }
        if (boardKey) {
            info["fileList"] = tg["file"];
            info["key"] = boardInfo.id;
            await editBoard(info);
        } else {
            info["date"] = moment().format("YYYY-MM-DD HH:mm:ss")
            info["key"] = fb.database().ref(`board`).push().key;
            info["fileList"] = getFiles(tg);
            await writeBoard(info);
        }
        mutate(false, false);
        router.back();

    }

    const getFiles = (tg) => {
        //첨부파일 확인 및 가져오기
        const fileList: any = Array.from(tg["file"]).reduce((prev: File[], cur: HTMLInputElement) => {
            if (cur.files[0] !== undefined) {
                prev.push(cur.files[0])
                return prev;
            }
            return prev;
        }, []);

        return fileList;
    }

    const editBoard = async (info) => {
        const copy = { ...boardInfo };

        copy.title = info.title;
        copy.content = info.content;
        copy.pswd = info.pswd;
        copy.type = info.type;


        let idx = 0;
        for (let value of changeFiles) {
            if (value === false) {
                idx++;
                continue;
            } else {
                let fileCopy = {};
                const filePath = `file/${info.key}/${idx}`;
                if (fileInfo[idx] !== undefined) {
                    await fb.storage().ref(filePath).delete().then(() => { console.log("삭제성공") });
                }
                await fb.storage().ref(filePath).put(info.fileList[idx].files[0]).then(async (event) => {
                    await event.ref.getDownloadURL().then((url) => {
                        fileCopy = {
                            url,
                            name: info.fileList[idx].files[0].name,
                        }
                    });
                });

                fb.database().ref(`board/file/${info.key}/${idx}`).set(fileCopy).then((snapshot) => {
                    console.log("파일 업데이트 성공");
                })
                idx++
            }

        }

        await fb.database().ref(`board/board_list/${info.key}`).update(copy).then(() => { console.log("게시물 업데이트 성공") });
    }

    const writeBoard = async (info) => {
        if (info.fileList.length !== 0) {
            let fileCopy = [];
            for (let file of info.fileList) {
                const filePath = `file/${info.key}/${fileCopy.length}`;
                await fb.storage().ref(filePath).put(file).then(async (event) => {
                    await event.ref.getDownloadURL().then((url) => {
                        fileCopy.push({
                            url,
                            name: file.name,
                        })
                    });
                });
            }
            fb.database().ref(`board/file/${info.key}`).set(fileCopy).then((snapshot) => {
                console.log("성공");
            })
        }

        //전체 게시글 갯수 받기
        const length = await fb.database().ref(`board/board_list`).once("value").then((snapshot) => {
            if (snapshot.val() === null) {
                return 0;
            }
            return Object.keys(snapshot.val()).length;
        })
        //카테고리 리스트 받기
        const copy = await fb.database().ref(`board/category/${category}`).once("value").then((snapshot) => {
            if (snapshot.val() === null) {
                return [];
            }
            return snapshot.val();
        })

        copy.push(info.key);

        let idx = 1;
        if (length > 0) {
            idx = length + 1;
        }

        const board = {
            id: info.key,
            num: idx,
            category,
            title: info.title,
            content: info.content,
            date: info.date,
            hits: 0,
            user_info: {
                name: userInfo.name,
                id: userInfo.id,
                key: userKey,
            },
            type: info.type,
            pswd: info.pswd,
        }
        if (category === "qna" || category === "review") {
            board["product_info"] = {
                id: product,
                name: productList[product]["name"],
            };
            await fb.database().ref(`products/${category}/${product}`).once("value").then((snapshot) => {
                if (snapshot.exists()) {
                    const copy = snapshot.val();
                    console.log(copy);
                    copy.push(info.key);
                    snapshot.ref.set(copy).then(() => { console.log(`products/${category}/${product} 데이터 저장 완료`) });
                } else {
                    const copy = [info.key];
                    snapshot.ref.set(copy).then(() => { console.log(`products/${category}/${product} 데이터 저장 완료`) });
                }
            })
        }
        console.log(board);

        await fb.database().ref(`board/board_list/${info.key}`).set(board).then((snapshot) => {
            console.log("성공");
        })
        await fb.database().ref(`board/category/${category}`).set(copy).then((snapshot) => {
            console.log("성공");
        })
            .catch(err => { console.log(err) });
    }

    const onChangePswd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        const id = tg.id;
        // console.log(passRef.current);
        if (id === "public") {
            passRef.current.disabled = true;
        } else if (id === "private") {
            passRef.current.disabled = false;
        }
        passRef.current.value = "";

    }

    const onChangeProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const tg = e.target as HTMLSelectElement;
        const val = tg.value;
        if (val === "none") {
            return;
        }
        setProduct(val);
    }

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tg = e.target as HTMLInputElement;
        const idx = tg.dataset.idx;
        const name = tg.files[0].name;
        console.log(tg);
        const copy = [...fileName];
        copy[idx] = name;
        setFileName(copy)
        const ccopy = [...changeFiles];
        ccopy[idx] = true;
        setChangeFiles(ccopy);
    }

    const onClickFile = (e) => {
        if (boardKey) {
            return;
        }

        if (fileRef.current.files[0] === undefined) {
            e.preventDefault();
            alert("첨부파일 1은 필수입니다!!");
        }
    }

    if (boardInfo === null || fileInfo === null || productList === null) {
        return <div></div>
    }

    return (
        <Wrap>
            <form onSubmit={(e) => onSubmit(e)}>
                <BoardWrap>
                    <h2>게시글 작성</h2>
                    {(category === "review" || category === "qna") &&
                        <ItemWrap>
                            <ProductItem2 productId={product} />
                            <select onChange={onChangeProduct}>
                                <option value="none">-----상품 선택-----</option>
                                {productList && Object.keys(productList).map((item, idx) => {
                                    return (
                                        <option key={productList[item]["id"]} value={productList[item]["id"]}>{productList[item]["name"]}</option>
                                    )
                                })}
                            </select>
                        </ItemWrap>}
                    <Title>
                        <label>제목</label>
                        <input name="Title" type="text" defaultValue={boardInfo !== undefined ? boardInfo.title : ""} required />
                    </Title>
                    <CKEditor
                        editorUrl='//cdn.ckeditor.com/4.16.1/full/ckeditor.js'
                        onSetData={(e) => {
                            if (boardKey) {
                                e.data.dataValue = boardInfo.content;
                            } else {
                                e.data.dataValue = "";
                            }
                        }}
                        onChange={(evt) => { setData(evt.editor.getData()) }}
                        config={{
                            toolbar: [
                                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                                { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
                                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
                                { name: 'colors', items: ['TextColor', 'BGColor'] },
                                { name: 'clipboard', items: ['Undo', 'Redo'] },
                                { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                                '/',
                                '/',
                            ],
                            removeButtons:
                                'Find,SelectAll,Scayt,Replace,Cut,Copy,Paste,PasteText,PasteFromWord,Templates,Save,Source,NewPage,ExportPdf,Preview,Print,TextField,Textarea,Select,Button,ImageButton,HiddenField,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,About,ShowBlocks,Form,Checkbox,Radio',
                            width: "100%",
                            height: 400,
                            enterMode: 2,
                        }}
                    />
                    <SubContent>
                        <ul>
                            <li>
                                <File>
                                    <label>첨부파일1</label>
                                    <label className="fileLabel" htmlFor="input_file1">업로드</label>
                                    <input id="input_file1" onChange={e => onChangeFile(e)} name="file" data-idx="0" type="file" accept="image/*" ref={fileRef} />
                                    <input type="text" value={fileName[0]} disabled />
                                </File>
                            </li>
                            <li>
                                <File>
                                    <label>첨부파일2</label>
                                    <label className="fileLabel" htmlFor="input_file2">업로드</label>
                                    <input id="input_file2" onChange={e => onChangeFile(e)} name="file" data-idx="1" type="file" accept="image/*" onClick={onClickFile} />
                                    <input type="text" value={fileName[1]} disabled />
                                </File>
                            </li>
                            <li>
                                <File>
                                    <label>첨부파일3</label>
                                    <label className="fileLabel" htmlFor="input_file3">업로드</label>
                                    <input id="input_file3" onChange={e => onChangeFile(e)} name="file" data-idx="2" type="file" accept="image/*" onClick={onClickFile} />
                                    <input type="text" value={fileName[2]} disabled />
                                </File>
                            </li>
                            <li>
                                <PassWord>
                                    <label>비밀번호</label>
                                    <input name="pswd" type="password" ref={passRef} maxLength={6} pattern="[0-9]+" title="비밀번호는 숫자로만 입력해주세요! (최대 6글자)" required disabled />
                                </PassWord>
                            </li>
                            <li>
                                <PassWord>
                                    <label>비밀글설정</label>
                                    <input id="public" name="radio" type="radio" onChange={onChangePswd} defaultChecked />
                                    <label className="set">공개글</label>
                                    <input id="private" name="radio" type="radio" onChange={onChangePswd} />
                                    <label className="set">비밀글</label>
                                </PassWord>
                            </li>
                        </ul>
                    </SubContent>
                    <Button>
                        <button type="submit">등록</button>
                        <button type="button" onClick={() => { router.back(); }}>취소</button>
                    </Button>
                </BoardWrap>
            </form>
        </Wrap>
    )
}
