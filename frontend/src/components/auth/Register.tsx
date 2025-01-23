import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registeredUser } from '../../store/authSlice';
import './Register.css'; // Import the CSS file

interface UserState {
    name: string;
    email: string;
    password: string;
}

interface AuthState {
    auth: any;  // Replace 'any' with your actual auth state type
}

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state:AuthState)=>state.auth);
    console.log(auth);

    const [ user,setUser ] = useState<UserState>({
        name:"",
        email:"",
        password:"",
    });

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registeredUser(user));
    };

    console.log("user:",user);

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2 className="register-title">Create an Account</h2>
                <input 
                    type='text' 
                    placeholder='Input Name' 
                    value={user.name}
                    onChange={(e)=>setUser({...user, name:e.target.value})}
                    className="input-field"
                />
                <input 
                    type='email' 
                    placeholder='Input Email' 
                    value={user.email}
                    onChange={(e)=>setUser({...user, email:e.target.value})}
                    className="input-field"
                />
                <input 
                    type='password' 
                    placeholder='Enter your password' 
                    value={user.password}
                    onChange={(e)=>setUser({...user, password:e.target.value})}
                    className="input-field"
                />
                <button className="register-button">
                    {auth.registerStatus === 'pending' ? "Submitting..." : "Register"}
                </button>

                {auth.registerStatus === 'rejected' && (
                    <p className="error-message">{auth.registerError}</p>
                )}
            </form>
        </div>
    );
};

export default Register;
