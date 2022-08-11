import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import "../components/Auth.css";


const AuthModal = ({ setShowModal,  isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>X</div>

            <h2 className="modal-title">{isSignUp ? 'Create account': 'Log in'}</h2>
            <form onSubmit={handleSubmit}>
                <label>What's your email?</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Enter your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <label>Enter your password again</label>}
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="Enter password again"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    )
}
export default AuthModal










// import { useState } from "react"
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie'

// const AuthModal = ({ setShowModal, isSignUp }) => {

//     const [email, setEmail] = useState(null)
//     const [password, setPassword] = useState(null)
//     const [confirmPassword, setConfirmPassword] = useState(null)
//     const [error, setError] = useState(null)
//     const [cookies, setCookie, removeCookie] = useCookies(['user'])

//     let navigate = useNavigate()

//     console.log(email, password, confirmPassword)

//     const handleClick = () => {
//         setShowModal(false)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             if (isSignUp && (password !== confirmPassword)) {
//                 setError('Passwords need to match')
//                 return
//             }

//             const response = await axios.post('http://localhost:8000/signup', {email, password})

//             setCookie('Email', response.data.email)
//             setCookie('UserId', response.data.userId)
//             setCookie('AuthToken', response.data.token)

//             const success = response.status === 201

//             if (success) navigate('/onboarding')
            
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div className="auth-modal">
//             <div className="close-icon" onClick={handleClick}>x</div>
//             <h2>{isSignUp ? "Create Account" : "Log In"}</h2>
//             <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="email"
//                     required={true}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="password"
//                     required={true}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {isSignUp && <input
//                     type="password"
//                     id="password-check"
//                     name="password-check"
//                     placeholder="confirm password"
//                     required={true}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />}
//                 <input className="secondary-button"
//                 type="submit"/>
//                 <p>{error}</p>
//             </form>
//         </div>
//     )
// }

// export default AuthModal;