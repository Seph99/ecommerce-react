import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Button } from 'react-bootstrap';

export default function Home() {

	const { user } = useContext(UserContext);

	return (
			
			<>
				<div className="home-div">
					<h1 className="fs-1">Welcome to Green Site!</h1>
					<h5>Home of quality and fresh farm products</h5>
				</div>

				{user.isAdmin === true ?

					<Button className="fs-4 mt-3" variant="primary" as={Link} to="/products">Go to Dashboard</Button>

					:

					<>	
						{user.accessToken !== null ?
							<>
								<Button className="fs-4 mt-3" variant="primary" as={Link} to="/products">See our products</Button>
								<Button className="fs-4 mt-3 ms-3" variant="success" as={Link} to="/orders">Order History</Button>
							</>
							:

							<Button className="fs-4 mt-3" variant="primary" as={Link} to="/products">See our products</Button>

						}
					</>

				}
			</>

		)


}


