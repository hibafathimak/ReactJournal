import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ signup, logOut }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem('user'); // Clear the user from session storage
    alert('Logged out successfully!');
    navigate('/Login'); // Redirect to the login page
  };

  return (
    <div className='w-100 bg-primary p-3 d-flex text-light justify-content-between align-items-center'>
      <Link style={{ fontSize: '30px' }} className='ms-5 text-light text-decoration-none fw-bolder' to={'/'}>
        <i className="fa-solid fa-book-bookmark me-3"></i>Journal
      </Link>
      {signup && (
        <Link to={'/Login'}>
          <span className='btn text-light fs-4'>Login<i className="fa-solid fa-circle-user fa-lg ms-2"></i></span>
        </Link>
      )}
      {logOut && (
        <span onClick={handleLogOut} style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-circle-user me-2"></i>LogOut
        </span>
      )}
    </div>
  );
};

export default Header;
