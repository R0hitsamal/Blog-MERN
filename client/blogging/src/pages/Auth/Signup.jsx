import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./auth.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import DrawerAppBar from "../../components/navbar/Navbar";
const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // const [userCreated, setUserCreated] = useState(false);
  // const [err,seterr] = useState(false)
  // const [response,setResponse] = useState("")

  const handleChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      userDetails
    );
    alert(res.data.message);
    console.log(res);
    if (res.status === 201) {
      // setUserCreated(true)
      setUserDetails({
        ...userDetails,
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };
  return (
    <div className="container">
      <Box sx={{width: {xs: "100%", md: "500px"}}} className="box" component="section">
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
          <i class="fa-solid fa-pen-to-square"></i>
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
          Create Your Account
        </Typography>
        <Typography
          sx={{fontSize: "1rem", textAlign: "center", fontWeight: 400}}
          variant="p"
          gutterBottom
        >
          Join our community and start sharing your story
        </Typography>
        <TextField
          required
          id="outlined-basic"
          name="username"
          label="Username"
          variant="outlined"
          value={userDetails.username}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-basic"
          name="email"
          label="Email"
          variant="outlined"
          value={userDetails.email}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-basic"
          name="password"
          label="Password"
          variant="outlined"
          value={userDetails.password}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          name="cpassword"
          value={userDetails.cpassword}
          onChange={handleChange}
        />
        <Button className="button" variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
        <Typography
          sx={{fontSize: "1rem", textAlign: "center", fontWeight: 400}}
          variant="p"
        >
          Already have an account?{" "}
          <Link className="link" to="/login">
            {" "}
            Login
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Signup;
