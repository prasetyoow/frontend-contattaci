import React, { useState } from "react";
import {FiPhone, FiMail, FiChevronsRight} from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { postData } from "../redux/asyncActions/contactUs";
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from "formik";
import qs from "qs";

const dataSchema = Yup.object().shape({
  name: Yup.string().min(4).required('Required'),
  phone: Yup.number().min(8, 'Minumum number phone is 8').max(12, 'Phone number must be between 8 to 12 number'),
  email: Yup.string().email('Invalid email address format').required('Required'),
  message: Yup.string().max(255, 'Message must be within 255 characters').required('Required')
})

const DataValidation = ({errors, handleSubmit, handleChange, value}) => {
  const navigate = useNavigate()
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control placeholder="Enter your name" name="name" type="text" value={value.name} onChange={handleChange} isInvalid={!!errors.name}/>
          <Form.Control.Feedback
            type="invalid">{errors.name}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control placeholder="Enter your email" name="email" type="email" value={value.email} onChange={handleChange} isInvalid={!!errors.email}/>
          <Form.Control.Feedback
            type="invalid">{errors.email}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control placeholder="Enter your phone number" name="phone" type="number" value={value.name} onChange={handleChange} isInvalid={!!errors.phone}/>
          <Form.Control.Feedback
            type="invalid">{errors.phone}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control placeholder="Enter your message" name="message" type="textarea" value={value.message} onChange={handleChange} isInvalid={!!errors.message}/>
          <Form.Control.Feedback
            type="invalid">{errors.message}
          </Form.Control.Feedback>
      </Form.Group>

      <div className="flex-row-button">
        <button className="button-send" type="submit">Send <FiChevronsRight size={24} color="#325BD1" /></button>
        <button className="button-send" onClick={() => navigate('/contactData')}>Data List <FiChevronsRight size={24} color="#325BD1" /></button>
      </div>      
    </Form>
  )
}

function FormContactUs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  // const onSubmit = async () => {
  //   await axios({method: 'post', url: 'https://backend-contattaci-yyip.vercel.app/contact-us', data: qs.stringify({name: name, email: email, phone_number: phone, message: message})})
  //   navigate('/contactData')
  // }

  const onSubmit = () => {
    const data = {name: name, email: email, phone_number: phone, message: message}
    dispatch(postData(data))
    // dispatch(resetMsg())
    navigate('/contactData')
  }
  
  // React.useEffect(() => {
 
  // }, [dispatch])
  return (
    <>
      <div className="head-logo">
        <div className="flex-header">
          <h1>Revisi Master</h1>
          <div className="flex-header-right">
            <h2 className="head-white">About</h2>
            <h2 className="head-white">Team</h2>
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>

      <div className="flex-content">
        <div className="flex-left-content">
          <div className="flex-column">
            <h1 className="text-white head-left-content">Let's Talk</h1>
            <h2 className="text-white">Ask us anything or just say hi...</h2>
            <div className="flex-row margin-content">
              <FiPhone size={20} color="#F7F7F7" />
              <h5 className="text-white">0896 1834 3727</h5>
            </div>
            <div className="flex-row">
              <FiMail size={20} color="#F7F7F7" />
              <h5 className="text-white">hey@itsmerevisi.com</h5>
            </div>
          </div>     
        </div> 

        <div className="flex-column">
          <div className="flex-row">
            <div className="flex-column">
              <h2 className="text-white">Name</h2>
              <input className="form-input-top text-white" name="name" onChange={(event) => setName(event.target.value)} type="text" placeholder="Enter your name" ></input>
            </div>
            <div className="flex-column">
              <h2 className="text-white">Email</h2>
              <input className="form-input-top text-white" name="email" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your email"></input>
            </div>
          </div>
          <div className="flex-column">
            <h2 className="text-white">Phone Number</h2>
            <input className="form-input-long text-white" name="message" onChange={(event) => setPhone(event.target.value)} type="text" placeholder="Enter your phone number"></input>
          </div>
          <div className="flex-column">
            <h2 className="text-white">Message</h2>
            <input className="form-input-long text-white" name="message" onChange={(event) => setMessage(event.target.value)} type="text" placeholder="Enter your message"></input>
          </div>
          <div className="flex-row-button">
            <button className="button-send" onClick={onSubmit}>Send <FiChevronsRight size={24} color="#325BD1" /></button>
            <button className="button-send" onClick={() => navigate('/contactData')}>Data List <FiChevronsRight size={24} color="#325BD1" /></button>
          </div>         
          {/* <Formik onSubmit={onSubmit} initialValues={{name: '', email: '', phone: '', message: ''}} validationSchema={dataSchema}>
            {(props) => <DataValidation {...props} />}
          </Formik> */}
        </div>
      </div>
    </>
  );
}

export default FormContactUs;