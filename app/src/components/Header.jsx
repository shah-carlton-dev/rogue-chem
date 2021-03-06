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
			token: 1,
			user: {}
		});
		history.push("/login");
	}

	return (

		<Navbar sticky="top" className="navbar gradient">
			<Navbar.Brand className="mr-auto px-2 logo-nav"><img src={logo}></img></Navbar.Brand>
			<Nav className="ml-auto nav-text">
				{userData.token !== 0 && userData.token !== 1
					? (<>
						{userData.user !== undefined &&
							<Navbar.Text className="pr-3">Welcome, {userData.user.fname} </Navbar.Text>
						}
						<Nav.Link onClick={() => logout()} to="/login"> Logout </Nav.Link>
					</>)
					: (<Nav.Link as={Link} to="/login">Login</Nav.Link>)
				}
			</Nav>
		</Navbar>
	);
};

export default Header;