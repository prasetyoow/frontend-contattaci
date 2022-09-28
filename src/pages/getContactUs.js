import React, { useState } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ModalDetail from './ModalDetail'
import ModalDelete from './ModalDelete'

export default function GetContactUs() {
  const [storedData, setData] = useState([])
  const [keyword, setKeyword] = useState("")
  const [chapter, setChapter] = useState(1)
  const [sort, setSort] = useState('ASC')
  const [limit, setLimit] = useState(5)
  const [pageInfo, setPageInfo] = useState({})

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/contact-us/${id}`)
    const query = new URLSearchParams({limit: limit, page: chapter, keyword: keyword, sortType: sort}).toString()
    axios.get('http://localhost:8080/contact-us?'+query).then(({data}) => {
      setData(data.results)
      setPageInfo(data.pageInfo)
  })
    .catch(
      setData([]),
      setPageInfo({})
   )
  }

  const getData = async (limit, page, keyword, sortType) => {
    // limit = parseInt(limit)
    page = parseInt(page)
    const query = new URLSearchParams({limit, page, keyword, sortType}).toString()
    axios.get('http://localhost:8080/contact-us?'+query).then(({data}) => {
      setData(data.results)
      setPageInfo(data.pageInfo)
  })
  .catch(
    setData([]),
    setPageInfo({})
  )
}
  React.useEffect(() => {
    getData(limit, chapter, keyword, sort)
  }, [limit, chapter, keyword, sort])

  // const getNextPage = () => {
  //   getData(limit, pageInfo.nextPage)
  // }

  // const getPrevPage = () => {
  //   getData(limit, pageInfo.prevPage)
  // }

  return (
    <>
    <div className='wrapper'>
    <div className='head-table'>
      <h1>Data List &middot; From Contact Us Form</h1>
    </div>

    <div className="input-group flex-nowrap search-cont">
      <span className="input-group-text form-contact">
        <FiSearch size={34} color="black" />
      </span>
      <input type="text" name="keyword" onChange={(e) => {setKeyword(e.target.value); setChapter(1)}} className="form-control form-contact" placeholder="Search data"></input>
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
            <td className='table-data-style'>
              <div className='flex-row-option-modal'>
                <div>
                  <ModalDetail
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  message={item.message} />
                </div>
                <div>
                  <ModalDelete handleDelete={handleDelete}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  message={item.message} />
                </div>
              </div>
            </td>
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
        <button onClick={() => setSort('ASC')}>ASC</button>
        <button onClick={() => setSort('DESC')}>DESC</button>
        <button onClick={() => setChapter(pageInfo.prevPage)} disabled={pageInfo.currentPage < 2}>Prev</button>
        <span className='text-white'>{pageInfo.currentPage}</span>
        <button onClick={() => setChapter(pageInfo.nextPage)} disabled={pageInfo.totalPage === pageInfo.currentPage}>Next</button>
        <select onChange={(e) => setLimit(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
    </div>     
    </div>  
    </>
  )
}

