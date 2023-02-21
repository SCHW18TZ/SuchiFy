import React from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const UploadSong = () => {
  const songCollectionRef = collection(db, "songs");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const uploadSong = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const artist = e.target[1].value;
    const file = e.target[2].files[0];

    try {
      const SongRef = ref(storage, `Songs/${file.name}`);
      uploadBytes(SongRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(songCollectionRef, {
            author: {
              name: user.displayName,
              id: user.uid,
            },
            artist: artist,
            name: name,
            url: url,
            createdAt: serverTimestamp(),
          });
        });
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/");
  };

  return (
    <div className="UploadSong">
      <form onSubmit={uploadSong}>
        <input type="text" placeholder="Song Name" />
        <input type="text" placeholder="Song Artist" />
        <input type="file" accept="audio/*" name="" id="" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadSong;
