import React from 'react'
import {FaQuestion} from 'react-icons/fa'
import {Link} from 'react-router-dom' // to have the page updated

// uses A href tag which contains the url or path to destination page (external link)
// uses Link tag for internal links

function AboutIconLink() {
  return (
    <div className = 'about-link'>
        <Link to = '/about'>
        <FaQuestion size = {30}/>
        </Link>
    </div>
  )
}

export default AboutIconLink