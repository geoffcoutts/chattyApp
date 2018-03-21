import React, {Component} from 'react';

const NavBar = ({userCount}) => {
  return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="userCount">Users Online: {userCount}</span>
        </nav>
    );
};

export default NavBar;
