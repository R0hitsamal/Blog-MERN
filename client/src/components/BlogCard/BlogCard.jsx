import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
const BlogCard = ({image, date, des, tit, un}) => {
  return (
    <>
      <Card sx={{sm: {width: 100}, maxWidth: 420, mt: 3}}>
        <CardActionArea>
          <CardMedia component="img" height="180" image={image} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {tit}
            </Typography>
            <Typography variant="body2" sx={{color: "text.secondary"}}>
              {des.slice(0,50)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{display: "flex", justifyContent: "space-around", gap: 18}}
        >
          <Typography>{un}</Typography>
          <Typography>{date}</Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default BlogCard;
