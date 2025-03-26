import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      console.log(response.data.data);
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (response.data.success) {
      await fetchList();
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const EditProduct = async (productId) => {
    const response = await axios.get(`${url}/api/food/${productId}`, {
      id: productId,
    });
    if (response.data.success) {
      navigate(`/edit/${productId}`)
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}$</p>
              <div className="btn-action">
                <button
                  onClick={() => EditProduct(item.id)}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button className="btn-delete">
                  {" "}
                  <p onClick={() => removeFood(item.id)} className="cursor">
                    X
                  </p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
