import React, { useEffect, useState } from "react";
import { getAllFiles } from "../../services/services";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DocumentTable = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const fetchAllFiles = async () => {
    try {
      const response = await getAllFiles();
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  const getDate = (dateStr) => {
    const parsedDate = moment(dateStr);
    // Format the date and time
    const formattedDate = parsedDate.format("MMMM Do YYYY, h:mm a");
    return formattedDate;
  };

  const handleClickAdd = () => {
    navigate("/add"); // Navigate to the About Page
  };

  const handleClickItem = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="px-24 py-20">
      <div className="flex justify-end mb-4 ">
        <button
          className="bg-emerald-800 hover:bg-emerald-500 text-white  py-2 px-4 rounded"
          onClick={handleClickAdd}
        >
          Add File
        </button>
      </div>
      <div className="relative overflow-x-auto max-h-[580px] ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Document Name
              </th>
              <th scope="col" className="px-6 py-3">
                Document Type
              </th>
              <th scope="col" className="px-6 py-3">
                Document Location
              </th>
              <th scope="col" className="px-6 py-3">
                Upload Date
              </th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data) => (
              <tr
                key={data?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap dark:text-white cursor-pointer"
                  onClick={() => handleClickItem(data?._id)}
                >
                  {data?.fileName}
                </th>
                <td className="px-6 py-4">{data?.fileCategory}</td>
                <td className="px-6 py-4">{data?.fileLocation}</td>
                <td className="px-6 py-4">{getDate(data?.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
