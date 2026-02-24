import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
const PostDetails = () => {
  const navigate = useNavigate();
  const {isLoggedin} = useAuth();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(true);
  const {id} = useParams();

  const fetchPostData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkAuthor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/isAuthorised/${id}`,
        {withCredentials: true}
      );
      setIsAuthor(res.data.isAuthor);
    } catch {
      setIsAuthor(false);
    }
  };
  useEffect(() => {
    fetchPostData();
    checkAuthor();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/posts/${id}/delete`,
        {withCredentials: true}
      );
      alert(res.data.message);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    if (!isLoggedin) {
      alert("you are not loggedin");
      navigate("/login");
    } else {
      navigate(`/edit/${id}`);
    }
  };

  if (!post)
    return (
      <Typography sx={{mt: 5, textAlign: "center"}}>Loading...</Typography>
    );

  return (
    <Container maxWidth="md" sx={{mt: 5}}>
      <Card sx={{borderRadius: 3, boxShadow: 3}}>
        <CardMedia
          component="img"
          height="360"
          image={post.image?.url}
          alt={post.title}
        />

        <CardContent>
          {isAuthor ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                {post.title}
              </Typography>
              <div className="action-icons">
                <i
                  onClick={handleEdit}
                  className="fa-solid fa-pen-to-square edit-icon"
                  title="Edit"
                ></i>
                <i
                  onClick={handleDelete}
                  className="fa-solid fa-trash delete-icon"
                  title="Delete"
                ></i>
              </div>
            </div>
          ) : (
             <Typography gutterBottom variant="h4" fontWeight={600}>
                {post.title}
              </Typography>
          )}

          <Divider sx={{mb: 2}} />

          <Typography gutterBottom variant="body1" sx={{height: "70px"}}>
            {post.des}
          </Typography>
          <Divider sx={{mb: 2}} />

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Chip label={`By ${post.username}`} />
            <Chip label={new Date(post.date).toLocaleDateString()} />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostDetails;
