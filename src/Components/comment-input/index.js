import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import { db } from '../../firebase';
import "./style.css";

export default function CommentInput({comments, id}) {
    console.log("--id is--",id);
    const [user,setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState(comments ?
         comments : []);

    const addComment =() =>{
        console.log("--comment here---",comment, user);
        if(comment != ""){
            commentArray.push({
                comment: comment,
                username: user.email
                .replace("@gmail.com","")
                .toLowerCase(),
            });

            db.collection("posts").doc(id).update({
                comments: commentArray,
            }).then(function(){
                setComment("");
                console.log("--comment added--");
            }).catch(function(error){
                console.log(`Error ${error}`);
            });
        }
    };
  return (
    <div className='commentInput'>
        <textarea className='commentInput_textarea' 
        rows="1"
        placeholder='write a commnet..'
        value ={comment}
        onChange={(e) => setComment(e.target.value)}
        >

        </textarea>
        <button onClick={addComment} 
        className='commetInput_button'>Post</button>
    </div>
  )
}
