import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
const Home = () => {
  const userCollectionRef = collection(db, "users");
  const songCollectionRef = collection(db, "songs");
  const [Song, setSong] = useState([]);
  const [Playlist, setPlaylist] = useState([]);

  const getSongs = async () => {
    const data = await getDocs(songCollectionRef);
    data.forEach((doc) => {
      setSong(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const getPlaylists = async () => {
    const data = await getDocs(userCollectionRef);
    data.forEach((doc) => {
      setPlaylist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getPlaylists();
    getSongs();
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="song-list">
        {Song.map((song) => (
          <div className="song" key={song.id}>
            <Link to={`/songs/${song.id}`}>
              <h2>{song.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
