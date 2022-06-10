import { Card, Button, Container } from 'react-bootstrap';
import ProductsList from './ProductsList'

export default function OrderCard({orderProp}) {

	const { _id, totalAmount, purchasedOn, products } = orderProp;

	return(
		<Container>
			<Card>
				<Card.Header className="bg-dark text-white">
					<Card.Text><span className="mx-1">Order Ref. Id:</span> {_id} <span className="ms-3">Purchased On:</span> {purchasedOn}</Card.Text>
				</Card.Header>

				<Card.Body>
				<h6>Products:</h6>
					<ProductsList orderProducts={products}/>
				</Card.Body>

				<Card.Body>
					<h6 className="text-danger">Total Price: ₱{totalAmount} </h6>
				</Card.Body>

			</Card>
		</Container>

		)
}







