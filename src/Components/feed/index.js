import { dblClick } from '@testing-library/user-event/dist/click';
import React, { useState, useEffect } from 'react';
import Post from '../post';
import "./style.css";
import {db} from "../../firebase";
// import { useEffect, useState } from 'react';


export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    db.collection("posts").onSnapshot((snapshot) =>
    {
      setPosts(snapshot.docs.map((doc) =>({id: 
        doc.id, post: doc.data()})));
    });
  }, [])
  return (
    <div className='feed'>
      <div className="feed__posts">

        {
        posts.map(({id,post}) => {
          return (
          <Post
          key={id}
          id={id}
          profileUrl={post.profileUrl}
          username={post.username}
          photoURL={post.photoUrl}
          caption={post.hashtags}
          comments={post.comments}
          />
        );
        })}
      </div>
    </div>
  );
}
