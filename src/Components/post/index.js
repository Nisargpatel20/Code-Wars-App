import React, { useContext } from 'react'
// import { UserContext } from '../../context/user';
import "./style.css";
import Comment from '../comment';
import { db, storage } from '../../firebase';
import CommentInput from '../comment-input';
import { UserContext } from '../../context/user';

export default function Post({profileUrl, username
    ,id,landmark, photoURL, caption, comments,longitude, latitude}) {
  const [user,setUser] = useContext(UserContext).user;
  var same_user_post = false;
  if (user && user.email.replace("@gmail.com","") === username){
    same_user_post = true
  }
  const deletePost = () =>{
    var imageRef = storage.refFromURL(photoURL);
    imageRef.delete().then(function(){
    }).catch(function(error){
      console.log(`ERROR ${error}`)
    });

    db.collection("posts").doc(id)
    .delete().then(function(){
    }).catch(function(error){
      console.log(`ERROR post info delete ${error}`)
    });

  }
  return (
    <div className='post'>
      <div className='post__header'>
        <div className="post__headerleft">
          <img className="post__profilePicture" src={profileUrl}/>
          <p style={{marginLeft:"8px"}}>{username}</p>
        </div>
        
        {same_user_post?<button onClick={deletePost} className='post__deleteButton'> Delete</button>:<></>}

      </div>
      {landmark?<div className='post_landmark'>
      Landmark: <span className="landmark_name" onClick={()=> window.open("https://maps.google.com?q="+latitude+","+longitude, "_blank")}>{landmark}</span>
      </div>:<></>}
      <div className='post_center'>
        <img className='post_photoURL' src={photoURL}/>
      </div>
      <div>
        <p><strong style={{marginRight:'4px'}}>
          {username}
          </strong>
        {caption}</p>
      </div>
        {/* <div> */}
        {comments ? (
            comments.map((comment) => (
            <Comment username={comment.username} 
                    caption={comment.comment}/>
          ))
          ): (
          <></>
        )}

      {user?<CommentInput comments={comments} id={id}/>:<></>}
      {/* </div> */}
    </div>
  );
}
