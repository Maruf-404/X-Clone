import axios from "axios";
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
    "https://apihub.up.railway.app/api/v1/social-media/posts?page=1&limit=10",
    config
  );
};

export const toggleLikePost = (id) => {
  return axios.post(
    `https://apihub.up.railway.app/api/v1/social-media/like/post/${id}`,
    {},
    config
  );
}
