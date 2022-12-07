import {React,useContext} from 'react';
import { CreatePost } from '../../Components';
import Feed from '../../Components/feed';
import Navbar from '../../Components/Navabar';
import { useUserContext, UserContext } from '../../context/user';
import SwitchPage from '../../services/email/signauth';
import './index.css';

export default function Home() {
  // const {user} = useUserContext();
  const [user, setUser] = useContext(UserContext).user;

  console.log('---user--',user);
  return (
    <div className='home'>
        <Navbar/>  
        {/* <SwitchPage/> */}
        
        {user?( <div className='app_body'>
           <CreatePost/> 
          <Feed/>
       </div>):<SwitchPage/>}
       {/* {user?<SwitchPage/>:( <div className='app_body'>
           <CreatePost/> 
          <Feed/>
       </div>)} */}

     
    </div>
  )
}
