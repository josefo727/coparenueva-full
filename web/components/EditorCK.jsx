import React, { Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditorCK = ({title, body, setBody}) => {

    const configCKEditor = {
        toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "mediaEmbed",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "undo",
            "redo"
        ]
    };

    // const changeContent = content => {
    //     setBody(content);
    // }

    return (
        <Fragment>
            <label className="mb2" htmlFor={'terms'}>{title}</label>
            <div className="mt3">
                <CKEditor
                    className="mt2"
                    editor={ClassicEditor}
                    config={configCKEditor}
                    data={body}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBody(data);
                    } }
                />
            </div>
        </Fragment>
    )
}

export default EditorCK
