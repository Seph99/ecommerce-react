import { useState, useEffect } from 'react';

export default function FetchProductName({productId}) {

	const [productName, setProductName] = useState('');	

	const fetchProductName = (id) => {
		fetch(`https://green-site-by-joe.herokuapp.com/products/${ id }`)
		.then(res => res.json())
		.then(data => {
			setProductName(data.name);
		})
	}

	useEffect(() => {
		fetchProductName(productId);
	}, []);

	return(

		<p className="mb-0">{productName}</p>

		)
};