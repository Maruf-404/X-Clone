import "./Sidebar.css";
import XIcon from "@mui/icons-material/X";
import SidebarOption from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";
import XButton from "../XCustom/XButton";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import getCookie from "../../Cookies/GetCookie";
import removeCookie from "../../Cookies/RemoveCookie";
import XModal from "../XCustom/XModal";
import { useState } from "react";
import CreatePost from "../Post/CreatePost";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  let accessToken = getCookie("accessToken");

  const logout = async () => {
    const config = {
      headers: {
        Authorization: accessToken,
        accept: "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://infinity-api-94fa.onrender.com/api/v1/users/logout",
        {},
        config
      );
      if (res.status === 200) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in logout", error);
    }
  };

  return (
    <div className="sidebar">
      <XIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="Home" link={"home"} />
      <SidebarOption
        Icon={CheckCircleOutlinedIcon}
        text="Verification"
        link={"verification"}
      />
      <SidebarOption
        Icon={NotificationsNoneIcon}
        text="Notifications"
        link={"notification"}
      />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" link={"messages"} />
      <SidebarOption
        Icon={BookmarkBorderIcon}
        text="Bookmarks"
        link={"bookmark"}
      />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" link={"profile"} />
      <div className="sidebarButtons">
        <XButton
          backgroundcolor="primary"
          hoverbg="#121212"
          width="5.9rem"
          height="2.5rem"
          color="secondary"
          sx={{ paddingRight: "3.3rem", margin: "10px 0 20px 0" }}
          onClick={logout}
          startIcon={<LogoutIcon sx={{ paddingRight: "11px" }} />}
          text="Logout"
        />

        <XButton
        color="secondary"
        borderradius="1.5rem"
        border="1px solid grey"
        backgroundcolor="teriatry.main"
        fontSize=".9rem"
        width="12rem"
        hoverbg="#2a5e81"
        height="3.2rem"
        onClick={handleOpen}
        text="Post"
      />
      <XModal open={open} handleClose={handleClose} height={200}>
      <CreatePost handleClose={handleClose}/>
      </XModal>
      </div>
    </div>
  );
}

export default Sidebar;
