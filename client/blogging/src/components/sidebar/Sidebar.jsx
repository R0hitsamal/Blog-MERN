import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import useAuthStore from "../../../Store/authStore";
import "./Sidebar.css";

function Sidebar() {
  // const { logout } = useAuthStore();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { to: "/author/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
    { to: "/author/addnew", icon: "ri-pencil-ruler-2-line", label: "Add New Blog" },
    { to: "/author/myblogs", icon: "ri-book-line", label: "My Blogs" },
    { to: "/author/feed", icon: "ri-rss-line", label: "Feed" },
    { to: "/author/settings", icon: "ri-settings-5-line", label: "Settings" },
  ];
  return (
    <>
      {open ? (
        <div className="sidebar">
          <div className="sidebar-content">
            <button
              aria-label="Close Sidebar"
              className="sidebar-toggle"
              onClick={() => setOpen(false)}
            >
              <i className="ri-menu-fold-fill"></i>
            </button>

            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <i className={`${item.icon}`}></i>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="sidebar-footer">
            <Link to="/" className="logout-btn">
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="menu-button">
          <button onClick={() => setOpen(true)}>
            <i className="ri-menu-unfold-fill"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
