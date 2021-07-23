import React from 'react';
import { Component} from 'react'
import { NavLink } from 'react-router-dom';
import './App.css';
import {Navbar,Nav } from 'react-bootstrap';


export class NavMenu extends Component{

  render(){
    return(
      <div>
        <Navbar collapseOnSelect="true" expand="lg" style={{backgroundImage:'linear-gradient(270deg,#1638aa,#005cc0,#007aca,#0096cb,#2bafca)', Height:'70%'}}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{marginLeft: "0px"}}>

          <Nav className="mr-auto">
            { localStorage.getItem('token') &&
              <>
                {/* <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link> */}
                <Nav.Link as={NavLink} to="/production_form" className='font-weight-class'>Production Entry</Nav.Link>
                <Nav.Link as={NavLink} to="/productions" className='font-weight-class'>Productions</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" onClick={this.logout} className='font-weight-class'>Logout</Nav.Link>
              </>
            }

            { (localStorage.getItem('token') == undefined || localStorage.getItem('token') == null || localStorage.getItem('token') == "") &&
              <>
                <Nav.Link as={NavLink} to="/signup">Singup</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </>
            }

          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

  logout = () => {
    localStorage.setItem("token", "")
    window.location.href = "/login"
  }
}

export default NavMenu
