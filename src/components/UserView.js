import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import ProductCard from './ProductCard';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserView({productsData}) {

	const [products, setProducts] = useState([])

	const { user } = useContext(UserContext);

	useEffect(() => {

		const productsArr = productsData.map(product => {
			if(product.isActive === true) {
				return(
					<ProductCard key={product._id} productProp={product}/>
					)
			} else {
				return null;
			}
		}) 

		setProducts(productsArr)

	},[productsData])

	return(

		<>
			{ user.accessToken !== null ?
				<div className="sticky-top text-center">
					<Button variant="warning" className="btn-lg fs-2" as={ Link } to={'/cart'}>Go to Cart</Button>
				</div>

				:

				null
			}

			{ products }
		</>


		)
}