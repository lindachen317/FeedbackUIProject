import React from 'react'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
//lists the total number of reviews and average rating
function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)
    //calculate ratings avg
    //Reduce loops through all ratings and add it together, then multiply it by length of feedback length
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/,'') // makes it one decimal, if its 0 replace it with nothing

  // isNaN is a function you can wrap it around to make sure it does not show NaN
  return (
    <div className ='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}
export default FeedbackStats
