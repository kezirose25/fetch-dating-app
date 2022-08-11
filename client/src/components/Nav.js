import { useState } from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../images/color-logo-fetch.png";
import colorLogo from "../images/color-logo-fetch.png";
import { useCookies } from 'react-cookie'
import "../components/Nav.css";
import "../components/Auth.css";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
  
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  const [hover, setHover] = useState()

  const handleMouseIn = () => {
    setHover(true)
  };

  const handleMouseOut = () => {
    setHover(false)
  };

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
}

  return (
    <nav>
      <Link to="/">
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : colorLogo}
          alt="logo"
        />
      </div>
      </Link>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
          onMouseOver={handleMouseIn}
          onMouseOut={handleMouseOut}
        >
          {hover ? "🐶" : "Log in"}
        </button>
      )}
      {authToken && !minimal && (
        <div>
           <Link to="/dashboard">
            <button type="button"
            className="dashboard-button">
            Dashboard
            </button>
          </Link>
        <button
          className="nav-button"
          onClick={logout}
          disabled={showModal}
          onMouseOver={handleMouseIn}
          onMouseOut={handleMouseOut}
        >
          {hover ? "👋" : "Log out"}
        </button>
        </div>
      )}
    </nav>
  );
};
export default Nav;










// import logo from '../images/Tinder-logo.png'

// const Nav = ({ setShowModal, showModal, setIsSignUp }) => {

//     const handleClick = () => {
//         setShowModal(true)
//         setIsSignUp(false)
//     }

//     const authToken = false 

//     return (
//         <nav>
//             <div className="logo-container">
//                 <img className="logo" src={logo} />
//             </div>
//             {!authToken && ( <button className="nav-button"
//             onClick={handleClick}
//             disabled={showModal}
//             >Log In</button> )}
//         </nav>
//     )
// }

// export default Nav;