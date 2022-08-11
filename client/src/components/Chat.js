const Chat = ({descendingOrderMessages, user}) => {
    const userId = user?.user_id
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div className="user-img-chat" key={_index}>
                        <div className="chat-message-header">
                            <div className="img-container-messaging">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            {/* <p>{message.name}</p> */}
                        </div>
                        <div className="name-bubble">
                        <p className="name-p">{message.name}</p>
                        <p className="message-bubble">{message.message}</p>
                        </div>
                    </div> 
                ))}
            </div>
        </>
    )
}

// if message.name === user signed in display differesdnt user-img-chat div with alternative styling

export default Chat










// const Chat = () => {
//     return (
//         <>
//        <div className="chat-display"></div>
//        </>
//     )
// }

// export default Chat;