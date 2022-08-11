import { useState} from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="chat-input">
            <textarea placeholder="Type your bark here..." value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="chat-button" onClick={addMessage}>Submit bark</button>
        </div>
    )
}

export default ChatInput










// import { useState } from "react";

// const ChatInput = () => {
//     const [textArea, setTextArea] = useState(null)
    
//     return (
//         < div className="chat-input">
//             <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
//             <button className="secondary-button">Submit</button>
//         </div>
//     )
// }

// export default ChatInput;