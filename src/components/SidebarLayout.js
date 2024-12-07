import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./SidebarLayout.css";

const SidebarLayout = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/tac-gia" activeClassName="active">
              Tác Giả
            </NavLink>
          </li>
          <li>
            <NavLink to="/sach" activeClassName="active">
              Sách
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
