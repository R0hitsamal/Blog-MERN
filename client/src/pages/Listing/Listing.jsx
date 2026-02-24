import Typography from "@mui/material/Typography";
import {useState, useEffect} from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {useSearch} from "../../context/SearchContext";

const Listing = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const {searchValue} = useSearch();
  const retriveData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/");
      const revPost = res.data;
      setPosts(revPost);
      setAllPosts(revPost.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    retriveData();
  }, []);
  useEffect(() => {
    if (searchValue.trim() === "") {
      setPosts(allPosts);
    } else {
      const filtered = allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPosts(filtered);
    }
  }, [searchValue, allPosts]);
  return (
    <>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 600,
          display: {xs: "none", md: "block"},
          marginLeft: "2.5rem",
          marginTop: 3,
        }}
      >
        Recent Blog Post
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 600,
          display: {xs: "block", md: "none"},
        }}
      >
        Recent Blog Post
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {posts.map((b, idx) => {
          return (
            <button
              key={idx}
              onClick={() => navigate(`/post/${b._id}`)}
              style={{border: "none", backgroundColor: "white"}}
            >
              <BlogCard
                image={b.image.url}
                tit={b.title}
                des={b.des}
                un={b.username}
                date={b.date}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Listing;
