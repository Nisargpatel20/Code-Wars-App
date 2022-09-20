import React, { useContext } from 'react'
import { UserContext } from '../../context/user';
import { signInwithGoogle } from '../../services/auth';
import './index.css'

export default function SignInBtn() {
  const [user, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInwithGoogle();
    if (userBySignIn) setUser(userBySignIn);
    // console.log(userBySignIn);
  };
  return (
    <div className='signInBtn' onClick={signInBtnClick}>
        <p>SignIn with Google</p>
      
    </div>
  )
}
