import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h3>About page: Simply displaying Route in React</h3>
      {/* <a href='/'>Back</a> */}
      <Link to={'/'}>Back</Link>
    </div>
  )
}

export default About
