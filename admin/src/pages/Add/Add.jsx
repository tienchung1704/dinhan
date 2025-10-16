import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { use } from "react";

// Dữ liệu các danh mục
const GiayItems = [
  "Giày cầu lông Kawasaki",
  "Giày cầu lông Kumpo",
  "Giày cầu lông Lining",
  "Giày cầu lông Mizuno",
  "Giày cầu lông Victor",
  "Giày cầu lông Yonex",
];

const MayItems = ["Việt Nam", "Nhật Bản", "Trung Quốc", "Hoa Kỳ"];

const PhuKienItems = [
  "Dây căng vợt",
  "Hộp Cầu lông",
  "Cuốn cán",
  "Băng chặn mồ hôi",
];

const VotItems = [
  "Vợt cầu lông Lining",
  "Vợt cầu lông Yonex",
  "Vợt cầu lông Kumpoo",
  "Vợt cầu lông Victor",
  "Vợt cầu lông Mizuno",
  "Vợt cầu lông VS",
  "Vợt cầu lông Wsport",
];

const BaloItems = ["Balo Victor", "Balo Yonex", "Balo Lining"];

const AoItems = [
  "Áo cầu lông Lining",
  "Áo cầu lông Yonex",
  "Áo cầu lông Victor",
  "Áo cầu lông Coolmax 1",
  "Áo cầu lông Coolmax 2",
];

// Không cần slug nữa
const categories = [
  { title: "Balo cầu lông", items: BaloItems },
  { title: "Áo cầu lông", items: AoItems },
  { title: "Giày thể thao", items: GiayItems },
  { title: "Máy Căng Vợt", items: MayItems },
  { title: "Phụ kiện", items: PhuKienItems },
  { title: "Vợt cầu lông", items: VotItems },
];

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: categories[0].title,
    title: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("image", image);
    formData.append("isTrending", isTrending ? 1 : 0);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: categories[0].title,
          title: "",
        });
        setImage(false);
        setIsTrending(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm!");
      console.error(error);
    }
  };

  const selectedCategory = categories.find(
    (c) => c.title === data.category
  );
  useEffect(()=>{
    console.log(data);
  },data)
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
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Mô tả"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>

            {/* Chọn loại sản phẩm */}
            <select
              className="selectt"
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              {categories.map((cate, index) => (
                <option key={index} value={cate.title}>
                  {cate.title}
                </option>
              ))}
            </select>

            {/* Chọn sản phẩm theo category */}
            <select
              className="selectt"
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              required
            >
              <option value="">Chọn sản phẩm</option>
              {selectedCategory.items.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              className="inputclasa"
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="30.000 VND"
            />
          </div>

          <div className="isTrendingbtn">
            <input
              type="checkbox"
              name="isTrending"
              checked={isTrending}
              onChange={() => setIsTrending(!isTrending)}
            />
            <span>Trending</span>
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
