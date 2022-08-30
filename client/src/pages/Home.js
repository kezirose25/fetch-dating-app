import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"
import dachshundTest from "../images/dachshund-test.png"
import homeIconOne from "../images/Home-Icon-One.png"
import homeIconTwo from "../images/Home-Icon-Two.png"
import homeIconThree from "../images/Home-Icon-Three.png"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div>
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home-container">
            <style>{'body { background-color: #F06F38; }'}</style>
                <h1 className="primary-title">goodbye puppy love, hello fetch.</h1>
                <div className="instructions">
                    <div className="instruction-one">
                    <img src={homeIconOne} alt="Create profile icon"/>
                    <p>Create your profile</p>
                    </div>

                    <div className="instruction-two">
                    <img src={homeIconTwo} alt="Swiping icon"/>
                    <p>Swipe and match</p>
                    </div>

                    <div className="instruction-three">
                    <img src={homeIconThree} alt="Messaging icon"/>
                    <p>Start chatting!</p>
                    </div>
                </div>
                <br></br>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Log out' : 'Get started'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
            </div>
    )
}
export default Home










// import Nav from '../components/Nav'
// import { useState } from 'react'
// import AuthModal from '../components/AuthModal'

// const Home = () => {
//     const [showModal, setShowModal] = useState(false)

//     const [isSignUp, setIsSignUp] = useState(true)

//     const authToken = false

//     const handleClick = () => {
//         console.log("clicked")
//         setShowModal(true)
//         setIsSignUp(true)
//     }

//     return (
//         <div>
//         <Nav
//         setShowModal={setShowModal}
//         showModal={showModal}
//         setIsSignUp={setIsSignUp}/>
//         <div className="home">
//             <h1 className="primary-title">I Dig You</h1>
//             <button className="primary-button" onClick={handleClick}>{authToken ? "Signout" : "Create Account"}</button>
 
//             {showModal && (
//                 <AuthModal setShowModal={setShowModal} 
//                 isSignUp={isSignUp}/>
//             )}

//         </div>
//         </div>
//     )
// }

// export default Home;