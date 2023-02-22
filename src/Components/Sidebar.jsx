import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const messagesRef = collection(db, "Playlists");
  const [playlists, setplaylists] = useState([]);
  const [slidebar, setslidebar] = useState(false);
  const [user] = useAuthState(auth);
  const slidebarref = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("author.id", "==", user?.uid)
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setplaylists(messages);
    });

    return () => unsuscribe();
  }, []);

  const toggleSlideBar = () => {
    slidebarref.current.classList.toggle("closed");
    {
      slidebar ? setslidebar(false) : setslidebar(true);
    }
  };

  return (
    <div className="slidebar closed" ref={slidebarref}>
      <div className="brand">
        <h1>Suchify</h1>
        {!slidebar ? (
          <FontAwesomeIcon
            icon={faBars}
            color="white"
            className="icon"
            onClick={toggleSlideBar}
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            color="white"
            className="icon"
            onClick={toggleSlideBar}
          />
        )}
      </div>
      <div className="home-section">
        <Link to="/" className="home-button">
          <button>Home</button>
        </Link>
        <Link to="/search" className="search-button">
          <button>Search</button>
        </Link>
      </div>
      <div className="playlist-section">
        <h1>My Playlist</h1>
        <div>
          {playlists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`}>
              <p>{playlist.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
