import Typography from "@mui/material/Typography";
import blogPosts from "../../../public/DATA/BlogPost";
import BlogCard from "../../components/BlogCard/BlogCard";
import Container from "@mui/material/Container";
const Listing = () => {
  return (
    <>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            display: {xs: "none", md: "block"},
            marginLeft:"2.5rem",
            marginTop:3
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
        {blogPosts.map((b, idx) => {
          return (
            <BlogCard
              img={b.image}
              tit={b.title}
              des={b.description}
              un={b.username}
              date={b.date}
              key={idx}
            />
          );
        })}
      </div>
    </>
  );
};

export default Listing;
