import React from 'react'
import { Outlet } from "react-router-dom";
import {StyledLink, Nav} from '../stiled';


function Layout() {
  return (
    <div>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </Nav>
      <Outlet />
    </div>
  )
}

export default Layout
