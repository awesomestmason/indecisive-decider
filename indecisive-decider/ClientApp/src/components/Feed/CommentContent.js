import React from "react";

import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { textAlign } from "@mui/system";

moment.updateLocale("en", { //format the time
  relativeTime: {
    past: function (input) {
      return input === "now" ? input : input + " ago";
    },
    s: " now",
    future: " in %s",
    ss: " %d seconds",
    m: " 1 minute",
    mm: " %d minutes",
    h: " 1 hour",
    hh: " %d hours",
    d: " 1 day",
    dd: " %d days",
    M: " 1 month",
    MM: " %d month",
    y: " 1 year",
    yy: " %d years"
  }
});

const useStyles = makeStyles({
  comment: {
    display: "flex",
    // alignItems: "center",
    margin: 16
  },
  commentText: {
    padding: "8px",
    flexGrow: "1",
    marginLeft: "16px",
    borderRadius: "4px",
    backgroundColor: "#F4F6F8"
  },
  commentAuthor: {
    display: "flex-wrap",
    textAlign: "left",
    // alignItems: "center",
    marginBottom: 16
  },
  commentTime: {
    display: "flex-wrap",
    // marginLeft: "auto",
    textAlign: "right",
    align: "right",
    fontSize: "10px",
  }
});

export default function CommentContent({ commentContent }) {
  const { id, user, avatar, comment, createdAt } = commentContent;

  const classes = useStyles();

  return (
    <>
      <div className={classes.comment}>
        <Avatar alt={avatar} src={user.avatarUrl} />
        <div className={classes.commentText}>
          <div className={classes.commentAuthor} >
            <Typography variant="body2" component="p">
              {user.username}
            </Typography>
            <Typography
              align="right"
              variant="body2"
              component="p"
              className={classes.commentTime}
            >
              {moment(createdAt).fromNow()}
            </Typography>
          </div>
          <Typography variant="body2" className="" component="p">
            {comment}
          </Typography>
        </div>
      </div>
    </>
  );
}
