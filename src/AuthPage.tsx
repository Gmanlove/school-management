
import React, { useState } from 'react';
import Axios from 'axios';
import './Login.scss';
import SchoolRegistration from './SchoolRegistration';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      console.log('email:', email, 'password:', password); // Add this line for debugging
      const response = await Axios.post(`http://127.0.0.1:3000/api/v1/users/${isLogin ? 'login' : ''}`, {
        user: {
          email,
          password,
        }
      });
  
      console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, response.data);

      setIsLoggedIn(true);
      // Add code to handle successful login or registration
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'registering user'}:`, error);
      // Add code to handle login or registration error
    }
  };
  

  return (
    <div className="auth-container">
      {!isLoggedIn ? ( // Render the login or registration form if not logged in
      <>

      <h1>{isLogin ? 'Login' : 'Sign-up'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign-up'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a href="#toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </a>
      </p>
      </>
      ) : (
        <SchoolRegistration />
      )}
    </div>
  );
};

export default AuthPage;
