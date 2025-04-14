import axios from "../../components/AxiosInstance/AxiosInstance";
import getCookie from "../../Cookies/GetCookie";

let accessToken = getCookie("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    accept: "application/json",
  },
};

const config2 = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "multipart/form-data",
  },
};

export const createPost = (data) => {
  return axios.post(
    "/social-media/posts",
    data,
    config2
  );
};

export const fetchPosts = () => {
  return axios.get(
    "/social-media/posts/get/my?page=1&limit=10",
    config
  );
};

export const deletePost = (id) => {
  return axios.delete(
    `/social-media/posts/${id}`,
    config
  );
};

export const updatePost = (id, data) => {
  return axios.patch(
    `/social-media/posts/${id}`,
    data,
    config2
  );
};

export const fetchSinglePost = (id) => {
  return axios.get(
    `/social-media/posts/${id}`,
    config
  );
};
