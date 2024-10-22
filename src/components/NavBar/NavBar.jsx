import React from 'react'
import classes from "./NavBar.module.css"

const NavBar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.leftHeader}>
        <div></div>
        <h2>Inventory Management System</h2>
      </div>
      <div className={classes.rightHeader}>
        <h2>Home</h2>
      </div>
    </nav>
  );
}

export default NavBar
