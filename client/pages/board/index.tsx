import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from 'ckeditor4-react';
import useSWR from 'swr';
import { fetcherData } from '../../src/util/fetcher';

import { Wrap, BoardWrap, Title, SubContent, File, PassWord, Button } from "./styles"
import fb from '../../src/firebase';
import moment from 'moment';
// import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import('../../src/components/test'), {
//   ssr: false
// })
// import {} from "../../src/ckeditor/ckeditor"


export default function Board() {

  const [userKey, setUserKey] = useState("");

  const { data: userInfo, error } = useSWR(`${userKey ? `/users/${userKey}` : ''}`, fetcherData, { revalidateOnMount: true });

  const [data, setData] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserKey(window.sessionStorage.getItem("uid"));
  }, [])

  const test = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const tg = e.target as HTMLFormElement;
    const title = (tg["Title"] as HTMLInputElement).value;
    const dt = data;
    const pswd = (tg["pswd"] as HTMLInputElement).value;
    const date = moment().format("YYYY-MM-DD HH:mm:ss")
    const key = fb.database().ref(`board`).push().key;

    const radios = tg["radio"] as HTMLInputElement[];
    let type = "";
    radios.forEach((elem) => {
      if (elem.checked) {
        type = elem.id;
      }
    })

    //전체 게시글 갯수 받기
    const length = await fb.database().ref(`board/board_list`).once("value").then((snapshot) => {
      if (snapshot.val() === null) {
        return 0;
      }
      return Object.keys(snapshot.val()).length;
    })
    //카테고리 리스트 받기
    const copy = await fb.database().ref(`board/category/free`).once("value").then((snapshot) => {
      if (snapshot.val() === null) {
        return [];
      }
      return snapshot.val();
    })

    copy.push(key);

    let idx = 1;
    if (length > 0) {
      idx = length + 1;
    }

    const board = {
      id: key,
      num: idx,
      category: "free",
      title,
      content: dt,
      date,
      hits: 0,
      userInfo: {
        name: userInfo.name,
        id: userInfo.id,
      },
      type,
      pswd,
    }

    console.log(board);

    fb.database().ref(`board/board_list/${key}`).set(board).then((snapshot) => {
      console.log("성공");
    })
    fb.database().ref(`board/category/free`).set(copy).then((snapshot) => {
      console.log("성공");
    })
      .catch(err => { console.log(err) });

    //첨부파일 확인 및 가져오기
    const fileList: any = Array.from(tg["file"]).reduce((prev: File[], cur: HTMLInputElement) => {
      if (cur.files[0] !== undefined) {
        prev.push(cur.files[0])
        return prev;
      }
      return prev;
    }, [])

    if (fileList.length !== 0) {
      for (let file of fileList) {
        const filePath = `/images/${file.name}`;
        fb.storage().ref(filePath).put(file).then((event) => {
          event.ref.getDownloadURL().then((url) => { console.log(url) });
        });
      }
    }

  }

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onClickFile = (e) => {

    if (fileRef.current.files[0] === undefined) {
      e.preventDefault();
      alert("첨부파일 1은 필수입니다!!");
    }
  }
  const aa = "<p>댓글을 이걸로 다는거군요!<br />그렇죠<br />이렇게 하는 거겠죠?<br />호호호호 아아아ㅏ<br />이이이이 에에에에<br />우우우 우웅웅웅<br />오오웅오우ㅡㅇ</p>";
  return (
    <Wrap>
      <form onSubmit={(e) => test(e)}>
        <BoardWrap>
          <h2>게시글 작성</h2>
          <Title>
            <label>제목</label>
            <input name="Title" type="text" required />
          </Title>
          <CKEditor
            editorUrl='//cdn.ckeditor.com/4.16.1/full/ckeditor.js'
            onSetData={(e) => { e.data.dataValue = aa }}
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
                  <input name="file" type="file" accept="image/*" ref={fileRef} />
                </File>
              </li>
              <li>
                <File>
                  <label>첨부파일2</label>
                  <input name="file" type="file" accept="image/*" onClick={onClickFile} />
                </File>
              </li>
              <li>
                <File>
                  <label>첨부파일3</label>
                  <input name="file" type="file" accept="image/*" onClick={onClickFile} />
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
                  <input id="public" name="radio" type="radio" onChange={onChangePass} defaultChecked />
                  <label className="set">공개글</label>
                  <input id="private" name="radio" type="radio" onChange={onChangePass} />
                  <label className="set">비밀글</label>
                </PassWord>
              </li>
            </ul>
          </SubContent>
          <Button>
            <button type="submit">등록</button>
            <button type="button">취소</button>
          </Button>
        </BoardWrap>
      </form>
    </Wrap>
  )
}
