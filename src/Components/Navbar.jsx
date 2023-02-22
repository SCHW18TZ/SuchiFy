import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { addDoc, query, where, getDocs, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signUserOut = () => {
    signOut(auth);
  };

  //Create a playlist
  const createPlaylist = async () => {
    const playlistCollectionRef = collection(db, "Playlists");
    const id = v4().slice(0, 5);
    try {
      addDoc(playlistCollectionRef, {
        author: {
          usernamename: user.displayName,
          id: user.uid,
        },

        createdAt: serverTimestamp(),
        songs: [],
        playListId: id,
      });
      navigate(`/playlist/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <div></div>
      {user ? (
        <>
          <button onClick={createPlaylist}> Create A playlist</button>
          <div className="links">
            <Link to="/">Home</Link>
            <button onClick={signUserOut}> Sign Out</button>

            <Link to="/upload">Upload</Link>
          </div>
        </>
      ) : (
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
