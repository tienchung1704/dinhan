import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

const categories = [
  { title: "Balo cầu lông", items: BaloItems },
  { title: "Áo cầu lông", items: AoItems },
  { title: "Giày thể thao", items: GiayItems },
  { title: "Máy Căng Vợt", items: MayItems },
  { title: "Phụ kiện", items: PhuKienItems },
  { title: "Vợt cầu lông", items: VotItems },
];

const EditProduct = ({ url }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [isTrending, setIsTrending] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    title: "", // thêm field này
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("isTrending", isTrending ? 1 : 0);

    try {
      const response = await axios.post(`${url}/api/food/edit/${product.id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.data.message || "Lỗi khi cập nhật");
      }
    } catch (error) {
      toast.error("Lỗi kết nối tới server!");
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(`${url}/api/food/${id}`).then((response) => {
      if (response.data.success) {
        const prod = response.data.data;
        setProduct(prod);
        setData({
          name: prod.name,
          price: prod.price,
          category: prod.category,
          description: prod.description,
          title: prod.title 
        });
        setIsTrending(prod.isTrending);
      } else {
        toast.error(response.data.message);
      }
    });
  }, [id, url]);

  // 🔹 Tìm category hiện tại để hiển thị danh sách sản phẩm con
  const selectedCategory = categories.find(
    (c) => c.title === data.category
  ) || categories[0];

  return (
    <div>
      {product ? (
        <form onSubmit={onSubmitHandler}>
          <div id="editContainer">
            <div id="editContext">
              <div id="inputCss">
                <span>Name:</span>
                <input
                  onChange={onChangeHandler}
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Tên sản phẩm"
                />
              </div>

              <div id="inputCss">
                <span>Price:</span>
                <input
                  type="number"
                  name="price"
                  onChange={onChangeHandler}
                  value={data.price}
                  placeholder="Giá"
                />
              </div>

              <div id="inputCss">
                <span>Trending:</span>
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={isTrending}
                  onChange={() => setIsTrending(!isTrending)}
                />
              </div>
              <div id="inputCss">
                <span>Category:</span>
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

                <select
                  className="selectt"
                  name="title"
                  value={data.title}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {selectedCategory.items.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div id="nonono">
              <div id="yesyesyes123">
                <div id="editDescription">
                  <span>Description:</span>
                  <textarea
                    name="description"
                    value={data.description}
                    onChange={onChangeHandler}
                    placeholder="Mô tả sản phẩm"
                  />
                </div>

                <div id="editImg">
                  <img
                    id="editImg1"
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
