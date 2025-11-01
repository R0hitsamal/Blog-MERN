import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import "./auth.css";

const Login = () => {
  return (
    <div className="container">
      <Box
        sx={{width: {xs: "100%", md: "500px"}}}
        className="box"
        component="section"
      >
        <Typography
          sx={{
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "rgb(14, 130, 231)",
            fontSize: "1.25rem",
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
          id="outlined-basic"
          label="Username or Email"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Typography
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            fontWeight: 400,
            margin: 2,
          }}
          variant="p"
        >
          <Link className="link" to="">
            Forgot Password?
          </Link>
        </Typography>
        <Button className="button" variant="contained">
          Login
        </Button>
        <Typography
          sx={{fontSize: "1rem", textAlign: "center", fontWeight: 400}}
          variant="p"
        >
          Don't have an account?
        </Typography>
        <Typography
          sx={{fontSize: "1rem", textAlign: "center", fontWeight: 400}}
          variant="p"
        >
          <Link className="link" to="/signup">
            Signup
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
