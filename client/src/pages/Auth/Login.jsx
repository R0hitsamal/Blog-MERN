import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import "./auth.css";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";

export const Login = () => {
  const {setIsLoggedIn} = useAuth();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        userData,
        {withCredentials: true}
      );
      if (res.status === 200) {
        alert(`Welcome back ${res.data.user.username}`);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Box
          sx={{width: {xs: "100%", md: "500px"}}}
          className="box"
          component="section"
        >
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "rgb(14, 130, 231)",
              textAlign: "center",
            }}
            variant="h4"
            component="h3"
          >
            <i className="fa-solid fa-pen-to-square"></i>
            Blog Platform
          </Typography>

          <Typography
            sx={{
              fontFamily: "revert",
              fontWeight: 700,
              color: "black",
              fontSize: "1.8rem",
              textAlign: "center",
            }}
            variant="h4"
            component="h3"
            gutterBottom
          >
            Welcome Back!
          </Typography>

          <Typography
            sx={{fontSize: "1rem", textAlign: "center", fontWeight: 400}}
            variant="p"
            gutterBottom
          >
            Enter your credential to access your account
          </Typography>

          <TextField
            required
            label="Username"
            value={userData.username}
            onChange={handleChange}
            name="username"
          />

          <TextField
            required
            label="Password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            name="password"
          />

          <Typography sx={{fontSize: "1rem", textAlign: "center"}}>
            <Link className="link" to="">
              Forgot Password?
            </Link>
          </Typography>

          <Button className="button" variant="contained" type="submit">
            Login
          </Button>

          <Typography sx={{fontSize: "1rem", textAlign: "center"}}>
            Don't have an account?
          </Typography>

          <Typography sx={{fontSize: "1rem", textAlign: "center"}}>
            <Link className="link" to="/signup">
              Signup
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};
