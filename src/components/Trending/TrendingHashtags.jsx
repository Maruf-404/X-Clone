/* eslint-disable react/prop-types */

function TrendingHashtags({ topic, title, views }) {
  return (
    <div className="trending-hashtags">
      <p>{topic}</p>
      <h5>
        <b>#{title}</b>
      </h5>
      <p>{views}k posts</p>
    </div>
  );
}

export default TrendingHashtags;
