import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useNavigate } from "react-router-dom";

const ArchiveWriting = () => {
  const memberId = localStorage.getItem("memberId");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = `http://localhost:8099/soolsool/archive/write`;

    const formData = new FormData();
    formData.append("arc_title", title);
    formData.append("arc_content", content);
    formData.append("member_Id", memberId);
    if (selectedImage) {
      formData.append("arc_file", selectedImage);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(apiUrl, formData, config);

      if (response.status === 200) {
        if (response.data.result === "success") {
          alert("게시글 작성 성공");
          setTitle("");
          setContent("");
          setSubmitSuccess(true);
          navigate("/Archive");
        } else {
          alert("게시글 작성 실패");
        }
      } else {
        alert("통신 실패");
      }
    } catch (error) {
      alert("통신 실패");
      console.error("Error:", error);
    }
  };

  return (
    <div className="editor-container">
      <h2 className="writing-header">술창고 글 쓰기</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="editor-title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => setContent(editor.getData())}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <div>
          <input type="file" onChange={(event) => setSelectedImage(event.target.files[0])} />
        </div>
        <div className="writing-btn">
          <button className="writing-btn-box" type="submit">
            글 올리기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArchiveWriting;
