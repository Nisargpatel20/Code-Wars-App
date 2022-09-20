import React from 'react';
import { CreatePost } from '../../Components';
import Navbar from '../../Components/Navabar';
import './index.css';
// import SignInBtn from '../../Components/Signin-button'

export default function Home() {
  return (
    <div className='home'>
        <Navbar/>     
        <CreatePost/> 
    </div>
  )
}
