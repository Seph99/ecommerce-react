import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function RemoveFromCart({ cartItemId, fetchCart}) {
	
	const removeFromCart = (itemId) => {
		fetch(`https://green-site-by-joe.herokuapp.com/users/cart/remove/${itemId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully removed'

				})
				fetchCart()
			} else {
				Swal.fire({	
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})
				fetchCart()
			}
		})

	}


	return(

		<>
			
			<Button className="d-block m-auto" variant="danger" size="sm" onClick={() => removeFromCart(cartItemId)}>Remove</Button>
			
		</>

		)
}