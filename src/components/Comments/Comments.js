import React, { useCallback, useEffect } from 'react'
import Comment from './Comment.js';
import classes from './Comments.module.css';
import { useParams } from 'react-router-dom';
import useHttp from './../../hooks/useHttp';
import { getAllComments } from '../../lib/api.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';
import NewComment from './NewComment';

// const DUMMY_COMMENTS = [
//     {id: 'c1', comment: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', name: 'سپهر'},
//     {id: 'c2', comment: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', name: 'سپهر'},
//     {id: 'c3', comment: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', name: 'سپهر'},
// ]
const Comments = (props) => {
  const params = useParams();

  const { id: postId } = params;

  const { sendRequest, status, data: loadedData, error } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(postId);
  }, [postId, sendRequest]);
  console.log(status, loadedData, error);
  const addCommentHandler = useCallback(() => {
    sendRequest(postId)
  }, [sendRequest, postId])
  let comments;
  if (status === 'pending') {
    comments = <LoadingSpinner />
  }
  if (status === 'complete' && error) {
    comments = <p>{error.message}</p>
  }
  if (status === 'complete' && !error && loadedData && loadedData.length > 0) {
    comments = <Comment comments={loadedData} postId={props.uniqueId}/>
  }
  if (status === 'complete' && (!loadedData || loadedData.length === 0)) {
    comments = <p className={classes.notification}>اولین کامنت را شما بنویسید</p>
  }
  return (
    <ul className={classes.comments}>
      {/* <Comment comments={loadedData ?? DUMMY_COMMENTS} postId={props.uniqueId}/> */}
      {comments}
      <NewComment onAddComment={addCommentHandler} postId={postId}/>
    </ul>
  )
}

export default Comments
