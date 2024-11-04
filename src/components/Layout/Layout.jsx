/* eslint-disable react/prop-types */

import { useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import Trending from "../Trending/Trending";
import getCookie from "../../Cookies/GetCookie";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate()
  const accessToken = getCookie("accessToken")
  useEffect(() => {
  
   if (!accessToken) {
       navigate("/")
   }
  }, [accessToken])

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <div>
        {" "}
        <Sidebar />
      </div>

      <div style={{ width: "37.4rem" }}>{children}</div>
      <Trending />
    </div>
  );
}

export default Layout;
