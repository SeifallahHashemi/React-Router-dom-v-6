import React from 'react'
import classes from './Comment.module.css';

const Comment = (props) => {
  return (
    props.comments.map(comment => (<li key={comment.id} className={classes.comment}>
        <span>{comment.title}</span>
        <span>{comment.comment}</span>
    </li>))
  )
}

export default Comment
