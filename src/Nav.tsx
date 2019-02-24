import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './Nav.css';

const Nav = () =>
  <div className="Title">
    <Link to="/" className="home">$ checkoutthislineinmy </Link>
    <Link to="/browse" className="option">--browse </Link>
    <Link to="/share" className="option">--share</Link>
  </div>

export default Nav;
