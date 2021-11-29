/**
 * Feed.js
 * 
 * Main Author: Qiance Yu
 * Supporting Author:
 * 
 * This component enables display feeds 
 * that includes the results of the users' decision 
 * at the RNG and the preset name.
 * 
 * 
 * credit
 * https://codesandbox.io/s/fb-comment-logger-xzppb
 */

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";

import SendComment from "./SendComment";
import CommentContent from "./CommentContent";
import { fetchFeed } from "../../ApiCalls";
import moment from "moment";

import {firstBy} from "thenby";

//Using moment update local so we get a certain time
moment.updateLocale("en", {
  relativeTime: {
    past: function (input) {
      return input === "now" ? input : input + " ago";
    },
    s: "now",
    future: "in %s",
    ss: "%d seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d month",
    y: "1 year",
    yy: "%d years"
  }
});
 
//setting the card design
const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
});

//be able to expand the feed to see comments.
const ExpandMore = styled((props) => {
  //create a style called ExpandMore
  const { expand, ...other } = props;
  //... is for other props
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  // rotate the comment icon
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

// be able to see the feed data and return the user information of whoever made that post.
export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(null);

  const [feed, setFeed] = React.useState([]);
  React.useEffect( ()=> {
    fetchFeed().then(feedData => {
      setFeed(feedData);

    });
  }, []);

  const handleExpandClick = id => () => {
    setExpanded(!expanded);
    // setExpanded(expanded ? id: null);
    // console.log('id: '+id); 
    // console.log('expanded: '+expanded);
    // TODO BUG
  };

  /**
  * show the feed
  * @param {string} id - user id
  * @param {string} result - decision result
  * @param {string} presetName - preset name
  * @param {string} username - username
  * @param {string} date - decision date
  * @param {string} comments - others comments
  * @return {element}
  */
  return feed.map(({ id, result, presetName, username, date, comments }) => (
    <RootStyle sx={false}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={moment(date).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          RNG Result: {result}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preset Name: {presetName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton> */}
        <ExpandMore
          key={id}
          expand={expanded}
          onClick={handleExpandClick(id)}
          aria-expanded={expanded}
          aria-label="comment"
        >
          <CommentRoundedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
        <CardContent>
          <SendComment feedId={id} onCommentAdd={(value)=>{
            fetchFeed().then(feedData => {
              setFeed(feedData);
            });
          }}/>
          {comments.sort(firstBy(e => e.createdAt)).reverse().map((commentContent) => (
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