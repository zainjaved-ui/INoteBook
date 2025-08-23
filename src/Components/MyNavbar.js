import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MyNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top'>
      <div className='container'>
        <Link className='navbar-brand fw-bold fs-4' to='/'>
          <i className="fa-solid fa-book-open text-warning me-2"></i> iNotebook
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? (
            <div className='d-flex'>
              <Link className='btn btn-outline-light mx-1' to='/Login'>
                <i className="fa-solid fa-right-to-bracket me-1"></i> Login
              </Link>
              <Link className='btn btn-warning text-dark fw-semibold mx-1' to='/Signup'>
                <i className="fa-solid fa-user-plus me-1"></i> Signup
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className='btn btn-danger'>
              <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
