import React, { useContext } from 'react'
// import { UserContext } from '../../context/user';
import "./style.css";
import Comment from '../comment';
import { db, storage } from '../../firebase';
import CommentInput from '../comment-input';
import { UserContext } from '../../context/user';

export default function Post({profileUrl, username
    ,id,photoURL, caption, comments}) {
  const [user,setUser] = useContext(UserContext).user;

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
        <button onClick={deletePost} className='post__deleteButton'> Delete</button>
      </div>
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
        {console.log('comments here--',comments)}
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
