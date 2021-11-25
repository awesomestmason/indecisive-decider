import React from "react";

import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";

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
    display: "flex",
    // alignItems: "center",
    marginBottom: 16
  },
  commentTime: {
    marginLeft: "auto"
  }
});

export default function CommentContent({ commentContent }) {
  console.log(commentContent);

  const { id, user, avatar, comment, createdAt } = commentContent;
  console.log(id);

  const classes = useStyles();

  return (
    <>
      <div className={classes.comment}>
        <Avatar alt={avatar} src={avatar} />
        <div className={classes.commentText}>
          <div className={classes.commentAuthor}>
            <Typography variant="body2" component="p">
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.commentTime}
            >
              {moment(createdAt).fromNow()}
            </Typography>
          </div>
          <Typography variant="body2" component="p">
            {comment}
          </Typography>
        </div>
      </div>
    </>
  );
}
