import React from "react";
import AddFile from "../../components/forms/add-file/AddFile";
import { useLocation } from "react-router-dom";
import AddVersion from "../../components/forms/add-version/AddVersion";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AddFilePage = () => {
  const query = useQuery();
  const id = query.get("id");
  console.log(id, "id");
  return (
    <div className="flex justify-center items-center h-screen">
      {id ? <AddVersion id={id} /> : <AddFile />}
    </div>
  );
};

export default AddFilePage;
