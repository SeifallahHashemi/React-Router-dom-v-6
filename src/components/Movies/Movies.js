import React from 'react'
import { motion } from 'framer-motion'

const Movies = (props) => {
  return (
    <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: .5}}>
      <h2>{props.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${props.path}`} alt="" />
    </motion.div>
  )
}

export default Movies
