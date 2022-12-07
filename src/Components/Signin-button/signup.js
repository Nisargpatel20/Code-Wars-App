import { useRef, } from "react"
import { useUserContext } from "../../context/user";

const Signup=()=>{
const emailRef=useRef();
const nameRef=useRef();
const psdRef=useRef();

// const{regUser}=useContext(UserContext).user;
const{regUser}=useUserContext();


const onSubmit=(e)=>{
    e.preventDefault();
    const email=emailRef.current.value;
    const name=nameRef.current.value;
    const pwd=psdRef.current.value;
    if (email && name && pwd ) regUser(email,name,pwd);
};

return(
<div className="form">
    <h2>New User</h2>
    <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef}/>
        <input placeholder="Name" type="name" ref={nameRef}/>
        <input placeholder="Password" type="password" ref={psdRef}/>
        <button className="login_button" type="submit">Register</button>
    </form>
</div>
);
};

export default Signup;
