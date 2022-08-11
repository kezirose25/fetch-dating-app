import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../components/Onboarding.css";

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        breed: "",
        location: "",
        show_gender: true,
        gender_identity: "boy",
        gender_interest: "girl",
        email: "",
        url: "",
        about: "",
        loves: "",
        dislikes: "",
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h1>Account Settings</h1>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Breed</label>
                            <input 
                            id="breed"
                            type="text"
                            name="breed"
                            required={true}
                            placeholder="Bedlington Terrier"
                            value={formData.breed}
                            onChange={handleChange}
                            />

                        <label>Location:</label>
                        <select name="location"
                                value={formData.location}
                                onChange={handleChange}
                                id="location"
                                >
                            <option className="hidden-select" hidden>Select</option>
                            <option>London</option>
                            <option>North East</option>
                            <option>North West</option>
                            <option>Yorkshire</option>
                            <option>East Midlands</option>
                            <option>West Midlands</option>
                            <option>South East</option>
                            <option>East of England</option>
                            <option>South West</option>
                        </select>

                        <div className="toggle">
                    <div>
                        <label>My gender:</label>
                        <div className="multiple-input-container">
                            <input
                                id="boy-gender-identity" 
                                type="radio"
                                name="gender_identity"
                                value={"boy"}
                                onChange={handleChange}
                                checked={formData.gender_identity === "boy"}
                            />
                        <label htmlFor="boy-gender-identity">Boy</label>
                            <input
                                id="girl-gender-identity" 
                                type="radio"
                                name="gender_identity"
                                value={"girl"}
                                onChange={handleChange}
                                checked={formData.gender_identity === "girl"}
                            />
                        <label htmlFor="girl-gender-identity">Girl</label>
                        </div>
                        </div>

                        {/* <label htmlFor="show-gender">Show gender on my profile</label>
                            <input
                                id="show-gender" 
                                type="checkbox"
                                name="show_gender"
                                onChange={handleChange}
                                checked={formData.show_gender}
                            /> */}

                    <div>
                        <label>Interested in:</label>
                        <div className="multiple-input-container">
                            <input
                                id="boy-gender-interest" 
                                type="radio"
                                name="gender_interest"
                                value={"boy"}
                                onChange={handleChange}
                                checked={formData.gender_interest === "boy"}
                            />
                        <label htmlFor="boy-gender-interest">Boy</label>
                            <input
                                id="girl-gender-interest" 
                                type="radio"
                                name="gender_interest"
                                value={"girl"}
                                onChange={handleChange}
                                checked={formData.gender_interest === "girl"}
                            />
                        <label htmlFor="girl-gender-interest">Girl</label>
                        {/* <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.gender_interest === "everyone"}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label> */}

                        </div>
                        </div>
                        </div>

                    </section>

                    <section>

                    <label htmlFor="about">About me (max. 90 characters)</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            minlength="1"
                            maxlength="90"
                            placeholder="I like long walks..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                    <label htmlFor="loves">One thing I really love is: (max. 32 characters)</label>
                        <input
                            id="loves"
                            type="text"
                            name="loves"
                            required={true}
                            maxlength="32"
                            placeholder="Treats..."
                            value={formData.loves}
                            onChange={handleChange}
                        />

                        <label htmlFor="dislikes">I don't like: (max. 32 characters)</label>
                        <input
                            className="dislikes"
                            id="dislikes"
                            type="text"
                            name="dislikes"
                            required={true}
                            maxlength="32"
                            placeholder="Cats..."
                            value={formData.dislikes}
                            onChange={handleChange}
                        />
    
                        <label htmlFor="url">Profile Picture</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                            placeholder="Paste URL here..."
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>

                        <input type="submit"/>

                    </section>

                </form>
            </div>
        </>
    )
}
export default OnBoarding










// import { useState } from "react";
// import Nav from "../components/Nav";

// const Onboarding = () => {
//     const [formData, setFormData] = useState({
//         user_id: "",
//         first_name: "",
//         dob_day: "",
//         dob_month: "",
//         dob_year: "",
//         show_gender: true,
//         gender_identity: "boy",
//         gender_interest: "girl",
//         email: "",
//         breed: "",
//         location: "",
//         url: "",
//         about: "",
//         matches: []
//     })

//     const handleSubmit = () => {
//         console.log("submitted")
//     }

//     const handleChange = (e) => {
//         const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
//         const name = e.target.name

//         setFormData((prevState) => ({
//             ...prevState,
//             [name] : value
//         }))
//     }

//     console.log(formData)

//     return (
//         <>
//         <Nav
//         setShowModal={() => {}}
//         showModal={false}
//         />
//         <div className="onboarding">
//             <h2>Create Account</h2>

//             <form onSubmit={handleSubmit}>
//                 <section>
//                     <label htmlFor="first-name">First Name</label>
//                     <input
//                         id="first-name" 
//                         type="text"
//                         name="first_name"
//                         placeholder="First Name"
//                         required={true}
//                         value={formData.first_name}
//                         onChange={handleChange}
//                     />

                    // <label htmlFor="breed">Breed</label>
                    // <input 
                    // id="breed"
                    // type="text"
                    // name="breed"
                    // required={true}
                    // placeholder="Bedlington Terrier"
                    // value={formData.breed}
                    // onChange={handleChange}
                    // />

//                     <label>Birthday</label>
//                     <div className="multiple-input-container">
//                     <input
//                         id="dob_day" 
//                         type="number"
//                         name="dob_day"
//                         placeholder="DD"
//                         required={true}
//                         value={formData.dob_day}
//                         onChange={handleChange}
//                     />
//                     <input
//                         id="dob_month" 
//                         type="number"
//                         name="dob_month"
//                         placeholder="MM"
//                         required={true}
//                         value={formData.dob_month}
//                         onChange={handleChange}
//                     />
//                     <input
//                         id="dob_year" 
//                         type="number"
//                         name="dob_year"
//                         placeholder="YYYY"
//                         required={true}
//                         value={formData.dob_year}
//                         onChange={handleChange}
//                     />
//                     </div>

                    // <label>Gender</label>
                    // <div className="multiple-input-container">
                    // <input
                    //     id="boy-gender-identity" 
                    //     type="radio"
                    //     name="gender_identity"
                    //     value={"boy"}
                    //     onChange={handleChange}
                    //     checked={formData.gender_identity === "boy"}
                    // />
                    // <label htmlFor="boy-gender-identity">Boy</label>
                    // <input
                    //     id="girl-gender-identity" 
                    //     type="radio"
                    //     name="gender_identity"
                    //     value={"girl"}
                    //     onChange={handleChange}
                    //     checked={formData.gender_identity === "girl"}
                    // />
                    // <label htmlFor="girl-gender-identity">Girl</label>
                    // </div>

                    // <label htmlFor="show-gender">Show gender on my profile</label>
                    // <input
                    //     id="show-gender" 
                    //     type="checkbox"
                    //     name="show_gender"
                    //     onChange={handleChange}
                    //     checked={formData.show_gender}
                    // />

                    // <label>Show Me</label>
                    // <div className="multiple-input-container">
                    // <input
                    //     id="boy-gender-interest" 
                    //     type="radio"
                    //     name="gender_interest"
                    //     value={"boy"}
                    //     onChange={handleChange}
                    //     checked={formData.gender_interest === "boy"}
                    // />
                    // <label htmlFor="boy-gender-interest">Boy</label>
                    // <input
                    //     id="girl-gender-interest" 
                    //     type="radio"
                    //     name="gender_interest"
                    //     value={"girl"}
                    //     onChange={handleChange}
                    //     checked={formData.gender_interest === "girl"}
                    // />
                    // <label htmlFor="girl-gender-interest">Girl</label>
                    // <input
                    //     id="everyone-gender-interest" 
                    //     type="radio"
                    //     name="gender_interest"
                    //     value={"everyone"}
                    //     onChange={handleChange}
                    //     checked={formData.gender_interest === "everyone"}
                    // />
                    // <label htmlFor="more-gender-interest">Everyone</label>
                    // </div>

//                     <label htmlFor="about">About Me</label>
//                     <input 
//                     id="about"
//                     type="text"
//                     name="about"
//                     required={true}
//                     placeholder="I like long walks..."
//                     value={formData.about}
//                     onChange={handleChange}
//                     />

                    // <label htmlFor="location">Location:</label>
                    //     <select name="location"
                    //             value={formData.location}
                    //             onChange={handleChange}
                    //             id="location"
                    //             >
                    //         <option>London</option>
                    //         <option>North East</option>
                    //         <option>North West</option>
                    //         <option>Yorkshire</option>
                    //         <option>East Midlands</option>
                    //         <option>West Midlands</option>
                    //         <option>South East</option>
                    //         <option>East of England</option>
                    //         <option>South West</option>
                    //     </select>

//                         <input type="submit"/>
//                 </section>

//                 <section>
//                 <label htmlFor="url">Profile Picture</label>
//                 <input 
//                     type="url"
//                     name="url"
//                     id="url"
//                     onChange={handleChange}
//                     required={true}
//                 />
//                 <div className="photo-container">
//                     <img src={formData.url} alt="profile picture preview"/>
//                 </div>
//                 </section>

//             </form>
//         </div>
//         </>
//     )
// }

// export default Onboarding;