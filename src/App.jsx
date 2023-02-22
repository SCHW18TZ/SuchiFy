import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import SongPage from "./Pages/SongPage";
import { getDocs, collection } from "firebase/firestore";
import UploadSong from "./Pages/UploadSong";
import { db } from "./firebase";
import Navbar from "./Components/Navbar";
import CreatePlaylist from "./Pages/CreatePlaylist";
import MyPlaylist from "./Pages/MyPlaylist";
import Sidebar from "./Components/Sidebar";

function App() {
  const [Songs, setSongs] = useState([]);
  const songCollectionRef = collection(db, "songs");
  const playlistCollectionRef = collection(db, "Playlists");
  const [Playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const data = await getDocs(playlistCollectionRef);
      setPlaylist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const GetSongs = async () => {
      const data = await getDocs(songCollectionRef);
      setSongs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    GetSongs();
    getPlaylists();
  }, []);

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/playlists" element={<MyPlaylist />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadSong />} />
        <Route path="/new" element={<CreatePlaylist />} />
        {Songs.map((song) => (
          <Route
            path={`/songs/${song.id}`}
            element={<SongPage song={song} />}
          />
        ))}
        {/* {Playlist.map((playlist) => (
          <Route
            path={`/playlist/${playlist.playListId}`}
            element={<CreatePlaylist playlist={playlist} />}
          />
        ))} */}
      </Routes>
    </Router>
  );
}

export default App;
