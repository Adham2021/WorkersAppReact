import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";


export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            ראשי
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/site">
                            אתרים
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                            עובדים
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/attendance">
                            נוכחות
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/expense">
                            הוצאות
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}