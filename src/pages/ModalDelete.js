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
            Delete Contact Us
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
              <h2 className='w-100 text-center'>Are you sure want to delete this data?</h2>
            </div>
            <div>
                <h5>ID: {props.id}</h5>
                <h5>Name: {props.name}</h5>
                <h5>Email: {props.email}</h5>
                <h5>Message: {props.message}</h5>
            </div>
            <div>
              <Button onClick={() => {props.handleDelete(props.id); props.handleClose()}} variant="danger">
                Confirm
              </Button>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
      </Modal>
    );
  }
  
  function ModalDelete({id, name, email, message, handleDelete}) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
      setModalShow(false)
    }
    return (
      <>
        <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          name={name}
          email={email}
          message={message}
          handleDelete={handleDelete}
          handleClose={handleClose}
        />
      </>
    );
  }
  
  export default ModalDelete