import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import RemoveFromCart from '../components/RemoveFromCart';
import FetchProductName from '../components/FetchProductName';
import FetchProductPrice from '../components/FetchProductPrice';
import CheckoutOrder from '../components/CheckoutOrder';
import ChangeQuantity from '../components/ChangeQuantity';

export default function CartPage() {

	const [cartItems, setCartItems] = useState([]);
	const [cart, setCart] = useState([]);
	const [productName, setProductName] = useState('');
	const [total, setTotal] = useState(0);

	const fetchCart = () => {
		fetch('https://green-site-by-joe.herokuapp.com/users/cart', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
		})
		.then(res => res.json())
		.then(data => {
			setCartItems(data);
		})
	}

	useEffect(() => {
		fetchCart();
	}, [])
	
	let totalAmount = 0;

	const totalComputation = () => {
		for (let i = 0; i < cartItems.length; i++) {
			totalAmount += cartItems[i].subtotal;
		}
		setTotal(totalAmount);
	}


	useEffect(() => {

		totalComputation();

		const cartArr = cartItems.map(cartItem => {
			return(
				<tr key={cartItem._id}> 
					{/*<td>{cartItem._id}</td>
					<td>{cartItem.productId}</td>*/}
					<td className="text-center"><FetchProductName productId={cartItem.productId} /></td>
					<td className="text-center"><FetchProductPrice productId={cartItem.productId} /></td>
					<td><ChangeQuantity productId={cartItem.productId} cartItemId={cartItem._id} fetchCart={fetchCart} quantityItem={cartItem.quantity} /></td>		
					<td className="text-center">₱{cartItem.subtotal}</td>
					<td><RemoveFromCart cartItemId={cartItem._id} fetchCart={fetchCart}/></td>
				</tr>
				) 
		})
		setCart(cartArr)
		
	},[cartItems])

	return(
		<>
			<h1>Cart</h1>
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr className="text-center">
						{/*<th>ObjectID</th>
						<th>ProductID</th>*/}
						<th >NAME</th>
						<th>PRICE</th>
						<th>QUANTITY</th>
						<th>SUBTOTAL</th>
						<th>ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{ cart }
					<tr>
						<td colSpan="4"><CheckoutOrder total={total}/></td>
						<td colSpan="2" className="fs-3">Total: ₱{total }</td>
					</tr>
				</tbody>
			</Table>
		</>

		)
}