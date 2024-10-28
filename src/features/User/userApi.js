import axios from "axios";
import getCookie from "../../Cookies/GetCookie";

let accessToken = getCookie("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    accept: "application/json", 
  },
};

export const fetchUserProfile = () => {
  return axios.get("https://infinity-api-94fa.onrender.com/api/v1/social-media/profile", config);
};
