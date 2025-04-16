/* eslint-disable react/prop-types */
import "../../App.css";
import { useEffect } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAsync } from "../../features/posts/allPostsSlice";
import CardSkeleton from "../Skeleton/CardSkeleton";
import CreatePost from "../Post/CreatePost";
import { fetchUserAsync } from "../../features/User/userSlice";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.allPost.allPosts);
  const loading = useSelector((state) => state.allPost.status);


  useEffect(() => {
    document.title = "X clone | Home";
    dispatch(fetchAllAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);

  return (
    <div>
      <CreatePost />
      {loading ? (
        <div>
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        feedData &&
        feedData.map((data) => {
          return (
            <FeedCard
              key={data._id}
              id={data._id}
              data={data}
              pl={8}
              component={"Feed"}
            />
          );
        })
      )}
    </div>
  );
}

export default Feed;
