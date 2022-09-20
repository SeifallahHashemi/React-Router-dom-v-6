import React, { useEffect, useRef, useState } from "react";
import classes from "./NewComment.module.css";
import useHttp from "./../../hooks/useHttp";
import { addComment } from "./../../lib/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.js";
const NewComment = (props) => {
  const [isEmpty, setIsEmpty] = useState("");
  const titleRef = useRef();
  const commentRef = useRef();
  const [focusState, setFocusState] = useState(false);
//   const params = useParams();
  const { sendRequest, status, error } = useHttp(addComment);
//   const postID = params.id;
  const { onAddComment, postId } = props;
  useEffect(() => {
    if (status === "complete" && !error) {
      onAddComment();
    }
    setIsEmpty("");
  }, [onAddComment, status, error]);
  const onFocusHandler = () => {
    setFocusState(true);
  };
  const onBlurHandler = () => {
    setFocusState(false);
  };
  const toggleClassName = `${classes["bookDetails__form--title"]} ${
    isEmpty.trim().length === 0
      ? focusState
        ? classes.active
        : ""
      : classes.active
  }`;
  const addFormHandler = (e) => {
    e.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredComment = commentRef.current.value;

    if (enteredTitle.trim().length === 0 || enteredComment.trim().length === 0)
      return;

    sendRequest({
      commentData: { title: enteredTitle, comment: enteredComment },
      postId: postId,
    });
    titleRef.current.value = '';
    commentRef.current.value = '';
  };
  const changeHandler = (e) => {
    setIsEmpty(e.target.value);
  };
  return (
    <form className={classes["bookDetails__form"]} onSubmit={addFormHandler}>
        {status === 'pending' && (
            <LoadingSpinner />
        )}
      <div className={toggleClassName}>
        <label htmlFor="nameInput">نام</label>
        <input
          type="text"
          name="text"
          id="nameInput"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={titleRef}
          onChange={changeHandler}
        />
      </div>
      <div className={classes["bookDetails__form--comment"]}>
        <textarea
          name="textArea"
          id="comment"
          cols="90"
          rows="10"
          placeholder="لطفا نظر خود را با ما درمیان بگذارید ..."
          ref={commentRef}
        ></textarea>
      </div>
      <button className={classes['bookDetails__form--button']}>ارسال</button>
    </form>
  );
};

export default NewComment;
