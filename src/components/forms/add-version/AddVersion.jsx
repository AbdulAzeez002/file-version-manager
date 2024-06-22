import React, { useState } from "react";
import { addNewVersion } from "../../../services/services";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../error-message/ErrorMessage";

const AddVersion = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    file: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!formValues.file) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", formValues.file);

    try {
      const response = await addNewVersion(formData, id);
      if (response.data) {
        navigate(`/details/${id}`);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  return (
    <div>
      <div className="w-96">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload File
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                isSubmitted && !formValues.file ? "border-red-500" : ""
              }`}
              id="password"
              type="file"
              placeholder="Upload your file"
              //   value={formValues.file}
              name="file"
              onChange={handleChange}
            />
            {isSubmitted && !formValues.file && (
              <ErrorMessage data="File is Required" />
            )}
          </div>

          <div className="">
            {loading ? (
              <button
                className="bg-blue-500 opacity-50 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled
              >
                Uploading
              </button>
            ) : (
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVersion;
