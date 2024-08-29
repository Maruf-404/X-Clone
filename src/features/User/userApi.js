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
  return axios.get("https://apihub.up.railway.app/api/v1/social-media/profile", config);
};
