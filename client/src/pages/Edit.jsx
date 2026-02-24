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
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    des: "",
    image: null,
    oldImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({editor}) => {
      setPostData((prev) => ({...prev, des: editor.getHTML()}));
    },
  });

  // Fetch existing post
  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((res) => {
      setPostData({
        title: res.data.title,
        des: res.data.des,
        image: null,
        oldImage: res.data.image?.url,
      });

      editor?.commands.setContent(res.data.des || "");
    });
  }, [id, editor]);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") setPostData({...postData, image: files[0]});
    else setPostData({...postData, [name]: value});
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPostData({...postData, image: file});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("des", postData.des);
    if (postData.image) formData.append("image", postData.image);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/posts/${id}/update`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status == 201) {
        alert(res.data.message);
        setSuccessOpen(false);
        setLoading(false);
        navigate("/");
      }

      if (res.status == 200) {
        setSuccessOpen(true);
        setTimeout(() => navigate(`/`), 1200);
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }finally{

      setLoading(false)
    }
  };

  const imageUrl = postData.oldImage;

  return (
    <Container maxWidth="sm" sx={{mt: 6}}>
      <Card sx={{borderRadius: 3, boxShadow: 4}}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
            Edit Blog Post
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{display: "flex", flexDirection: "column", gap: 2}}
          >
            {/* Drag & Drop Image */}
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
                Drag & Drop new image here or click to change
              </Typography>
              <input hidden name="image" type="file" onChange={handleChange} />
            </Box>

            {/* Image Preview */}
            {(postData.image || postData.oldImage) && (
              <img
                src={
                  postData.image
                    ? URL.createObjectURL(postData.image)
                    : imageUrl
                }
                alt="preview"
                style={{width: "100%", borderRadius: 8}}
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

            {/* TipTap Editor */}
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
              {loading ? <CircularProgress size={24} /> : "Update Post"}
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
          ✅ Post updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Edit;
