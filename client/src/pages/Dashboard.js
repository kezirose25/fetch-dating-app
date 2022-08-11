import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import Nav from '../components/Nav' //added on Thurs
import leftIcon from "../images/Left_Icon.png"
import rightIcon from "../images/Right_Icon.png"
import '../components/Dashboard.css';
import '../components/Chat.css';

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken //added on Thurs

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: {gender: user?.gender_interest}
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }


    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))


    console.log('filteredGenderedUsers ', filteredGenderedUsers)
    return (
        <>
        <Nav
                minimal={false}
                authToken={authToken}
                setShowModal={() => {
                }}
                showModal={false}
            /> 
            
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="dash-info">
                    <h1>Dog dashboard</h1>
                    <p className="dash-instruction">Swipe with your cursor to start matching!</p>
                <div className="swipe-container">
                    <div className="arrows">
                        <img className="left-icon" src={leftIcon}/>
                        <p className="no">No thanks</p>
                    </div>
                    <div className="card-container">

                        {filteredGenderedUsers?.map((genderedUser) =>
                            <TinderCard
                                className="swipe"
                                key={genderedUser.user_id}
                                onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>

                                <div className="card">
                                    <div className="card-img" style={{backgroundImage: "url(" + genderedUser.url + ")"}}>
                                    </div>
                                    <div className="card-user-info">   
                                    <h3>{genderedUser.first_name}</h3>
                                    <p>🐶  {genderedUser.breed} 📍  {genderedUser.location}</p>
                                    <div className="bre"></div>
                                    <p>{genderedUser.about}</p>
                                    <div className="bre-2"></div>
                                    <p>💖 {genderedUser.loves}</p>
                                    <p>👎 {genderedUser.dislikes}</p>
                                    </div> 
                                    </div>
                            </TinderCard>
                        )}

                            <div className="swipe-div">

                            <div className="swipe-end-info">
                            {filteredGenderedUsers === null} <p>That's all the dogs for today. Refresh or come back tomorrow!</p>
                        </div>

                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : !filteredGenderedUsers ? <p></p> : <p></p>}
                        </div>
                        
                        </div>

                        {/* <div className="chat-arrow">
                            <h3>Chat below</h3>
                        </div> */}

                    </div>
                    <div className="arrows">
                        <img className="right-icon" src={rightIcon}/>
                        <p className="yes">Woof woof!</p>
                    </div>
                </div>
                </div>
            </div>}
        </>
    )
}
export default Dashboard










{/* <>
        <Nav
                minimal={false}
                authToken={authToken}
                setShowModal={() => {
                }}
                showModal={false}
            /> 
            
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="dash-info">
                    <h1>Dog dashboard</h1>
                    <p>Swipe with your cursor to start matching!</p>
                <div className="swipe-container">
                    <div className="card-container">

                        {filteredGenderedUsers?.map((genderedUser) =>
                            <TinderCard
                                className="swipe"
                                key={genderedUser.user_id}
                                onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                <div
                                    style={{backgroundImage: "url(" + genderedUser.url + ")"}}
                                    className="card">
                                        </div>
                                        <div className="card-info">
                                    <h3>{genderedUser.first_name}</h3>
                                    <h3>{genderedUser.breed}</h3>
                                    <h3>{genderedUser.location}</h3>
                                    <h3>I love: {genderedUser.loves}</h3>
                                    <h3>I dislike: {genderedUser.dislikes}</h3>
                                    <p>{genderedUser.about}</p>
                                    </div>
                            </TinderCard>
                        )}

                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
                </div>
            </div>}
        </> */}