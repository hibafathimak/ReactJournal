import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password, entries: [], reminders: [] };

    try {
      const response = await registerAPI(user);
      if (response.status === 201) {
        alert('Registration successful!');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }} className='bg-primary d-flex align-items-center justify-content-center'>
      <div style={{ width: "800px", height: '500px', borderColor: "white" }} className="border rounded shadow row">
        <div className="col-6 d-flex flex-column align-items-center justify-content-center ">
          <h1 className='text-light'>Sign up</h1>
          <form className="d-flex flex-column align-items-center justify-content-center " onSubmit={handleSubmit}>
            <input
              type="text"
              style={{width:"120%"}}
              className='form-control mb-4'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
                          style={{width:"120%"}}

              type="email"
              className='form-control mb-4'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
                          style={{width:"120%"}}

              type="password"
              className='form-control mb-4'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-light" type="submit">Sign up</button>
          </form>
        </div>
        <div className="col-6 bg-light d-flex flex-column align-items-center justify-content-center">
          <h1>Welcome Back!</h1>
          <p className='text-center'>
            To keep connected with us, please login with your personal info.
          </p>
          <Link to={'/Login'}>
            <button className="btn btn-primary">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
