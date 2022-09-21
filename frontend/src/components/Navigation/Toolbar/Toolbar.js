import React from 'react';
import './Toolbar.css';
import {NavLink} from "react-router-dom";

const Toolbar = () => {
  return (
    <header className="Toolbar">
      <div className="Toolbar-Logo">
          <NavLink to='/' exact className='logo'>Logo</NavLink>
      </div>
    </header>
  );
};

export default Toolbar;