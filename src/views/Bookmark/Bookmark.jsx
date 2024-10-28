import axios from "axios";
import getCookie from "../../Cookies/GetCookie";
import { useEffect, useState } from "react";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import FeedCard from "../../components/FeedCard/FeedCard";
import { FixedSizeList as List } from "react-window";

function Bookmark() {
  let accessToken = getCookie("accessToken");
  const [bookmarkedPost, setBookmarkedPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemSize = 600;
  const listHeight = 1000;
  const listWidth = "100%";

  const getBookmarkPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        "https://infinity-api-94fa.onrender.com/api/v1/social-media/bookmarks?page=1&limit=5",
        config
      );

      setBookmarkedPost(res.data.data.bookmarkedPosts);
      setLoading(false);
    } catch (error) {
      console.log("Error in Bookmark api", error);
    }
  };

  useEffect(() => {
    document.title = "X clone | Bookmark" 
    getBookmarkPosts();
  }, []);

  const row = ({ index, style }) => (
    <div style={style}>
      <FeedCard
        key={bookmarkedPost[index]._id}
        id={bookmarkedPost[index]._id}
        data={bookmarkedPost[index]}
        pl={8}
        component={"bookmark"}
      />
    </div>
  );
  return (
    <div>
      <h2 style={{ padding: "1rem" }}>Bookmarks</h2>
      {bookmarkedPost.length == 0 && !loading ? (
        <h3 style={{ textAlign: "center" }}>No Bookmark Posts</h3>
      ) : (
        ""
      )}
      {loading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        <List
          height={listHeight}
          itemCount={bookmarkedPost.length}
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

export default Bookmark;
