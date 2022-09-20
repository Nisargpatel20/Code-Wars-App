import {auth, provider} from "../firebase";
require('firebase/auth')


export const signInwithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider)
    .then((res) => {
        console.log(res.user);
        user = res.user;
    })
    .catch((error) => {
        console.log(error)
    });

    return user;
}

export const logout = async() => {
    let logout_sucess;
    await auth.sinOut()
    .then(() =>{
        logout_sucess = true;
    }).catch((error)=> {
        console.log(error.message);
    });

    return logout_sucess;
}