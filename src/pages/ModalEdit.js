import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { useDispatch} from "react-redux";
import {editId, editName, editEmail, editMessage} from '../redux/reducers/contactUs'
import qs from 'qs'

const dataSchema = Yup.object().shape({
    name: Yup.string().min(4, 'Name must be atleast 4 characters').required('Required'),
    email: Yup.string().email('Invalid email address format').required('Required'),
    message: Yup.string().max(255, 'Message must be within 255 characters').required('Required')
})

function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch()
    const id = props.id
    const [apply, setApply] = React.useState(true)
    const onSubmit = (value) => {
        console.log(value);
        const data = {name: value.name, email: value.email, message: value.message};
        console.log(qs.stringify(data) + 'ini data di modal');
        console.log(id+" id di modal");       
        dispatch(editId(id))
        dispatch(editName(value.name))
        dispatch(editEmail(value.email))
        dispatch(editMessage(value.messages))
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='no-border2' closeButton>
            <Modal.Title className='w-100 text-center' id="contained-modal-title-vcenter">
                Edit Data
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
                <Formik 
                    enableReinitialize 
                    onSubmit={onSubmit}
                    initialValues={{name: props.name, email: props.email, phone_number: props.phone, message:props.message}} validationSchema={dataSchema}>
                    {/* {(props)=><ContactUsForm {...props}/>} */}
                    {({errors, handleChange, handleSubmit, handleEdit, id, handleClose, setModalShow}) => (
                        <Form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control isInvalid={!!errors.name} defaultValue={props.name} onChange={handleChange} name="name" className=" no-border outline-none w-full shadow-none" placeholder="Name" />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control isInvalid={!!errors.email} defaultValue={props.email} onChange={handleChange} name="email" className="no-border outline-none w-full shadow-none" placeholder="E-mail" />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control as="textarea" isInvalid={!!errors.message} onChange={handleChange} defaultValue={props.message} name="message" className="w-full h-full outline-none no-border shadow-none" form="messages" placeholder="Enter your message" />
                            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                        </Form.Group>
                        <div>
                            <button type="submit" onClick={()=> setApply(false)} class="btn btn-secondary" data-dismiss="modal">Apply</button>
                            <Button onClick={()=>{props.handleEdit(); props.handleClose(); setApply(true)}} disabled={apply} className="btn-green text-center disabled:bg-slate-400">Send</Button>
                        </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
      </Modal>
    );
  }
  
  function Modals({id, name, email, message, handleEdit}) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        setModalShow(false)
    }
    return (
      <>
        <Button variant="success" onClick={() => setModalShow(true)}>
        Edit
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          name={name}
          email={email}
          message={message}
          handleClose={handleClose}
          handleEdit={handleEdit}
        />
      </>
    );
  }
  
  export default Modals