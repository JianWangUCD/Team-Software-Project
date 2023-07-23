import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Edit the footer link
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>CopyRight &copy; Fantastic Six</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer