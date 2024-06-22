import React from "react";

const VersionTable = ({ datas }) => {
  const handleDownload = async (url) => {
    try {
      // Fetch the file
      const response = await fetch(url);

      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response into a Blob
      const blob = await response.blob();

      // Create a temporary object URL for the Blob
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Set the download attribute with a default filename
      link.download = url.split("/").pop();

      // Append the link to the document
      document.body.appendChild(link);

      // Programmatically trigger the click event on the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                version
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
              <th>Downlaod</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data) => (
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {data?.version}
                </th>
                <td className="px-6 py-4">{data?.data}</td>
                <td
                  className="px-6 py-4"
                  onClick={() => handleDownload(data?.data)}
                >
                  <svg
                    className="cursor-pointer h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionTable;
