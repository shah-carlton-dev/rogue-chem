import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext.js";

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
		<Navbar sticky="top" bg="light" variant="light" className="navbar">
			<Navbar.Brand className="mr-auto logo-nav">Rogue Chem</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link as={Link} to="/home"> Home </Nav.Link>
				{userData && userData.user && userData.user.admin
					? <>
						<Nav.Link as={Link} to="/file-management">File Management</Nav.Link>
						<Nav.Link as={Link} to="/course-management">Course Management</Nav.Link>
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