import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../FirebaseConfig";
import "./Navbar.css";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
  return (
    <nav>
      <div className="logo">Zara</div>
      <ul>
        <img className="image"
          src="https://coverager.com/wp-content/uploads/2019/01/Zurich-UK.jpg"
          alt=""
        />
        <div className="username-box">
          <h2>{currentUser?.displayName}</h2>
          <button onClick={() => signOut(auth)}>LogOut</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
