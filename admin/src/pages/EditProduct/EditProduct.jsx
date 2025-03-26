import React from "react";
import "./EditProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = ({ url }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [isTrending, setIsTrending] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("isTrending", isTrending ? 1 : 0);
    const response = await axios.post(`${url}/api/food/edit/${product.id}`, formData, {
      headers: { "Content-Type": "application/json" } 
    });
    if (response.data.success) {
      navigate("/list");
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };
  useEffect(() => {
    axios.get(`${url}/api/food/${id}`).then((response) => {
      if (response.data.success) {
        setProduct(response.data.data);
        setData({
          name: response.data.data.name ,
          price: response.data.data.price ,
          category: response.data.data.category ,
          description: response.data.data.description ,
        });
        setIsTrending(response.data.data.isTrending);
      } else {
        toast.error(response.data.message);
      }
    });
  }, []);
  return (
    <div>
      {product ? (
        <form onSubmit={onSubmitHandler}>
          <div id="editContainer">
            <div id="editContext">
              {" "}
              <div id="inputCss">
                <span htmlFor="name">Name:</span>
                <input
                  onChange={onChangeHandler}
                  type="text"
                  name="name"
                  placeholder={product.name}
                />
              </div>
              <div id="inputCss">
                <span htmlFor="price">price:</span>
                <input
                  type="text"
                  name="price"
                  onChange={onChangeHandler}
                  placeholder={product.price}
                />
              </div>
              <div id="inputCss">
                {" "}
                <span htmlFor="isTrending">isTrending:</span>
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={isTrending}
                  onChange={() => setIsTrending(!isTrending)}
                />
              </div>
              <div id="inputCss">
                <span htmlFor="category">category:</span>
                <select
                  className="selectt"
                  name="category"
                  id="inputCate"
                  value={product.category}
                  onChange={onChangeHandler}
                >
                  <option value="Cat Trees">Cat Trees</option>
                  <option value="Fall Arrivals">Fall Arrivals</option>
                  <option value="For Cats">For Cats</option>
                  <option value="Gift Guide">Gift Guide</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Print Your Pet">Print Your Pet</option>
                </select>
              </div>
            </div>
            <div id="nonono">
              <div id="yesyesyes123">
                <div id="editDescription">
                  <span htmlFor="description">description:</span>
                  <textarea
                    type="text"
                    name="description"
                    onChange={onChangeHandler}
                    placeholder={product.description}
                  />
                </div>
                <div id="editImg">
                  <img
                    id="editImg1"
                    name="image122"
                    src={`${url}/images/` + product.image}
                    alt=""
                  />
                </div>
              </div>
              <button id="btnEdit" type="submit">
                Edit
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
