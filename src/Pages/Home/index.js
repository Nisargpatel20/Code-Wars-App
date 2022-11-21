import React from 'react';
import { CreatePost } from '../../Components';
import Feed from '../../Components/feed';
import Navbar from '../../Components/Navabar';
import './index.css';

export default function Home() {
  return (
    <div className='home'>
        <Navbar/>     
        <div className='app_body'>
          <CreatePost/> 
          <Feed/>
        </div>
    </div>
  )
}
