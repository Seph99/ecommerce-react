import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, InputGroup, Row, Col} from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function SpecificProduct() {

	const navigate = useNavigate();

	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);


	useEffect(() => {

		fetch(`https://green-site-by-joe.herokuapp.com/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

	}, [])

	const { user } = useContext(UserContext);

	const addToCart = (productId) => {

		fetch('https://green-site-by-joe.herokuapp.com/users/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity 
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Added to cart successfully.") {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Added to cart'
				})
				navigate('/products')
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong. Try again.'
				})
			}
		})
	}

	const decrement = () => {
		if(quantity > 1) {
			setQuantity(prevCount => prevCount - 1)
		}
	}

	const increment = () => {	
		setQuantity(prevCount => prevCount + 1)
	}


	return(

		<Container>
			<Card>
				<Card.Header>
					<h4>{name}</h4>
				</Card.Header>

				<Card.Body>
					<Card.Text>{description}</Card.Text>
					<h6>Price: Php {price} </h6>
				</Card.Body>

				<Row>
					<Col md={3}>
						<p className="ms-3 mb-1">Quantity:</p>
						<InputGroup className="mb-3 cart-button ms-3">
						  <Button variant="primary" onClick={decrement}>-</Button>
						  <div className="form-control text-center" type="number">{quantity}</div>
						  <Button variant="primary" onClick={increment}>+</Button>
						</InputGroup>
					</Col>
				</Row>

				<Card.Footer>
				{ user.accessToken !== null ?

					<Button variant="success" onClick={() => addToCart(productId)}>Add to cart</Button>

					:

					<Button variant="success" as={Link} to="/login">Login to add this to cart</Button>
				}

				</Card.Footer>
			</Card>
		</Container>


		)



}