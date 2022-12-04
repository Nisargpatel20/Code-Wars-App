import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user';
import SignInBtn from '../Signin-button'
import "./style.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import makeid from '../../helper/functions';
import { db, storage } from '../../firebase';
import { upload } from '@testing-library/user-event/dist/upload';
import firebase from "firebase/compat/app";
const vision = require('react-cloud-vision-api');
vision.init({auth: 'AIzaSyCr8EKEbY5-sqcQqxmwRcz4-AxvLGGLy20'});

export default function CreatePost() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [landmark, setLandmark] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");


  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);


  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        const req = new vision.Request({
          image: new vision.Image({
            base64: fileReader.result,
          }),
          features: [
            new vision.Feature('TEXT_DETECTION', 4),
            new vision.Feature('LABEL_DETECTION', 10),
            new vision.Feature('LANDMARK_DETECTION')
          ]
        })
        vision.annotate(req).then((res) => {
          // handling response
          const temp = JSON.stringify(res.responses);
          const labels = res.responses[0].labelAnnotations;
          const landmark = res.responses[0].landmarkAnnotations[0].description;
          const longitude = res.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude;
          const latitude = res.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude;

          setLongitude(longitude);
          setLatitude(latitude);
          setLandmark(landmark);
          var arr = [];
          labels.forEach((label => 
            arr.push(label.description)));
            arr = arr.map(i => '#' + i);
            var newArray = arr.join(" ").replace(",",' ');
            setCaption(newArray);
        }, (e) => { 
          console.log('Error: ', e)
        })
      };        
    }
  };
  const handleUpload = () => {
    if(image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on("state_changed",(snapshot) =>{
        //progress function
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgress(progress);


      },(error) => {
        console.log(error);
      },() => {
        

        storage.ref('images').child(`${imageName}.jpg`).getDownloadURL()
        .then((imageUrl) =>{
          db.collection("posts").add({
            timestamp: 
            firebase.firestore.FieldValue.serverTimestamp(),
            hashtags: caption,
            photoUrl: imageUrl,
            landmark: landmark,
            longitude: longitude,
            latitude:latitude,
            username: user.email.replace("@gmail.com",""),
            profileUrl: user.photoURL,
            comments: []
          });
        });
        setCaption("");
        setLandmark("");
        setProgress(0);
        setImage(null);

        document.getElementById("image-preview").style.display = "none";
      });
    }
  };
  return (
    <div className='createPost'>
      {user ? (
        <div className='createPost_loggedIn'>
          <div className="createAPost__Top">

          <p>Create Post</p>
          </div>
          <div className='createPost_loggedInCenter'>
            <textarea 
            id="createPost__textarea"
            className='createPost_textarea' 
            rows="2"
            placeholder='Enter Caption And Hashtags Here ..'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <textarea 
            id="createPost__landmark"
            className='createPost_landmark' 
            rows="1"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            ></textarea>
            <div className="createPost_imagePreview">
              <img id="image-preview" alt=""/>
            </div>
          </div>
        <div className='createPost_loggedInBottom'>
          <div className='createPost_imageUpload'>
            <label htmlFor="fileInput">
              <AddAPhotoIcon style={{curson:"pointer", fontsize:"20px"}}/>
            </label>
            <input 
             id="fileInput" 
             type="file" 
             accept="image/*"
             onChange={handleChange}
             />
          </div>
          <button className='createPost_uploadBtn' onClick={handleUpload} style={{color: caption ? "#000": "lightgrey"}}>
            {`Upload ${progress != 0 ? progress : "" }`}
          </button>
        </div>
      </div>
      ):(
        <div>
        {/* <SignInBtn/> */}
        <p style={{ marginLeft: "12px" }}>to Post & Comment</p>
      </div>)}
      
    </div>
  )
}
