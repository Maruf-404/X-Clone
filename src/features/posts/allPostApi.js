import axios from "../../components/AxiosInstance/AxiosInstance";
import getCookie from "../../Cookies/GetCookie";

let accessToken = getCookie("accessToken");

const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
  };


export const fetchAllPosts = () => {
  return axios.get(
    "/social-media/posts?page=1&limit=20",
    config
  );
};

export const toggleLikePost = (id) => {
  return axios.post(
    `/social-media/like/post/${id}`,
    {},
    config
  );
}
