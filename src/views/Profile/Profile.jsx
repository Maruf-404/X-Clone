import "../../App.css";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { format } from "date-fns";
import {
  Verified,
  LocationOnOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import EditProfile from "./EditProfile";
import FeedCard from "../../components/FeedCard/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileSkeleton from "../../components/Skeleton/ProfileSkeleton";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import axios from "axios";
import getCookie from "../../Cookies/GetCookie";
import { FixedSizeList as List } from "react-window";
import { fetchPostAsync } from "../../features/posts/postsSlice";
import "./Profile.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderSrc from "../../assets/placeholderSrc.jfif";

function Profile() {
  // const [myPost, setMyPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const myPost = useSelector((state) => state.post.posts);
  const profileLoading = useSelector((state) => state.post.status);
  const [profileData, setProfileData] = useState([]);
  let accessToken = getCookie("accessToken");

  const itemSize = 200;
  const listHeight = 500;
  const listWidth = "100%";

  useEffect(() => {
    document.title = "X clone | Profile";

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    };
    const getMyProfile = async () => {
      try {
        await axios
          .get(
            "https://infinity-api-94fa.onrender.com/api/v1/social-media/profile",
            config
          )
          .then((res) => {
            setProfileData(res.data.data);
          });
        setLoading(false);
      } catch (error) {
        console.log("Error in Profile", error);
      }
    };
    getMyProfile();
    dispatch(fetchPostAsync());
  }, [accessToken, dispatch]);

  const row = ({ index, style }) => (
    <div style={style}>
      <FeedCard
        key={myPost[index]._id}
        id={myPost[index]._id}
        data={myPost[index]}
        pl={8}
        component={"profile"}
      />
    </div>
  );

  if (loading | profileLoading) {
    return (
      <div>
        <ProfileSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const { username } = profileData.account;
  const { url: avatarUrl } = profileData.account.avatar;
  const { url: coverImageUrl } = profileData.coverImage;
  const { firstName, lastName, createdAt, bio, location } = profileData;
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMM dd, yyyy")
    : "unKnown date";

  return (
    <div className="profile">
      <div className="profile-heading">
        <Link to={"/home"}>
          <ArrowBackIcon color="secondary.main" className="arrow-icon" />
        </Link>
        <h3>
          {firstName ? firstName : "unknown"} {lastName ? lastName : "user"}
        </h3>
        <Verified sx={{ color: "teriatry.main", fontSize: "1.1rem" }} />
      </div>
      <div>
        <LazyLoadImage
          className="profile-cover-image"
          alt="coverImage"
          src={coverImageUrl ? coverImageUrl : ""}
          onError={(event) => (event.target.style.display = "none")}
          placeholderSrc={placeholderSrc}
          effect="blur"
        />
      </div>
      <LazyLoadImage
        className="profile-avatar"
        alt="avatar"
        src={avatarUrl ? avatarUrl : ""}
        onError={(event) => (event.target.style.display = "none")}
        placeholderSrc={placeholderSrc}
        effect="blur"
      />

      <div className="profile-edit">
        {/* <>
        <IconButton
          size="small"
          color="light"
          sx={{
            display: "flex",
            color: "#fff",
            borderRadius: "1.1rem",
            border: "1px solid 	#666363",
            "&:hover": {
              color: "#4299e1",
            },
          }}
        >
          <MoreHoriz />
        </IconButton>
        <IconButton
          size="small"
          color="light"
          sx={{
            display: "flex",
            color: "#fff",
            borderRadius: "1.1rem",
            border: "1px solid 	#666363",
            "&:hover": {
              color: "#4299e1",
            },
          }}
        >
          <NotificationAdd />
        </IconButton>
        </> */}
        <EditProfile />
      </div>
      <div className="profile-text">
        <div className="profile-user">
          <h3>
            {firstName ? firstName : "unknown"} {lastName ? lastName : "user"}
          </h3>
          <Verified sx={{ color: "teriatry.main", fontSize: "1.1rem" }} />
        </div>
        <div className="user-content">
          <p id="username">@{username ? username : "unknown"}</p>
          <Typography color={"secondary.main"} mt={2} mb={2}>
            {bio ? bio : ""}
          </Typography>

          <div className="user-info">
            <LocationOnOutlined fontSize="small" />{" "}
            <Typography mr={2} fontSize=".9rem" component="span">
              {location ? location : ""}
            </Typography>
            <CalendarMonthOutlined fontSize="small" />
            <Typography  fontSize=".9rem" component="span">
              {formattedDate ? formattedDate : ""}
            </Typography>{" "}
          </div>
        </div>
      </div>
      <div className="profile-post">
        {" "}
        Posts <hr color="#1D98f0" />
      </div>
      {Array.isArray(myPost) && (
        <List
          height={listHeight}
          itemCount={myPost.length}
          itemSize={itemSize}
          width={listWidth}
          className="hide-scrollbar"
        >
          {row}
        </List>
      )}
    </div>
  );
}

export default Profile;
