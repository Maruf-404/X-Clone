import axios from "axios";
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
    "https://infinity-api-94fa.onrender.com/api/v1/social-media/posts",
    data,
    config
  );

};

export const fetchPosts = () => {
  return axios.get(
    "https://infinity-api-94fa.onrender.com/api/v1/social-media/posts/get/my?page=1&limit=10",
    config
  );
};

export const deletePost = (id) => {
  return axios.delete(
    `https://infinity-api-94fa.onrender.com/api/v1/social-media/posts/${id}`,
    config
  );
};

export const updatePost = (id, data) => {
   
  return axios.patch(
    `https://infinity-api-94fa.onrender.com/api/v1/social-media/posts/${id}`,
    data,
    config2
  );
};


export const fetchSinglePost = (id) => {
  return axios.get(
    `https://infinity-api-94fa.onrender.com/api/v1/social-media/posts/${id}`,
    config
  );
}

