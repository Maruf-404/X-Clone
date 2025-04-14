import axios from "../../components/AxiosInstance/AxiosInstance";
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
    `/social-media/comments/post/${id}?page=1&limit=10`,
    config
  );
};

export const addComments = (id, data) => {
  return axios.post(
    `/social-media/comments/post/${id}`,
    {
      content: data,
    },
    config
  );
};

export const deleteComments = (id) => {
  return axios.delete(
    `/social-media/comments/${id}`,
    config
  );
};

export const updateComments = (id, data) => {
  return axios.patch(
    `/social-media/comments/${id}`,
    {
      content: data,
    },
    config
  );
};
