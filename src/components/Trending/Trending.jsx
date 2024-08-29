import TrendingHashtags from "./TrendingHashtags";
import "./Trending.css";

function Trending() {
  return (
    <div className="trending">
      <h2>
        <b>What’s happening</b>
      </h2>
      <TrendingHashtags
        topic={"Entertainment"}
        title={"Kalki2898ad"}
        views={999}
      />
      <TrendingHashtags topic={"Tech"} title={"React"} views={100} />
      <TrendingHashtags topic={"Sports"} title={"Trophy"} views={470} />
      <TrendingHashtags topic={"Music"} title={"Lana del rey"} views={57.4} />
      <p className="footer">
        Terms of Service &nbsp;&nbsp; Privacy Policy &nbsp;&nbsp; Cookie Policy
        &nbsp;&nbsp;Accessibility&nbsp; &nbsp;Ads&nbsp; &nbsp;info&nbsp;&nbsp;
        More&nbsp; © 2024 X
      </p>
    </div>
  );
}

export default Trending;
