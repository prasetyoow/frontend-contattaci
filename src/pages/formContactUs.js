import React, { useState } from "react";
import {FiPhone, FiMail, FiChevronsRight} from "react-icons/fi"
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function FormContactUs() {
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const onSubmit = async () => {
    await axios({method: 'post', url: 'http://localhost:8080/contact-us', data: qs.stringify({name: name, email: email, message: message})})
    navigate('/getData')
  }
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
            <h2 className="text-white">Message</h2>
            <input className="form-input-long text-white" name="message" onChange={(event) => setMessage(event.target.value)} type="text" placeholder="Enter your message"></input>
          </div>
          <button className="button-send" onClick={onSubmit}>Send <FiChevronsRight size={24} color="#325BD1" /></button>
        </div>
      </div>
    </>
  );
}

export default FormContactUs;