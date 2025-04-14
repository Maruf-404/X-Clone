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
console.log(feedData);

  const itemSize = 710
  const listHeight = 800;
  const listWidth = 800

 const getItemSize = (index) => {
   const post = feedData[index];
   if (!post) return 350; // Default height

   // Base height (content + metadata)
   let height = 180;

   // Add height if image exists
   if (post.images?.length > 0) height += 300;

   // Add height for long content
   if (post.content?.length > 100)
     height += Math.floor(post.content.length / 50) * 20;

   return Math.min(height, 600); // Cap maximum height
 };
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
            rowHeight={getItemSize}
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
