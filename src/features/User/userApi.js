import axios from "../../components/AxiosInstance/AxiosInstance";
import getCookie from "../../Cookies/GetCookie";

let accessToken = getCookie("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    accept: "application/json",
  },
};

export const fetchUserProfile = () => {
  return axios.get(
    "/social-media/profile",
    config
  );
};
