import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import "./Sidebar.css";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";
function Sidebar({user}) {
  const [open, setOpen] = useState(true);
  const {setIsLoggedIn} = useAuth();
  const menuItems = [
    {to: `/myblogs/${user.username}`, icon: "fa-solid fa-book", label: "My Blogs"},
    {to: "/new", icon: "fa-solid fa-pen", label: "Add New Blog"},
    {to: `/settings/${user.id}`, icon: "fa-solid fa-gear", label: "Settings"},
  ];

  return (
    <>
      {open ? (
        <div className="sidebar">
          <div className="sidebar-content">
            <Typography variant="h6" component="div">
              <div
                style={{
                  display: "flex",
                  fontSize: "1.5rem",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <i
                  style={{paddingBottom: 4, color: "rgb(17, 133, 235)"}}
                  className="fa-solid fa-blog"
                ></i>
                <Link
                  style={{textDecoration: "none", color: "rgb(17, 133, 235)"}}
                  to="/"
                >
                  <p>GitaVerse</p>
                </Link>
              </div>
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "15px 20px",
                gap: "10px",
              }}
            >
              <i
                className="fa-solid fa-circle-user"
                style={{fontSize: "1.4rem", color: "black"}}
              ></i>
              <h1 style={{fontSize: "1.1rem", margin: 0}}>{user.username}</h1>
            </div>

            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({isActive}) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <i className={item.icon}></i>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div
            onClick={async () => {
              try {
                await axios.get("http://localhost:5000/api/user/logout", {
                  withCredentials: true,
                });
                setIsLoggedIn(false);
              } catch (err) {
                console.log("Error in logout", err);
              }
            }}
            className="sidebar-footer"
          >
            <Link to="/" className="logout-btn">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="menu-button">
          <button onClick={() => setOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
