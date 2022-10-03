import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { useSelector, useDispatch } from 'react-redux'
import { getStoredData, editData, deleteData } from '../redux/asyncActions/contactUs'

export default function GetContactUs() {
  // const [storedData, setData] = useState([])
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5)
  const [pagin, setPagin] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [sort, setSort] = useState('ASC')
  const getData = useSelector(state => state.contactUs?.data)
  const pageInfo = useSelector(state => state.contactUs?.pageInfo)
  const editId = useSelector(state => state.contactUs.id)
  const editName = useSelector(state => state.contactUs.name)
  const editEmail = useSelector(state => state.contactUs.email)
  const editMessage = useSelector(state => state.contactUs.message)     

  const handleEdit = async () => {
    const id = editId;
    const data = {name: editName, email: editEmail, message: editMessage};
    await dispatch(editData({id, data}));
    dispatch(getStoredData({limit, page: pagin, keyword, sortType: sort}))
  }

  const handleDelete = (id) => {
    dispatch(deleteData({id}))
    dispatch(getStoredData({limit, page: pagin, keyword, sortType: sort}))
  }

  React.useEffect(() => {
    dispatch(getStoredData({limit, page: pagin, keyword, sortType: sort}))
  }, [limit, pagin, keyword, sort, dispatch])


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
      <input type="text" name="keyword" onChange={(e) => {setKeyword(e.target.value); setPagin(1)}} className="form-control form-contact" placeholder="Search data"></input>
    </div>
    <table className='table-style'>
      <tr className='table-row-style'>
        <th className='table-head-style'>#</th>
        <th className='table-head-style'>Full Name</th>
        <th className='table-head-style'>Email</th>
        <th className='table-head-style'>Phone</th>
        <th className='table-head-style'>Option</th>
      </tr>
      {getData?.map(item => 
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
                  <ModalEdit
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  message={item.message} 
                  handleEdit={handleEdit} />
                </div>
                <div>
                  <ModalDelete
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  message={item.message} 
                  handleDelete={handleDelete} />
                </div>
              </div>
            </td>
          </tr>       
      )}  
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
        <button onClick={() => setPagin(pageInfo.prevPage)} disabled={pageInfo.currentPage < 2}>Prev</button>
        <span className='text-white'>{pageInfo.currentPage}</span>
        <button onClick={() => setPagin(pageInfo.nextPage)} disabled={pageInfo.totalPage === pageInfo.currentPage}>Next</button>
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

