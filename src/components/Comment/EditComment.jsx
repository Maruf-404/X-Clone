/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormControl, Typography } from "@mui/material";
import XInput from "../XCustom/XInput";
import XButton from "../XCustom/XButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentAsync } from "../../features/comment/commentSlice";
import { useNavigate } from "react-router-dom";
import "./Comment.css";

function EditComment({ handleClose, id }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!content) {
      toast.info("content is required");
      return;
    }
    dispatch(updateCommentAsync({ id, data: content }));
    handleClose();
   
  };

  return (
    <FormControl className="edit-comment">
      <Typography variant="h5">Edit Comment</Typography>

      <XInput
        label="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />

      <XButton
        backgroundcolor="#EFF3F4"
        hoverbg="#fff"
        width="31rem"
        text="Update comment"
        onClick={submitHandler}
      />
    </FormControl>
  );
}

export default EditComment;
