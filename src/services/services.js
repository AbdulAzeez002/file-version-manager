import axios from "axios";

const backendUrl = "http://localhost:8000";

export const insertFile = async (body) => {
  try {
    const response = await axios.post(`${backendUrl}/api/file`, body);
    return response;
  } catch (error) {
    // console.log(error.response.data.error, "errorrr");
    throw new Error(error?.response?.data?.error ?? "some thing went wrong");
  }
};

export const addNewVersion = async (body, id) => {
  try {
    const response = await axios.post(`${backendUrl}/api/file/${id}`, body);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.error ?? "some thing went wrong");
  }
};

export const getAllFiles = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/file`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleFile = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/api/file/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
