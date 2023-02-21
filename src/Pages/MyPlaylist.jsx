import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
import { addDoc, query, where, getDocs, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const MyPlaylist = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "users");
  const playlistCollectionRef = collection(db, "Playlists");
  const [playlist, setPlaylist] = useState([]);
  const getPlaylists = async () => {
    const data = await getDocs(playlistCollectionRef);
    setPlaylist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylistsOfUser = async () => {
    const q = query(userCollectionRef, where("author.id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getPlaylistsOfUser();
  }, []);

  return <div>MyPlaylist</div>;
};

export default MyPlaylist;
