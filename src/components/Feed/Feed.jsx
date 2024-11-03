/* eslint-disable react/prop-types */
import "../../App.css";
import { useEffect } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAsync } from "../../features/posts/allPostsSlice";
import CardSkeleton from "../Skeleton/CardSkeleton";
import CreatePost from "../Post/CreatePost";
import { List } from "react-virtualized";
import { fetchUserAsync } from "../../features/User/userSlice";


function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.allPost.allPosts);
  const loading = useSelector((state) => state.allPost.status);

  const itemSize = 710
  const listHeight = 800;
  const listWidth = 800

  const Row = ({ index, key, style }) => (
    <div key={key} style={style}>
      <FeedCard
        key={feedData[index]._id}
        id={feedData[index]._id}
        data={feedData[index]}
        pl={8}
        component={"Feed"}
      />
    </div>
  );

  useEffect(() => {
    document.title = "X clone | Home"
    dispatch(fetchAllAsync())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAsync())
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
        feedData && (
          <List
            height={listHeight}
            rowCount={feedData.length}
            rowHeight={itemSize}
            width={listWidth}
            rowRenderer={Row}
            className="hide-scrollbar"
          />
            
        )
      )}
    </div>
  );
}

export default Feed;
