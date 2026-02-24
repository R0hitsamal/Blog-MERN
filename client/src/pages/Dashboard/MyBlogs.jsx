import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import {Typography} from "@mui/material";
const MyBlogs = () => {
  const {username} = useParams();
  const navigate = useNavigate();
  const [myposts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/myposts/${username}`,
          {withCredentials: true}
        );
        setMyPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyPosts();
  }, []);
  return (
    <>
      <button onClick={()=>navigate("/dashboard")}>Back</button>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 600,
          display: {xs: "none", md: "block"},
          marginLeft: "2.5rem",
          marginTop: 3,
        }}
      >
        My Blogs
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 600,
          display: {xs: "block", md: "none"},
        }}
      >
        My Blogs
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {myposts.map((b, idx) => {
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

export default MyBlogs;
