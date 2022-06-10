import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export default function ErrorPaage() {
	return(
		<Row>
			<Col>
				<h1>404 - Page Not Found</h1>
				<p>The page you are looking for cannot be found</p>
				<Button variant="primary" as={ Link } to="/">Back Home</Button>
			</Col>
		</Row>
		)
}