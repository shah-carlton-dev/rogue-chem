import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext.js";
import logo from "../assets/navlogo.png";
import "../styles/Header.css";

const Header = () => {
	const history = useHistory();
	const { userData, setUserData } = useContext(UserContext);

	const logout = () => {
		localStorage.clear();
		setUserData({
			token: 0,
			user: {}
		});
		history.push("/login");
	}

	return (
		
		<Navbar sticky="top" className="navbar gradient">
			<Navbar.Brand className="mr-auto px-2 logo-nav"><img src={logo}></img></Navbar.Brand>
			<Nav className="ml-auto nav-text">
				<Nav.Link as={Link} to="/home"> Home </Nav.Link>
				{userData && userData.user && userData.user.admin
					? <>
						<Nav.Link as={Link} to="/file-management">File Management</Nav.Link>
						<Nav.Link as={Link} to="/course-management">Course Management</Nav.Link>
						<Nav.Link as={Link} to="/sampleRender"> Sample Render </Nav.Link>
					</>
					: <></>
				}

				{userData && userData.user && Object.keys(userData.user).length > 0
					? (<Nav.Link onClick={() => logout()} to="/login"> Logout </Nav.Link>)
					: (<Nav.Link as={Link} to="/login">Login</Nav.Link>)
				}
			</Nav>
		</Navbar>
	);
};

export default Header;