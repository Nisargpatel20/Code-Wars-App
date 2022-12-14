import React, { useContext } from 'react'
import { UserContext } from '../../context/user';
import { signInwithGoogle } from '../../services/google/auth';
import './index.css'

export default function SignInBtn() {
  const [user, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInwithGoogle();
    if (userBySignIn) setUser(userBySignIn);
  };
  return (
    <div className='signInBtn' onClick={signInBtnClick}>

      
       
        <p class="text_signin">SignIn with Google</p>
      
    </div>
  )
}
