import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    try {
      console.log('Attempting login with credentials:', userCredentials);
      const response = await loginAPI(userCredentials);
      console.log('Login response:', response);
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        alert('Login successful!');
        navigate('/journals'); // Redirect to a dashboard or home page
      } else {
        alert(response.message || 'Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }} className='bg-primary d-flex align-items-center justify-content-center'>
      <div style={{ width: "800px", height: '500px', borderColor: "white" }} className="border rounded shadow row">
        <div className="col-6 bg-light d-flex flex-column align-items-center justify-content-center">
          <h1>Hello, Friend!</h1>
          <p className='text-center'>
            Enter Your personal details and start the journey with us.
          </p>
          <Link to={'/Register'}>
            <button className="btn btn-primary">Sign up</button>
          </Link>
        </div>
        <div className="col-6 d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className='text-light'>Sign In</h1>
          <form className="d-flex flex-column align-items-center justify-content-center " onSubmit={handleSubmit}>
            <input
              type="email"
              style={{width:"120%"}}
              className='form-control mb-4'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              style={{width:"120%"}}
              className='form-control mb-4'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-light" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
