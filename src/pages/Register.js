import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate, Link } from 'react-router-dom'


export default function Register() {

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verifyPassword, setVerifyPassword ] = useState('');
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if((email !== '' && password !== '' && verifyPassword !== '') && (password === verifyPassword)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, verifyPassword]);


	function registerUser(e) {
		e.preventDefault();

		fetch('https://green-site-by-joe.herokuapp.com/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {

			if (data) {
				Swal.fire({
					title: 'Yay!',
					icon: 'success',
					text: 'You have successfully registered! You may now login.'
				});

				navigate('/login');

			} else {
				Swal.fire({
					title: 'Oops',
					icon: 'error',
					text: 'Something went wrong. Check your credentials.'
				});
			};
		});
		setEmail('');
		setPassword('');
		setVerifyPassword('');
	};

	return(

		(user.accessToken !== null) ?

		<Navigate to="/courses" />

		:

		<Form onSubmit={e => registerUser(e)}>
			<h1>Register</h1>
			<Form.Group>
				<Form.Label htmlFor="email">Email Address</Form.Label>
				<Form.Control 
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="email"
				    />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else
				</Form.Text>
			</Form.Group>

			<Form.Group>
				<Form.Label htmlFor="password">Password</Form.Label>
				<Form.Control 
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
				    />
			</Form.Group>

			<Form.Group>
				<Form.Label htmlFor="verifyPassword">Verify Password</Form.Label>
				<Form.Control 
                    type="password"
                    placeholder="Verify password"
                    required
                    value={verifyPassword}
                    onChange={e => setVerifyPassword(e.target.value)} 
                    id="verifyPassword"                 
				    />
				<Form.Text className="text-muted">
					Already have an account? Login <Link to="/login" className="text-decoration-none">here.</Link>
				</Form.Text>
			</Form.Group>

			{isActive ? 

				<Button variant="primary" type="submit" className="mt-3">Submit</Button>
				:
				<Button variant="primary" type="submit" className="mt-3" disabled>Submit</Button>
			}
		</Form>	

		)
}