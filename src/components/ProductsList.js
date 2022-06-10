import { Card, Button, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FetchProductName from './FetchProductName';

export default function ProductsList({orderProducts}) {

	return(

		<div>
			{orderProducts.map((order) => (
	
				<div className="mb-0" key={order._id}>
					{<FetchProductName productId={order.productId}/>}
					<p>Quantity: {order.quantity}</p>
				</div>
				

				))	
			}

		</div>

		)
}







