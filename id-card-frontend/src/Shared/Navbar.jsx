import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const menuList = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/all-card">All Card</NavLink>
      <NavLink to="/add-card">Add New Card</NavLink>
    </>
  );
  return <div className="py-4 bg-slate-200 flex items-center justify-center">
    <ul className="space-x-4">
        {menuList}
    </ul>
  </div>;
};

export default Navbar;
