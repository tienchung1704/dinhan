import React, { useEffect, useState } from 'react'
import './Contact.css'
import axios from "axios"
import {toast} from "react-toastify"

const Contact = ({url}) => {
  const [contact,setContact] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchContact = async () => {
    const response = await axios.get(`${url}/api/contact/list`);
    
    if (response.data.success){
      console.log(response.data.data)
      setContact(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  const removeContact = async(contactId) => {
    const response = await axios.post(`${url}/api/contact/remove`,{id:contactId});
    await fetchContact();
    if (response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }


  useEffect(()=>{
    fetchContact();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Contact List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Name</b>
        <b>Email</b>
        <b>Phone</b>
        <b>Detail</b>
        <b>Reply</b>
        <b>Action</b>
      </div>
      {contact.map((item,index)=>{
        return (
          <div key={index} className='list-table-format'>

            <p>{item.firstname} {item.lastname}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.detail}</p>
            <button onClick={() => setShowModal(!showModal) }>Reply</button>
            <p onClick={()=>removeContact(item.id)} className='cursor'>X</p>
          </div>
        )
      })}
    </div>
    {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <form action="">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reply to Contact</h3>
            <div className='modal-content1'>
            <span htmlFor="responseT">Response :</span>
            <textarea name='responseT' id='responseT'></textarea>
            </div>
            <button id='btnReply' >Reply</button>
          </div>
          </form>

        </div>
      )}
    
    </div>
    
  )
}

export default Contact