import React, { useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import "./editor.scss";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaLink,
  FaHeading,
  FaEraser,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

const Editor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = DOMPurify.sanitize(value);
    }
  }, [value]);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleInput = () => {
    const sanitizedContent = DOMPurify.sanitize(editorRef.current.innerHTML);
    onChange(sanitizedContent);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => handleFormat("bold")}><FaBold /></button>
        <button onClick={() => handleFormat("italic")}><FaItalic /></button>
        <button onClick={() => handleFormat("underline")}><FaUnderline /></button>
        <button onClick={() => handleFormat("strikeThrough")}><FaStrikethrough /></button>
        <button onClick={() => handleFormat("insertUnorderedList")}><FaListUl /></button>
        <button onClick={() => handleFormat("insertOrderedList")}><FaListOl /></button>
        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) handleFormat("createLink", url);
          }}
        >
          <FaLink />
        </button>
        <button onClick={() => handleFormat("formatBlock", "<h2>")}><FaHeading /></button>
        <button onClick={() => handleFormat("justifyLeft")}><FaAlignLeft /></button>
        <button onClick={() => handleFormat("justifyCenter")}><FaAlignCenter /></button>
        <button onClick={() => handleFormat("justifyRight")}><FaAlignRight /></button>
        <button onClick={() => handleFormat("justifyFull")}><FaAlignJustify /></button>
        <button onClick={() => handleFormat("undo")}><FaUndo /></button>
        <button onClick={() => handleFormat("redo")}><FaRedo /></button>
        <button onClick={() => handleFormat("removeFormat")}><FaEraser /></button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="editor"
        onInput={handleInput}
      ></div>
    </div>
  );
};

export default Editor;

