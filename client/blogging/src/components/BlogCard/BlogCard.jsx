import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

const BlogCard = ({img, date, des, tit, un}) => {
  return (
    <>
      <Card sx={{sm: {width: 100}, maxWidth: 420, mt: 3}}>
        <CardActionArea>
          <CardMedia component="img" height="180" image={img} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tit}
            </Typography>
            <Typography variant="body2" sx={{color: "text.secondary"}}>
              {des}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{display:"flex", justifyContent:"space-around", gap:18}}>
          <Typography>{un}</Typography>
          <Typography>{date}</Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default BlogCard;
