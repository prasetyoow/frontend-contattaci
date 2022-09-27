import React, { useState } from 'react'
import axios from 'axios'

export default function GetContactUs() {
  const [storedData, setData] = useState([])
  React.useEffect(() => {
    axios.get('http://localhost:8080/contact-us').then(({data}) => {
      setData(data.results)
    })
  }, [])
  return (
    <>
    {storedData.map(item => 
    <>
    <div>{item.name}</div>
    <div>{item.email}</div>
    <div>{item.message}</div>
    </>
    )}
    </>
  )
}

