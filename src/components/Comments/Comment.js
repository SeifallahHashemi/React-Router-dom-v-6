import React, { Fragment } from 'react'
import classes from './Comment.module.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import { sortItem } from './../SortItems/sort-item';

const Comment = (props) => {
  const location = useLocation();
  console.log(location);
  const [queryParams, setSearchParams] = useSearchParams();
  console.log(queryParams.get('sort'));
  const transformedDate = (date) => new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric'}).format(date)
  // const transformedDate = new Intl.DateTimeFormat('fa-IR', { year: 'numeric'}).format(new Date());
  // console.log(transformedDate(new Date()));
  const isSortingAscending = queryParams.get('sort') === 'asc';
  console.log(isSortingAscending);
  const sortedComments = sortItem(props.comments, isSortingAscending);
  const changeSortingHandler = () => {
    setSearchParams({ sort: `${isSortingAscending ? 'desc' : 'asc'}`})
  }
  return (
    <Fragment>
      <button className={classes['comment__button']} onClick={changeSortingHandler}>مرتب سازی براساس تاریخ {isSortingAscending ? 'صعودی' : 'نزولی '}</button>
      {sortedComments.map(comment => (<li key={comment.id} className={classes.comment}>
        <span>{comment.title}</span>
        <span>{comment.comment}</span>
        <span>{transformedDate(new Date(comment.date))}</span>
    </li>))}
    </Fragment>
  )
}

export default Comment
