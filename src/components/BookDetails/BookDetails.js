// import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
// import NewComment from '../Comments/NewComment.js';
import { DUMMY_DATA } from './../../pages/Home';
import classes from './BookDetails.module.css';
import useHttp from './../../hooks/useHttp';
import { getAllComments } from '../../lib/api.js';
import { useEffect } from 'react';
const BookDetails = () => {
  const params = useParams();
  const postID = params.id;
  const {sendRequest} = useHttp(getAllComments)
  // console.log(Number(params.id));
  // console.log(titleRef.current.value.trim().length > 0);
  // DUMMY_DATA.forEach(item => console.log(Number(item.id)));
  const findItem = DUMMY_DATA.findIndex(item => item.id === params.id);
  // console.log(findItem);
  // const findItem = DUMMY_DATA.find(item => item.id === params.id);
  // console.log(findItem);
  useEffect(() => {
    sendRequest(postID)
  }, [sendRequest, postID])
 
  // const addCommentHandler = useCallback(() => {
  //   sendRequest(postID)
  // }, [sendRequest, postID])
  return (
    <div className={classes.bookDetails}>
      <img src={DUMMY_DATA[findItem].url} alt="hi" />
      <div>
        {DUMMY_DATA[findItem].content}
      </div>
      <Comments uniqueId={postID}/>
      {/* <NewComment onAddComment={addCommentHandler} postId={postID}/> */}
    </div>
  )
}

export default BookDetails
