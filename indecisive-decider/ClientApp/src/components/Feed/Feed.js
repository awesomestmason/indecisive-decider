import * as React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";

import SendComment from "./SendComment";
import CommentContent from "./CommentContent";
import data from "../Feed/data";

// const { id, result, presetName, username, date, comments } = data[1];
// console.log(data[1]);
// console.log(comments);

const theme = createTheme({
   typography: {
     fontFamily: '"Courier New"', // set font
      body1: {
        fontWeight: 'bold', // or 'bold'
      },
      button: {
        fontWeight: 'bold', // or 'bold'
      },
      root: {
        fontWeight: 'bold', // or 'bold'
      },
    }
});  

const RootStyle = styled(Card)({
  // boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  // minWidth: 1050,
});

const ExpandMore = styled((props) => {
  //create a style called ExpandMore
  const { expand, ...other } = props;
  //... is for other props
  //console.log(other);
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  //rotate the comment icon
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return data.map(({ id, result, presetName, username, date, comments }) => (
    <RootStyle sx={false}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          RNG result: {result}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          presetName: {presetName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comment"
        >
          <CommentRoundedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SendComment />
          {comments.map((commentContent, i) => (
            <div key={commentContent.id}>
              <Divider />
              <CommentContent commentContent={commentContent} />
            </div>
          ))}
        </CardContent>
      </Collapse>
    </RootStyle>
  ));
}