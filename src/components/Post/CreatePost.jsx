/* eslint-disable react/prop-types */
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Avatar, Box, Button } from "@mui/material";
import XButton from "../XCustom/XButton";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "../../features/posts/postsSlice";
import XhiddenInput from "../XCustom/XhiddenInput";
import "./Post.css";
import placeholderSrc from "../../assets/placeholderSrc.jfif";

function CreatePost({ handleClose }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 
  const [tags, setTags] = useState("");
  const avatar = useSelector((state) => state.user.user?.account?.avatar.url);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else if (file) {
      toast.error("Please select a valid image file");
    }
  };
  const submitHandler = async () => {
    if (!content) {
      toast.info("content field is required");
      return;
    }
    console.log(image);
    
    const multiPartData = new FormData();
    multiPartData.append("image", image);
    multiPartData.append("content", content);
    tags.split(",").forEach((tag, idx) => {
      multiPartData.append(`tags[${idx}]`, tag.trim());
    });
    dispatch(createPostAsync(multiPartData));
    toast.success("Post created");
    if (handleClose) {
      handleClose();
    }
  };
  return (
    <Box className="create-post">
      <FormControl className="create-post-form">
        <Box sx={{ display: "flex" }}>
          <Avatar
            className="create-post-avatar"
            variant="rounded"
            alt="postImage"
            src={avatar ? avatar : placeholderSrc}
          />
          <textarea
            className="create-post-input"
            placeholder="What is Happening ?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        <input
          className="create-post-input"
          placeholder="#tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Box className="create-post-btns">
          <Button
            component="label"
            variant="contained"
            startIcon={<ImageOutlinedIcon color="teriatry" />}
          >
            <XhiddenInput
              onChange={handleImageChange}
              name="image"
              accept="image/*"
            />
          </Button>
          <XButton
            backgroundcolor="#1D98F0"
            hoverbg="teriatry.main"
            width="4.5rem"
            size="small"
            height="2.2rem"
            color="secondary"
            onClick={submitHandler}
            text="Post"
          />
        </Box>
        <hr style={{ border: "1px solid rgb(51, 54, 57)" }} />
      </FormControl>
    </Box>
  );
}

export default CreatePost;
