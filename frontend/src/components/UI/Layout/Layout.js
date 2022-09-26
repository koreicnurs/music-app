import React from 'react';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import './Layout.css';
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout = (props) => {
  return (
    <>
        <AppToolbar/>
        <main className="Content-Layout">{props.children}</main>
    </>
  );
};

export default Layout;