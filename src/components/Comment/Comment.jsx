/* eslint-disable react/prop-types */
import {
  Favorite,
  FavoriteBorder,
  Repeat,
  Verified,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "../../Cookies/GetCookie";
import axios from "axios";
import MoreButton from "../MoreButton/MoreButton";
import { useSelector } from "react-redux";
import "./Comment.css";


function Comment({ data, pl}) {
  const { content, likes, isLiked, _id } = data;
  const { firstName, lastName } = data.author;
  const { url } = data.author.account.avatar;
  const [tempLike, setTempLike] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes);
  let accessToken = getCookie("accessToken");
  const user = useSelector((state) => state.user.user);
  const isOwner = user?.account?._id === data.author.account._id;

  useEffect(() => {
    setTempLike(isLiked)
    setLikeCount(likes);
  }, [likes, isLiked]);

  const handleLike = async () => {
    const config = {
      headers: {
        Authorization: accessToken,
        accept: "application/json",
      },
    };
    try {
      const res = await axios.post(
        `https://apihub.up.railway.app/api/v1/social-media/like/comment/${_id}`,
        {},
        config
      );
      if (res.data.success === true) {
        setTempLike((prevTempLike) => !prevTempLike)
        setLikeCount((prevLikeCount)=> tempLike ? prevLikeCount - 1 : prevLikeCount + 1)
      }
    } catch (error) {
      console.log("Error in Comment Like");
    }
  };

  return (
    <Card className="comment">
      <Typography
        className="comment-text"
        color="secondary.main"
        gutterBottom
        variant="p"
        component="div"
      >
        <Avatar
          className="avatar"
          variant="rounded"
          alt="postImage"
          src={url ? url : ""}
        />

        <Box
        className="username-container"
      
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <b>
              {firstName ? firstName : "unknown"} {lastName ? lastName : "user"}{" "}
            </b>
            &nbsp;
            <Verified sx={{ color: "teriatry.main", fontSize: "1.1rem" }} />
          </Box>
          <MoreButton id={_id} isOwner={isOwner} component={"comment"} />
        </Box>
      </Typography>

      <CardContent sx={{ pl: pl }}>
        <Link style={{ textDecoration: "none" }} to={`/post/${_id}`}>
          <Typography
            sx={{ mb: 2 }}
            variant="div"
            component="p"
            color="secondary.main"
          >
            {content ? content : ""}
          </Typography>
        </Link>
        <div className="comment-action">
          <div className="comment-icons">
            <IconButton
              className="icon-button repeat-icon"
              size="small"
              color="light"
            >
              <Repeat fontSize="small" />
            </IconButton>
            <IconButton
              className="icon-button favorite-icon"
              size="small"
              color="light"
              onClick={handleLike}
            >
              {tempLike ? (
                <Favorite fontSize="small" sx={{ color: "#ed64a6" }} />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}{" "}
              {likeCount ? likeCount : ""}
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Comment;
