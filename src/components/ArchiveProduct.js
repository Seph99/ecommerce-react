import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function ArchiveProduct({ product, isActive, fetchData}) {
	
	const archiveToggle = (productId) => {
		fetch(`https://green-site-by-joe.herokuapp.com/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Product has been successfully made inactive") {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully disabled'

				})
				fetchData()
			} else {
				Swal.fire({	
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})
				fetchData()
			}
		})

	}

	const activateToggle = (productId) => {
		fetch(`https://green-site-by-joe.herokuapp.com/products/${productId}/unarchive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Product has been successfully made active") {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully enabled'

				})
				fetchData()
			} else {
				Swal.fire({	
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})
				fetchData()
			}
		})


	}

	return(

		<>
			{isActive ?

				<Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Disable</Button>

				:

				<Button variant="success" size="sm" onClick={() => activateToggle(product)}>Enable</Button>

			}
			
		</>

		)
}