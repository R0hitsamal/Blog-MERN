import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const NewPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    des: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setPostData({ ...postData, image: files[0] });
    else setPostData({ ...postData, [name]: value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPostData({ ...postData, image: file });
  };

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("des", postData.des);
    formData.append("image", postData.image);

    try {
      await axios.post("http://localhost:5000/api/posts/new", formData, {
        withCredentials: true,
      });
      setSuccessOpen(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 4}}>
        <CardContent sx={{marginBottom :6}}>
          <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
            Create New Blog Post
          </Typography>

          <Box
            component="form"
            onSubmit={createPost}
            encType="multipart/form-data"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Drag & Drop Upload */}
            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              sx={{
                border: "2px dashed #aaa",
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                cursor: "pointer",
              }}
              component="label"
            >
              <Typography>
                {postData.image
                  ? postData.image.name
                  : "Drag & Drop image here or click to upload"}
              </Typography>
              <input hidden name="image" type="file" onChange={handleChange} />
            </Box>

            {postData.image && (
              <img
                src={URL.createObjectURL(postData.image)}
                alt="preview"
                style={{ width: "100%", borderRadius: 8 }}
              />
            )}

            <TextField
              label="Title"
              name="title"
              fullWidth
              required
              value={postData.title}
              onChange={handleChange}
            />

             <TextField
              label="Description"
              name="des"
              fullWidth
              required
              multiline
              rows={4}
              value={postData.des}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Publish Post"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success" variant="filled">
          🎉 Post created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewPost;
