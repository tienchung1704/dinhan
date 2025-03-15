import React, { useState } from "react";
import "./Postadd.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddPost = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    detail: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("detail", data.detail);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/post/postadd`, formData);
    if (response.data.success) {
      setData({
        title: "",
        description: "",
        detail: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="image"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Post Title</p>
          <input
            onChange={onChangeHandler}
            value={data.title}
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Post Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Description"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="add-product-description">
          <div className=" flex-col">
            <p>Post Detail</p>
            <textarea
              onChange={onChangeHandler}
              value={data.detail}
              name="detail"
              rows="6"
              placeholder="Detail"
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPost;
