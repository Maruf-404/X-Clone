import axios from "../../components/AxiosInstance/AxiosInstance";
import getCookie from "../../Cookies/GetCookie";
import { useEffect, useState } from "react";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import FeedCard from "../../components/FeedCard/FeedCard";


function Bookmark() {
  let accessToken = getCookie("accessToken");
  const [bookmarkedPost, setBookmarkedPost] = useState([]);
  const [loading, setLoading] = useState(true);


  const getBookmarkPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        "/social-media/bookmarks?page=1&limit=5",
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
      bookmarkedPost &&  bookmarkedPost.map((data) => {
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

export default Bookmark;
