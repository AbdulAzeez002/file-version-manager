import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleFile } from "../../services/services";
import VersionTable from "../version-table/VersionTable";

const DetailsComp = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddVersion = () => {
    navigate(`/add?id=${id}`);
  };

  const getSingleFileDetails = async (id) => {
    try {
      setLoading(true);
      const response = await getSingleFile(id);
      setData(response.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleFileDetails(id);
  }, []);

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="px-24 py-20">
          <div className="text-end">
            <button
              className="bg-emerald-800 hover:bg-emerald-500 text-white  py-2 px-4 rounded"
              onClick={handleAddVersion}
            >
              Add New Version
            </button>
          </div>
          <VersionTable datas={data?.versions} />
        </div>
      )}
    </div>
  );
};

export default DetailsComp;
