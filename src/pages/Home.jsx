import React from 'react'
import { Card } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import img from '../assets/download2.png'
import Testimonials from '../components/Testimonials'
import Features from '../components/Features'

const Home = () => {
  return (
    <>
      <Header signup={true} />
      <div style={{ minHeight: "100vh" }} className='text-light  rouned bg-primary '>
        <section className=" h-100  w-100 ">
          <div className=" d-flex flex-column justify-content-center align-items-center text-center">
            <img src={img} alt="" />
            <h1 className='fs-1 mb-3 text-light'>Capture your thoughts,
              <br /> memories, and ideas all in one place.</h1>
            <p className='px-5 fs-5 mx-5  w-50' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi temporibus velit corporis expedita facilis, assumenda soluta, est quo sunt veritatis nemo officia suscipit provident obcaecati quis esse pariatur quibusdam ipsam.</p>
            <Link to={'/register'}>
              <button className='btn btn-success'>Start Journaling</button>
            </Link>             
             </div>
        </section>
        <section className='text-center '>
          <h1>Features</h1>
          <Features/>
        </section>
        <section className='w-100 d-flex justify-content-center align-items-center border-bottom'>
          <Testimonials/>
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default Home