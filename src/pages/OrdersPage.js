import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import OrderCard from '../components/OrderCard';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrdersPage() {

	const { user } = useContext(UserContext);

	const [orderItems, setOrderItems] = useState([]);
	const [orders, setOrders] = useState([]);

	const fetchOrder = () => {
		fetch('https://green-site-by-joe.herokuapp.com/orders/user-orderList', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
		})
		.then(res => res.json())
		.then(data => {
			setOrderItems(data);
		})
	}

	useEffect(() => {
		fetchOrder();
	}, [])

	useEffect(() => {

		const ordersArr = orderItems.map(order => {

			return <OrderCard key={order._id} orderProp={order} />
			
		}) 

		setOrders(ordersArr)

	},[orderItems])

	return(

		<>
			<h1>Order History</h1>
			{ orders }
		</>


		)
}