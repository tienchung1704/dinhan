import React, { useEffect, useState } from 'react'
import './Posts.css'
import axios from "axios"
import {toast} from "react-toastify"

const Post = ({url}) => {

  const [post,setPost] = useState([]);

  const fetchPost = async () => {
    const response = await axios.get(`${url}/api/post/list`);
    if (response.data.success){
      console.log(response.data.data)
      setPost(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  const removePost = async(postId) => {
    const response = await axios.post(`${url}/api/post/remove`,{id:postId});
    await fetchPost();
    if (response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }


  useEffect(()=>{
    fetchPost();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Posts List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Title</b>
        <b>Description</b>
        <b>Detail</b>
        <b>Action</b>
      </div>
      {post.map((item,index)=>{
        return (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.detail}</p>
            <p onClick={()=>removePost(item.id)} className='cursor'>X</p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Post