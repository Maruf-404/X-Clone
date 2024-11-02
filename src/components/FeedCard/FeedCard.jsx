/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import MoreButton from "../MoreButton/MoreButton";
import {
  Verified,
  Favorite,
  Repeat,
  BookmarkBorder,
  FavoriteBorder,
  Bookmark,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../../Cookies/GetCookie";
import AddComment from "../Comment/AddComment";
import { useSelector } from "react-redux";
import placeholderSrc from "../../assets/placeholderSrc.jfif";
import "./FeedCard.css";
import "../../App.css"

export default function FeedCard({ data = {}, pl, id }) {
  const { content, tags, images, comments, likes, isLiked, isBookmarked, _id } =
    data;
  const author = data.author || {};
  const { firstName, lastName } = author;
  const url = author?.account?.avatar?.url || "";
  const [tempLike, setTempLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [tempbookmark, setTempBookmark] = useState(isBookmarked);
  const user = useSelector((state) => state.user.user);
  const isOwner = user?.account?._id === data?.author?.account._id;
  let accessToken = getCookie("accessToken");


  useEffect(() => {
    setTempLike(isLiked);
    setLikeCount(likes);
  }, [isLiked, likes]);

  const handleLike = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `https://infinity-api-94fa.onrender.com/api/v1/social-media/like/post/${id}`,
        {},
        config
      );

      if (response.data.success === true) {
        setTempLike((prevLike) => !prevLike);
        setLikeCount((prevLikeCount) =>
          tempLike ? prevLikeCount - 1 : prevLikeCount + 1
        );
      }
    } catch (error) {
      console.log("ERROR IN LIKE API", error);
    }
  };

  const handleBookmark = async () => {
    const config = {
      headers: {
        Authorization: accessToken,
        accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `https://infinity-api-94fa.onrender.com/api/v1/social-media/bookmarks/${id}`,
        {},
        config
      );
      if (response.data.success === true) {
        setTempBookmark(!tempbookmark);
      }
    } catch (error) {
      console.log("ERROR IN Bookmark API", error);
    }
  };


  return (
    <Card className="feed-card">
      <Typography
        className="feed-card-text"
        color="secondary.main"
        gutterBottom
        variant="h5"
        component="div"
      >
        {url ? (
          <Avatar
            className="avatar"
            variant="rounded"
            alt="postImage"
            src={url}
          />
        ) : (
          ""
        )}
        <Box className="username-container">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <b>
              {firstName ? firstName : "unknown"} {lastName ? lastName : "user"}{" "}
            </b>
            &nbsp;
            <Verified sx={{ color: "teriatry.main", fontSize: "1.1rem" }} />
          </Box>
          <MoreButton id={_id} isOwner={isOwner || isOwner} component="post" />
        </Box>
      </Typography>

      <CardContent sx={{ pl: pl }}>
        <Link style={{ textDecoration: "none" }} to={`/post/${_id}`}>
          <Typography
            sx={{ mb: 2, height: "6rem" }}
            variant="div"
            component="p"
            color="secondary.main"
          >
            {content ? content : ""}
            <br />
            {tags ? tags : "#tags"}
          </Typography>

          <img
            className="feed-card-image"
            // component="img"
            alt="post"
            src={images ? `${images[0]?.url}` : ""}
            onError={(event) => (event.target.style.display = "none")}
            data-src={placeholderSrc}
            loading="lazy"
            // effect="black-and-white"
          />
        </Link>
        <div className="feed-card-action">
          <div className="feed-card-icons">
            <AddComment CommentCount={comments} id={_id} />

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

            <IconButton
              className="icon-button bookmark-icon"
              size="small"
              color="light"
              onClick={handleBookmark}
            >
              {tempbookmark ? (
                <Bookmark sx={{ color: "#48bb78" }} fontSize="small" />
              ) : (
                <BookmarkBorder fontSize="small" />
              )}
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
