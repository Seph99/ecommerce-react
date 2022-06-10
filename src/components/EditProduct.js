import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditCourse({ product, fetchData }){

	const [ showEdit, setShowEdit ] = useState(false);

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const openEdit = (productId) => {
		fetch(`https://green-site-by-joe.herokuapp.com/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setShowEdit(true)

	}

	const closeEdit = () => {
		setShowEdit(false);
		
		setName('');
		setDescription('');
		setPrice(0);
	}

	// Function to change or update the specific course
	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`https://green-site-by-joe.herokuapp.com/products/${productId}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`	
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Product info has been successfully updated."){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully updated'
				})

				fetchData()
				closeEdit()
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Please try again'
				})
				fetchData()
				closeEdit()
			}

		})


	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>

		<Modal show={showEdit} onHide={closeEdit}>
			<Form onSubmit ={e => editProduct(e, productId)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Product</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control 
						      type="text"
						      required
						      value={name}
						      onChange={e => setName(e.target.value)}
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control 
						      type="text"
						      required
						      value={description}
						      onChange={e => setDescription(e.target.value)}
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control 
						      type="number"
						      required
						      value={price}
						      onChange={e => setPrice(e.target.value)}
						 />
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={closeEdit}>Cancel</Button>
					<Button variant="success" type="submit">Submit</Button>
				</Modal.Footer>

			</Form>
		</Modal>
		</>

		)
}