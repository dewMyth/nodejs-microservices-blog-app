import React, { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      })
      .then((res) => {
        alert("Comment created successfully");
        console.log(res);
      })
      .catch((err) => {
        alert("Error creating comment" + err);
      });
    setContent("");
  };
  return (
    <>
      <form>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
