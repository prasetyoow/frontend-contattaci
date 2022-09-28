import React, { useState } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function GetContactUs() {
  const [storedData, setData] = useState([])
  React.useEffect(() => {
    axios.get('http://localhost:8080/contact-us').then(({data}) => {
      setData(data.results)
    })
  }, [])
  return (
    <>
    <div className='wrapper'>
    <div className='head-table'>
      <h1>Data List &middot; From Contact Us Form</h1>
    </div>

    <div class="input-group flex-nowrap search-cont">
      <span class="input-group-text form-contact">
        <FiSearch size={34} color="black" />
      </span>
      <input type="text" class="form-control form-contact" placeholder="Search data"></input>
    </div>
    <table className='table-style'>
      <tr className='table-row-style'>
        <th className='table-head-style'>#</th>
        <th className='table-head-style'>Full Name</th>
        <th className='table-head-style'>Email</th>
        <th className='table-head-style'>Phone</th>
        <th className='table-head-style'>Option</th>
      </tr>
      {storedData.map(item => {
        return (
          <tr className='table-row-style'>
            <td className='table-data-style'>{item.id}</td>
            <td className='table-data-style'>{item.name}</td>
            <td className='table-data-style'>{item.email}</td>
            <td className='table-data-style'>{item.phone_number}</td>
            <td className='table-data-style'><button>Details</button> <button>Delete</button></td>
          </tr>
        )       
      })}  
    </table>
    <div className='flex-row-footer'>
      <div className='flex-row-button-page'>
        <Link to={'/'}>
          <h5>Back to Home</h5>
        </Link>
      </div>
      <div className='flex-row-button-page'>
        <button>Prev</button>
        <span className='text-white'>1</span>
        <button>Next</button>
      </div>
    </div>     
    </div>  
    </>
  )
}

