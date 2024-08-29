import axios from "axios";
import getCookie from "../../Cookies/GetCookie";

let accessToken = getCookie("accessToken");
const config = {
  headers: {
    Authorization: accessToken,
    accept: "application/json",
  },
};

export const fetchComments = (id) => {
  return axios.get(
    `https://apihub.up.railway.app/api/v1/social-media/comments/post/${id}?page=1&limit=10`,
    config
  );
};

export const addComments = (id, data) => {
  return axios.post(
    `https://apihub.up.railway.app/api/v1/social-media/comments/post/${id}`,
    {
      content: data,
    },
    config
  );
};

export const deleteComments = (id) => {
  return axios.delete(
    `https://apihub.up.railway.app/api/v1/social-media/comments/${id}`,
    config
  );
};

export const updateComments = (id, data) => {
  return axios.patch(
    `https://apihub.up.railway.app/api/v1/social-media/comments/${id}`,
    {
      content: data,
    },
    config
  );
};
