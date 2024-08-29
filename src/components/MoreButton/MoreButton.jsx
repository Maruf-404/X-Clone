/* eslint-disable react/prop-types */
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deletePostAsync } from "../../features/posts/postsSlice";
import XModal from "../XCustom/XModal";
import EditPost from "../Post/EditPost";
import { deleteCommentAsync } from "../../features/comment/commentSlice";
import EditComment from "../Comment/EditComment"


const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function MenuButton({ id, component, isOwner}) {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleOpen();
  };

  const handleDelete = () => {
    if (component == "post") {
      dispatch(deletePostAsync(id));
    } else {
      dispatch(deleteCommentAsync(id))
    }
   
  };

  const actionMap = {
    Edit: handleEdit,
    Delete: handleDelete,
  };

  const handleMenuItemClick = (option) => {
    handleClose();
    if (actionMap[option]) {
      actionMap[option]();
    }
  };

if (!isOwner) {
  return null
}

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openMenu ? "long-menu" : undefined}
        aria-expanded={openMenu ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="light"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: "#111",
            color: "#fff",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <XModal open={open} handleClose={handleClose} height={300}>
    { component == "post" ? <EditPost handleClose={handleClose} id={id}/> : <EditComment handleClose={handleClose} id={id}/> }

  </XModal>
    </div>
  );
}
