/* eslint-disable react/prop-types */
import "./SidebarOption.css";
import { Link } from "react-router-dom";

function SidebarOption({ active, text, Icon, link }) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/${link}`}>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <Icon />
        <h3>{text}</h3>
      </div>
    </Link>
  );
}

export default SidebarOption;
