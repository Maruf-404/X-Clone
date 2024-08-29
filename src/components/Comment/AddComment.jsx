/* eslint-disable react/prop-types */
import { Box, FormControl, IconButton, Typography } from "@mui/material";
import XButton from "../XCustom/XButton";
import XModal from "../XCustom/XModal";
import { useState } from "react";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addCommentAsync } from "../../features/comment/commentSlice";
import "./Comment.css";

function AddComment({ CommentCount, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();


  const submitHandler = async () => {
    dispatch(addCommentAsync({ id, data: content }));
    CommentCount++;
    handleClose();
  };

  return (
    <Box>
      <IconButton
        className="icon-button chatbubble-icon"
        size="small"
        color="light"
        onClick={handleOpen}
      >
        <ChatBubbleOutline fontSize="small" />
        {CommentCount ? CommentCount : ""}
      </IconButton>

      <XModal open={open} handleClose={handleClose} height={200}>
        <FormControl>
          <Typography variant="h5" mb={2}>
            Comment
          </Typography>
          <textarea
            className="add-comment-content"
            placeholder="What is Happening ?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
     
          />
          <Box className="btn-container">
            <XButton
              backgroundcolor="#1D98F0"
              hoverbg="teriatry.main"
              width="4rem"
              size="small"
              height="2rem"
              color="secondary"
              onClick={submitHandler}
              text="Post"
            />
          </Box>
        </FormControl>
      </XModal>
    </Box>
  );
}

export default AddComment;
