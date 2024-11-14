import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bottom-0 bg-primary p-5 w-100 '>
     <div className='row text-light'>
        <div className="col-4">      
          <Link style={{fontSize:'30px'}} className=' ms-5 text-light text-decoration-none fw-bolder' to={'/'}><i class="fa-solid fa-book-bookmark me-3"></i>Journal</Link>
          <p className='ms-5 mt-3 pe-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque illum quia nemo qui voluptates. Harum sapiente doloremque.</p>
          <p className='mt-3 ms-5'>Journal 2024 © All Rights Reserved®</p>
        </div>
        <div className="col-4 d-flex flex-column align-items-center justify-content-center ">
        <h3 className='text-light'>Links</h3>
       <div>
          <p>Home</p>
          <p>Register</p>
          <p>Login</p>
       </div>
       </div>
        <div className="col-4 ">
          <h3>Contact Us</h3>
<div className='d-flex'>
            <input className='form-control w-50 me-3' type="text" placeholder='enter email'/>
            <button className='btn btn-light'><i class="fa-solid fa-arrow-right text-primary"></i></button>
</div>
<div className="d-flex mt-3">
<i class="fa-brands fa-facebook ms-2 me-5"></i>
<i class="fa-brands fa-whatsapp me-5"></i>
<i class="fa-brands fa-instagram me-5"></i>
<i class="fa-brands fa-x-twitter"></i>
</div>
        </div>
     </div>
    </div>
  )
}

export default Footer