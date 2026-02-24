import "./App.css";
import Signup from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import Container from "@mui/material/Container";
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom";
import DrawerAppBar from "./components/navbar/Navbar";
import Listing from "./pages/Listing/Listing";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPost from "./pages/NewPost";
import PostDetails from "./pages/PostDetails";
import Edit from "./pages/Edit";
import MyBlogs from "./pages/Dashboard/MyBlogs";
import Setting from "./pages/Dashboard/Setting";

function App() {
  return (
    <>
      <Router>
        <DrawerAppBar />
        <Container maxWidth="xlg">
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myblogs/:username" element={<MyBlogs />} />
            <Route path="/settings/:id" element={<Setting />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}
export default App;
