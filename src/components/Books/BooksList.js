import React from 'react'
import { Link } from 'react-router-dom'
import classes from'./BooksList.module.css';

const BooksList = (props) => {
  return (
    <li className={classes.bookList}>
      <div className={classes.imageContainer}>
        <img src={props.url} alt={props.title} className={classes['book_img']}/>
      </div>
      <div className={classes.content}>
        <p>{props.content}</p>
      </div>
      <div className={classes.link}>
        <Link to={`post/${props.id}`}>ادامه مطلب</Link>
        {/* <Link to={`post/${props.id}/`}>ادامه مطلب</Link> */}
      </div>
    </li>
  )
}

export default BooksList
