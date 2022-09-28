import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='no-border2' closeButton>
          <Modal.Title className='w-100 text-center' id="contained-modal-title-vcenter">
            Detail Contact Us
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
                <h5>ID: {props.id}</h5>
                <h5>Name: {props.name}</h5>
                <h5>Email: {props.email}</h5>
                <h5>Message: {props.message}</h5>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
      </Modal>
    );
  }
  
  function ModalDetail({id, name, email, message}) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Detail
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          name={name}
          email={email}
          message={message}
        />
      </>
    );
  }
  
  export default ModalDetail