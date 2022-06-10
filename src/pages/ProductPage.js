
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';

export default function ProductPage() {

	const [ allProducts, setAllProducts ] = useState([])

	const fetchData = () => {

		fetch('https://green-site-by-joe.herokuapp.com/products/all')
		.then(res => res.json())
		.then(data => {
			setAllProducts(data);
		});
	};

	useEffect(() => {
		fetchData()
	},[])

	const { user } = useContext(UserContext);

	return(
		<>
			<h1>Products</h1>
			{(user.isAdmin === true) ?
				<AdminView productsData={allProducts} fetchData={fetchData}/>
				:
				<UserView productsData={allProducts} />
			}

		</>

		)
}