import React, { useContext, useState } from 'react';
import { UserContext, useUserContext } from '../../context/user';
import SignInBtn from '../Signin-button';
import './index.css';
// import Microsoft_image from '../../Image/temp1.jpg'

export default function Navbar() {
  const [user, setUser] = useContext(UserContext).user;
  const {logoutUser}=useUserContext();

  const Logout = async () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div class="navbar">
      <p class="logo_name">Code Wars App</p>
     {user ? 
    //  <img className="navbar_img" src={user.photoURL}
      (<div className='navbar_buttons'>
     {/* <button onClick={Logout} className='logoutButton'>Logout</button> */}
     <div className='signInBtn' onClick={Logout}>
        <p class="text_signin">Logout</p>   
    </div>
      <img className="navbar_img" src={user.photoURL}/></div>)
      :<SignInBtn/>}
    </div>
  )
}
