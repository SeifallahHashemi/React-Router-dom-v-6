import React from 'react'
import { useParams } from 'react-router-dom'

function BookList() {
    const param = useParams();
  return (
    <h2>BookList {param.id}</h2>
  )
}

export default BookList
