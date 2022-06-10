import { Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


export default function ChangeQuantity({ cartItemId, productId, quantityItem, fetchCart}) {
	
	const [quantity, setQuantity] = useState(quantityItem);

	const decrement = () => {
		if(quantity > 1) {
			setQuantity(prevCount => prevCount - 1)
		}
	}

	const increment = () => {	
		setQuantity(prevCount => prevCount + 1)
	}

	const changeQuantity = (itemId) => {
	
		fetch(`https://green-site-by-joe.herokuapp.com/users/cart/${itemId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity,
			})	 
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				fetchCart();
			} else {
				fetchCart();
			}
		})

	}

	return(
		<>
			<Row>
				<Col>
					<InputGroup className="mb-3 cart-button mx-auto">
					  <Button variant="dark" onClick={decrement}>-</Button>
					  <div className="form-control text-center" type="number">{quantity}</div>
					  <Button variant="dark" onClick={increment}>+</Button>
					</InputGroup>
				</Col>
			</Row>

			{quantityItem !== quantity ?

			<div className="d-flex justify-content-center">
				<Button variant="warning" onClick={() => changeQuantity(cartItemId) }>Apply change</Button>
			</div>

			:

			<div className="d-flex justify-content-center">
				<Button variant="secondary" onClick={() => changeQuantity(cartItemId)} disabled>Apply change</Button>
			</div>	

			}

		</>

		)
}