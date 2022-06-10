import { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() {

const { user, setUser } = useContext(UserContext);

	return (
		<Navbar bg="success" expand="md" variant="dark" className="mb-5">
			<Navbar.Brand className="ms-3" as={Link} to="/">GreenSite</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/products">Products</Nav.Link>
					{(user.accessToken !== null) ?
						<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						:
						<>
							<Nav.Link as={Link} to="/login">Login</Nav.Link>
							<Nav.Link as={Link} to="/register">Register</Nav.Link>
						</>
					}

				</Nav>
			</Navbar.Collapse>
		</Navbar>

		)
}

