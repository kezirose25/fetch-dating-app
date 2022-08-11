
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
                {!authToken && <Route path="/dashboard" element={<Home/>}/>}

            </Routes>
        </BrowserRouter>
    )
}

export default App






// import Home from './pages/Home'
// import Dashboard from './pages/Dashboard'
// import Onboarding from './pages/Onboarding'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// const App= () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/dashboard" element={<Dashboard/>}/>
//       <Route path="/onboarding" element={<Onboarding/>}/>
//     </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
