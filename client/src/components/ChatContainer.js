import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)

    return (
        <div className="chat-container">
            {/* <div className="buffer"></div> */}
            <ChatHeader user={user}/>

            <div>
            <button className="matches-title" disabled={clickedUser}>Matches</button>
            </div>
            <div className="hidden-match-chat">
                <button className="option-1" disabled={!clickedUser} onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option-2" disabled={!clickedUser}>Barks</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>
        
    )
}

export default ChatContainer










// import ChatHeader from '../components/ChatHeader'
// import ChatDisplay from '../components/ChatDisplay'
// import MatchesDisplay from '../components/MatchesDisplay'

// const ChatContainer = () => {
//     return (
//     <div className="chat-container">
//         <ChatHeader/>
//         <div>
//             <button className="option">Matches</button>
//             <button className="option">Chat</button>
//         </div>

//         <MatchesDisplay/>
//         <ChatDisplay/>
//     </div>
//     )
// }

// export default ChatContainer;