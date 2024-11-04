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
    "https://infinity-api-94fa.onrender.com/api/v1/social-media/posts?page=1&limit=20",
    config
  );
};

export const toggleLikePost = (id) => {
  return axios.post(
    `https://infinity-api-94fa.onrender.com/api/v1/social-media/like/post/${id}`,
    {},
    config
  );
}
