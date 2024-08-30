import { useEffect, useState } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardSkeleton from "../Skeleton/CardSkeleton";
import CommentSkeleton from "../Skeleton/CommentSkeleton";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentAsync } from "../../features/comment/commentSlice";
import { FixedSizeList as List } from "react-window";
import "./Post.css";
import { fetchSinglePostAsync } from "../../features/posts/postsSlice";

function Post() {
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.Comment.comments);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const dispatch = useDispatch();
  const itemSize = 200;
  const listHeight = 600;
  const listWidth = "100%";


  useEffect(() => {
    document.title = "X clone | Post";
    // getPost();
    dispatch(fetchSinglePostAsync(id));
    dispatch(fetchCommentAsync(id));
    setLoading(false);
  }, [id]);

  const row = ({ index, style }) => (
    <div style={style}>
      <Comment
        key={comments[index]._id}
        id={comments[index]._id}
        data={comments[index]}
      />
    </div>
  );

  if (loading || post.length > 0) {
    return (
      <div>
        <CardSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );
  }
  return (
    <div>
      <div className="post">
        <Link to={"/home"}>
          <ArrowBackIcon
            color="secondary.main"
            sx={{ textDecoration: "none", color: "secondary.main" }}
          />
        </Link>
        <h3>Post</h3>
      </div>
      
        <FeedCard
          key={post._id}
          id={post._id}
          data={post}
          pl={4}
          component={"post"}
        />
      
      {comments && (
        <div>
          <List
            height={listHeight}
            itemCount={comments.length}
            itemSize={itemSize}
            width={listWidth}
            className="hide-scrollbar"
          >
            {row}
          </List>
        </div>
      )}
    </div>
  );
}

export default Post;
