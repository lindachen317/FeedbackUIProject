// provides the context of the cards on the web page instead of bringing in prop types 
// simplifies the code 
import {v4 as uuidv4} from 'uuid'
import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })
    useEffect(()=>{
        fetchFeedback()
    },[])

    //fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')        
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    
    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback]) //taking objects in feedback and putting it into array
    }

    //Delete Feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?'))
        {
        setFeedback(feedback.filter((item) => item.id !== id)) //returning an array minus the one deleted using filter
        }
    }  

    //update feedback item
    //... is spread which copies all parts of an array to another one
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item)=> item.id === id ? 
        {...item, ...updItem} : item))
    }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit ({
        item,
        edit: true
        })
    }

    return (
    <FeedbackContext.Provider value = {{
        feedback,
        feedbackEdit, // actual state that holds the function
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, // function that runs when clicked
        updateFeedback
    }}
    >
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext