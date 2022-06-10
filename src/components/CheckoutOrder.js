import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function CheckoutOrder({total}) {
	
	const navigate = useNavigate();

	const checkoutOrder = () => {
		fetch(`https://green-site-by-joe.herokuapp.com/orders/checkout`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.message = "Checkout successful") {
				fetch(`https://green-site-by-joe.herokuapp.com/users/cart/empty`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`
					}
				})
				.then(res => res.json())
				.then(data => {
					Swal.fire({
						title: 'Success',
						icon: 'success',
						text: 'Checkout successful'
					})
					navigate('/orders');
				})

			} else {
				Swal.fire({	
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})
			}
		})

	}


	return(

		<>
			{total > 0 ?

			<div className="row mx-auto">
				<Button className="fs-3" variant="success" size="sm" onClick={checkoutOrder}>Checkout</Button>
			</div>

			:

			
			<p className="text-center fs-3">Your cart is empty.</p>
		

			}
			
		</>

		)
}