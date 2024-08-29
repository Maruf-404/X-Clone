/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormControl, Typography } from "@mui/material";
import XInput from "../XCustom/XInput";
import XButton from "../XCustom/XButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePostAsync } from "../../features/posts/postsSlice";

function EditPost({ handleClose, id }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    if (!content | !tags) {
      toast.info("All fields are required");
      return;
    }

    const MultipartData = new FormData();
    MultipartData.append("content", content);
    tags.split(",").forEach((tag, idx) => {
      MultipartData.append(`tags[${idx}]`, tag.trim());
    });

    dispatch(updatePostAsync({ id, data: MultipartData }));
    handleClose();
  };

  return (
    <FormControl sx={{ gap: "5px" }}>
      <Typography variant="h5">Edit Post</Typography>

      <XInput
        label="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />

      <XInput
        label="#"
        value={tags}
        required
        onChange={(e) => setTags(e.target.value)}
      />

      <XButton
        backgroundcolor="#EFF3F4"
        hoverbg="#fff"
        width="31rem"
        text="Update User"
        onClick={submitHandler}
      />
    </FormControl>
  );
}

export default EditPost;
