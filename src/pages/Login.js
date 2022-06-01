import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {

	const navigate = useNavigate();

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [buttonIsActive, setButtonIsActive] = useState(true);

	useEffect(() => {
		if (email !== '' && password !== '') {
			setButtonIsActive(true);
		} else {
			setButtonIsActive(false);
		};

	}, [email,password]);

	function authentication(e) {
		e.preventDefault();

		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {

			if (data.accessToken !== undefined) {
				localStorage.setItem('accessToken', data.accessToken);
				setUser({
					accessToken: data.accessToken
				})

				Swal.fire({
					title: 'Yay',
					icon: 'success',
					text: 'You are now logged in!'
				})

				fetch('http://localhost:4000/users/profile', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {
					if(data.isAdmin === true){
						localStorage.setItem('isAdmin', data.isAdmin);	
						setUser({
							isAdmin: data.isAdmin
						});
						navigate('/products');
					} else {
						navigate('/');
					};
				})



			}

		})


	}





	return (

		<Form onSubmit = {e => authentication(e)}>
			<h1>Login</h1>
			<Form.Group>
				<Form.Label for="email">Email Address</Form.Label>
				<Form.Control 
	                type="email"
	                placeholder="Your email"
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
				<Form.Label>Password</Form.Label>
				<Form.Control 
	                type="password"
	                placeholder="Your password"
	                required
	      			value={password}
                    onChange={e => setPassword(e.target.value)}
				    />
			</Form.Group>

			{ buttonIsActive ?
				<Button variant="primary" type="submit" className="mt-3">
					Submit
				</Button>
				:	
				<Button variant="primary" type="submit" className="mt-3" disabled>
					Submit
				</Button>
			}	
		</Form>

		)


}