import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="manage-party">Manage party</NavLink>
      </li>
      <li>
        <NavLink to="manage-languages">Manage languages</NavLink>
      </li>
    </nav>
  );
};

export default NavBar;
