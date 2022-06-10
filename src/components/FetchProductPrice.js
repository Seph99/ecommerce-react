import { useState, useEffect } from 'react';

export default function FetchProductPrice({productId}) {

	const [productPrice, setProductPrice] = useState('');	

	const fetchProductPrice = (id) => {
		fetch(`https://green-site-by-joe.herokuapp.com/products/${ id }`)
		.then(res => res.json())
		.then(data => {
			setProductPrice(data.price);
		})
	}

	useEffect(() => {
		fetchProductPrice(productId);
	}, []);

	return(

		<p>₱{productPrice}</p>

		)
};