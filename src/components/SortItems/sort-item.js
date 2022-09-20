// import React from 'react'

export const sortItem = (sortArray, ascending) => {
  return (
    sortArray.sort((start, end) => {
        if (ascending) {
            return start.date > end.date ? 1 : -1;
        } else {
            return start.date < end.date ? 1 : -1;
        }
    })
  )
}
