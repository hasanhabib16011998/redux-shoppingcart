import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import './Register.css'; // Import the CSS file

interface UserState {
    email: string;
    password: string;
}

interface AuthState {
    auth: any;  // Replace 'any' with your actual auth state type
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state:AuthState)=>state.auth);
    console.log(auth);

    const [ user,setUser ] = useState<UserState>({
        email:"",
        password:"",
    });

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(user));
    };

    console.log("user:",user);
    

    return (
        <div className="register-container">
            <form onSubmit={handleLogin} className="register-form">
                <h2 className="register-title">Log In</h2>
                
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
                    {auth.loginStatus === 'pending' ? "Submitting..." : "Log In"}
                </button>

                {auth.loginStatus === 'rejected' && (
                    <p className="error-message">{auth.loginError}</p>
                )}
            </form>
        </div>
    );
};

export default Login;
