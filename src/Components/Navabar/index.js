import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import SignInBtn from '../Signin-button';
import './index.css';

export default function Navbar() {
  const [user, setUser] = useContext(UserContext).user;

  return (
    <div class="navbar">
      <p class="logo_name">Code Wars App</p>
     {user ? <img className="navbar_img" src={user.photoURL}/> :<SignInBtn/>}
    </div>
  )
}
