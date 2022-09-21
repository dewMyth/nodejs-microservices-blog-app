import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/posts", {
        title,
      })
      .then((res) => {
        alert("Post created successfully");
        console.log(res);
      })
      .catch((err) => {
        alert("Error creating post" + err);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Create Post</h1>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="">Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
