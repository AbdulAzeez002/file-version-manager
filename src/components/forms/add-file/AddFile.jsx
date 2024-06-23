import React, { useState } from "react";
import { insertFile } from "../../../services/services";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../error-message/ErrorMessage";

const AddFile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    documentName: "",
    documentType: "",
    documentLocation: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (
      !formValues.documentName ||
      !formValues.documentType ||
      !formValues.documentLocation ||
      !formValues.file
    ) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", formValues.file);
    formData.append("category", formValues.documentType);
    formData.append("location", formValues.documentLocation);
    formData.append("fileName", formValues.documentName);

    try {
      const response = await insertFile(formData);

      if (response.data) {
        navigate("/");
      }
    } catch (err) {
      setError(err?.message ?? "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    }));
  };

  return (
    <div>
      <div className="w-96">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <ErrorMessage data={error} />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Document Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                isSubmitted && !formValues.documentName ? "border-red-500" : ""
              }`}
              id="username"
              type="text"
              placeholder="Document Name"
              value={formValues.documentName}
              name="documentName"
              onChange={handleChange}
            />
            {isSubmitted && !formValues.documentName && (
              <ErrorMessage data="Document Name is Required" />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Document Type
            </label>
            <div className="relative">
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  isSubmitted && !formValues.documentType
                    ? "border-red-500"
                    : ""
                }`}
                id="grid-state"
                onChange={handleChange}
                name="documentType"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>

                <option value={"Training"}>Training</option>
                <option value={"Certificate"}>Certificate</option>
                <option value={"Manual"}>Manual</option>
                <option value={"License"}>License</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>

              {isSubmitted && !formValues.documentType && (
                <ErrorMessage data="Document Type is Required" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Document Location
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                isSubmitted && !formValues.documentLocation
                  ? "border-red-500"
                  : ""
              }`}
              id="username"
              type="text"
              placeholder="Document Location"
              value={formValues.documentLocation}
              name="documentLocation"
              onChange={handleChange}
            />
            {isSubmitted && !formValues.documentLocation && (
              <ErrorMessage data="Document Location is Required" />
            )}
          </div>
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

export default AddFile;
