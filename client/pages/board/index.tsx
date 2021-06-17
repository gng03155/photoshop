import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from 'ckeditor4-react';
// import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import('../../src/components/test'), {
//   ssr: false
// })
// import {} from "../../src/ckeditor/ckeditor"


export default function Board() {
  const [data, setData] = useState("");
  useEffect(() => {
    console.log(data);
  }, [data])


  return (
    <div>
      <CKEditor
        editorUrl='//cdn.ckeditor.com/4.16.1/full/ckeditor.js'
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
          // toolbarGroups: [
          //   { name: 'styles', groups: ['styles'] },
          //   { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
          //   '/',
          //   { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
          //   { name: 'colors', groups: ['colors'] },
          //   { name: 'document', groups: ['mode', 'doctools', 'document'] },
          //   { name: 'clipboard', groups: ['clipboard', 'undo'] },
          //   { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
          //   { name: 'forms', groups: ['forms'] },
          //   { name: 'links', groups: ['links'] },
          //   '/',
          //   { name: 'insert', groups: ['insert'] },
          //   '/',
          //   { name: 'tools', groups: ['tools'] },
          //   { name: 'others', groups: ['others'] },
          //   { name: 'about', groups: ['about'] }
          // ],
          removeButtons:
            'Find,SelectAll,Scayt,Replace,Cut,Copy,Paste,PasteText,PasteFromWord,Templates,Save,Source,NewPage,ExportPdf,Preview,Print,TextField,Textarea,Select,Button,ImageButton,HiddenField,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,About,ShowBlocks,Form,Checkbox,Radio',
          width: 600,
          height: 400,
        }}
      />
    </div>
  )
}
