import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

	const { _id, name, description, price } = productProp;

	return(
		<Card className="mt-3">
			<Card.Body>
				<Card.Title>{ name }</Card.Title>

				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text>{ description }</Card.Text>

				<Card.Subtitle className="text-danger">Price:</Card.Subtitle>
				<Card.Text className="text-danger">₱{ price }</Card.Text>

				<Button variant="success" as={ Link } to={`/products/${_id}`}>Details</Button>
			</Card.Body>
		</Card>
		)
}


ProductCard.propTypes = {
	productProp: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired

	})
}








