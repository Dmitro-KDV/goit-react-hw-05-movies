import React, { Suspense } from 'react'
import { RotatingLines } from  'react-loader-spinner'
import { Outlet } from "react-router-dom";
import {StyledLink, Nav} from '../stiled';


function Layout() {
  return (
    <div>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </Nav>
      <Suspense fallback={
        <div className="RotatingLines">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
        }>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout
