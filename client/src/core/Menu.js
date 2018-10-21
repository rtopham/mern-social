import React from 'react'
import {Navbar, Nav, NavItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {withRouter} from 'react-router-dom'

const Menu = withRouter(({history}) => (
<Navbar fixedTop>

<Nav activeHref={history.location.pathname}>
  <NavItem href="/">Home</NavItem>

  <NavItem href="/users">Users</NavItem>


</Nav>
<Nav activeHref={history.location.pathname} pullRight>
  {
        !auth.isAuthenticated() && (
          <NavItem href="/signup">Sign Up</NavItem>
        )
  }
    {     
        !auth.isAuthenticated() && (
          <NavItem href="/signin">Sign In</NavItem>
          
        )
    }
      
 
       {
        auth.isAuthenticated() && (
          <NavItem href={"/user/" + auth.isAuthenticated().user._id}>My Profile</NavItem>

        ) 
        }
        {auth.isAuthenticated() && (<NavItem eventKey={6} onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</NavItem>)
        }
</Nav>

</Navbar>


))

export default Menu
