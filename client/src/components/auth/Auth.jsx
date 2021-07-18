import { useState, useEffect } from 'react';
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import authImg from "../../images/auth.svg";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import decode from "jwt-decode";
import { LOGOUT } from '../../constants/actionTypes';
import * as avatars from "../../images/avatars/avatar";
const initialState = {
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
}

const Auth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const avatarList = Object.values(avatars);


    const handleSubmit = async (e) => {
        e.preventDefault();
        !isSignUp ? dispatch(signin(formData, history)) : (formData.password === formData.confirmPassword) ? dispatch(signup(formData, history)) : console.log("passwords do not match!")
        setFormData(initialState)
    };



    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push("/")
        setUser(null)
    };
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [location])

    const switchMode = () => {
        setFormData(initialState)
        setIsSignUp(!isSignUp)
        setShow(false)
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAvatar = () => {
        const index = Math.floor(Math.random() * (avatarList.length));

        return avatarList[index];
    }
    if (user) {
        return (
            <div className="  d-flex flex-column align-items-center mt-4 shadow" style={{ background: "#e2e0e0" }} >


                <img src={handleAvatar()} className="w-100 circle m-2" style={{ maxHeight: "300px", maxWidth: "300px" }} alt="..." />
                <div className="h2 m-2">{user?.result?.name.charAt(0).toUpperCase() + user?.result?.name.slice(1)}</div>
                <div className="m-2" >
                    <button className="btn btn-danger mb-3 " onClick={logout}>Logout</button>
                </div>
            </div>
        )
    }
    return (

        <form className="g-3 " noValidate onSubmit={handleSubmit} >
            <div className="row m-3 justify-content-center">
                <img src={authImg} alt="auth" style={{ width: "70%", height: "70%" }} />
            </div>


            {isSignUp && (
                <>
                    <div className="row  mb-2">
                        <label htmlFor="first" className="col-lg-3 col-form-label">First Name</label>
                        <div className="col-lg-9">
                            <input type="text" value={formData.firstName} name="firstName" onChange={handleChange} className="form-control" id="first" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="last" className="col-lg-3 col-form-label">Last Name</label>
                        <div className="col-lg-9">
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" id="last" />
                        </div>
                    </div>
                </>
            )}
            <div className="row mb-3">
                <label htmlFor="mail" className="col-lg-3 col-form-label">Email</label>
                <div className="col-lg-9">
                    <input type="email" value={formData.email} name="email" onChange={handleChange} className="form-control" id="mail" />
                </div>
            </div>
            <div className="row  mb-2 ">
                <label htmlFor="pass" className="col-lg-3  col-form-label ">Password</label>
                <div className="col-lg-9 ">
                    <div className="input-group mb-3">
                        <input type={show ? "text" : "password"} name="password" value={formData.password} style={{ borderRight: "none" }} onChange={handleChange} className="form-control" id="pass" required />
                        <span className="input-group-text " style={{ background: "#fff" }} onClick={() => setShow(!show)}  >{show ? <MdVisibilityOff /> : <MdVisibility />}</span>
                    </div>
                </div>
            </div>
            {isSignUp && (
                <div className="row mb-3 ">
                    <label htmlFor="pass1" className="col-lg-3  col-form-label">Confirm Password</label>
                    <div className="col-lg-9 ">

                        <input type={show ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" id="pass1" required />

                    </div>
                </div>
            )}
            <div className="d-flex justify-content-end me-1 mb-2">
                <button type="submit" className="btn btn-primary  ">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
            <div className="d-flex justify-content-end ">
                <p className="btn text-secondary" onClick={switchMode}>
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </p>
            </div>

        </form>

    )
}

export default Auth
