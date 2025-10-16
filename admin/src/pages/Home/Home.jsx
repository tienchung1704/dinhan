import { useState } from "react";
import { AlignLeft, User, Wallet } from "lucide-react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const HomeDashboardItem = [
  { title: "Today's money", value: 50, content: 55 },
  { title: "Today's Order", value: 2300, content: 3 },
];

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterType, setFilterType] = useState("Ngày"); // Ngày / Tháng / Năm

  return (
    <div className="conassa flex">
      <div className="flex gap-4">
        {HomeDashboardItem.map((item, index) => (
          <div
            key={index}
            className="contaner-home w-[300px] h-[140px] p-5 bg-white border rounded-xl shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              {item.title.includes("money") ? (
                <Wallet className="w-10 h-10" />
              ) : (
                <User className="w-10 h-10" />
              )}
              <div className="text-right">
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-3xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
            <div className="footer flex items-center gap-2">
              <p className="text-gray-500 text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="overall-box border w-[500px] h-[140px] relative mb-5 p-4 rounded-xl shadow-md bg-white flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <AlignLeft className="w-10 h-10" />
            <p className="text-gray-500 text-sm">Thống kê</p>
          </div>

          {/* Chọn loại thống kê */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="Ngày">Ngày</option>
            <option value="Tháng">Tháng</option>
            <option value="Năm">Năm</option>
          </select>

          {/* Hiển thị DatePicker dựa theo loại chọn */}
          <div className="mt-2">
            {filterType === "Ngày" && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className=" datepicker border w-9 px-2 py-1 rounded"
              />
            )}
            {filterType === "Tháng" && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="border px-2 py-1 rounded"
              />
            )}
            {filterType === "Năm" && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showYearPicker
                dateFormat="yyyy"
                className="border px-2 py-1 rounded"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
