import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "reactstrap";
import EditorJS from "@editorjs/editorjs";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import LinkTool from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import Header from "@editorjs/header";
import Warning from "@editorjs/warning";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";

const EditorJsComponent = ({ setDescribe, defaultData, dontShowBtn }) => {
  const [editorState, setEditorState] = useState();
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      placeholder: "لطفا محتوا خود را وارد کنید",
      tools: {
        InlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+I",
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        heckList: {
          class: CheckList,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:3000/fetchUrl",
          },
        },
        delimiter: Delimiter,
        header: Header,
        warning: Warning,
        quote: Quote,
        image: {
          class: ImageTool,
          config: {
            endpoint: {
              byFile: "http://localhost:3000/uploadFile",
              byUrl:
                "http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5",
            },
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
      data: defaultData ? defaultData : null,
    });
    setEditorState(editor);
  }, []);

  return (
    <div>
      <div id="editor"></div>

      {!dontShowBtn && (
        <Button
          className="d-block mx-auto "
          color="info"
          type="button"
          onClick={() => {
            editorState
              .save()
              .then((outputData) => {
                console.log(outputData);
                toast.success("توضیحات با موفیقت ذخیره شد");
                setDescribe(JSON.stringify(outputData));
              })
              .catch((error) => {
                console.log(error);
              });
          }}>
          ذخیره توضیحات دوره
        </Button>
      )}
    </div>
  );
};

export default EditorJsComponent;
