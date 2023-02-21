import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";

const CreatePlaylist = () => {
  const [user] = useAuthState(auth);
  const [Songs, setSongs] = useState([]);
  const songCollectionRef = collection(db, "songs");
  const [search, setSearch] = useState("");
  const [AddedSongs, setAddedSongs] = useState([]);

  useEffect(() => {
    const GetSongs = async () => {
      const data = await getDocs(songCollectionRef);
      setSongs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    GetSongs();
  }, []);

  console.log(AddedSongs);

  const makePlayList = async (e) => {
    e.preventDefault();
    const playlistCollectionRef = collection(db, "Playlists");
    const name = e.target[0].value;
    const description = e.target[1].value;
    const songs = AddedSongs;

    try {
      addDoc(playlistCollectionRef, {
        name: name,
        description: description,
        songs: songs,
        author: {
          name: user.displayName,
          id: user.uid,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreatePlaylist">
      <h1>CreatePlaylist</h1>

      <form onSubmit={makePlayList}>
        <input type="text" placeholder="Playlist Name" />
        <input type="text" placeholder="Playlist Description" />
        <button type="submit">Create Playlist</button>
      </form>

      <div>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        {Songs.filter((song) => {
          if (search == "") {
            return song;
          } else if (song.name.toLowerCase().includes(search.toLowerCase())) {
            return song;
          }
        }).map((song) => (
          <button
            onClick={() => {
              if (AddedSongs.includes(song.id)) {
                setAddedSongs(AddedSongs.filter((id) => id !== song.id));
                return;
              } else {
                setAddedSongs([...AddedSongs, song.id]);
              }
            }}
          >
            {song.name} by {song.artist}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreatePlaylist;
