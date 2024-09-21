import React from 'react'
import Header from '../custom/Header'
import Hero from '../../hero'
import HeroSection from '../../hero'

const Home = () => {

  return (
    <>

      <Header />
      <div className='h-screen text-black'>
        <Hero />
      </div>
    </>
  )
}

export default Home