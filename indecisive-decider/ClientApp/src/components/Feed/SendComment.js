/**
 * SendComment.js
 * 
 * This component enables users to send comments to the feed.
 * 
 * credit:
 * https://codesandbox.io/s/dm-blog-post-comments-isdgm
 */

import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { fetchPostComment } from "../../ApiCalls";

// css for textfiled
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 16
  },
  paper: {
    padding: "4px 16px",
    flexGrow: 1,
    marginLeft: 16
  },
  input: {
    width: "100%"
  },
  divider: {
    width: 1,
    height: 24
  }
}));

/**
 * Send a comment onto the feed or post
 * @param {element} feedId
 * o@param {element} CommentAdd
 * @return {element}
 */
export default function SendComment({feedId, onCommentAdd}) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  // send the comment when click
  const handleClick = async () => {
    await fetchPostComment(feedId, value);
    onCommentAdd(value);
    setValue("");
  };

  return (
    <div id="comment-send" className={classes.root}>
      <Paper className={classes.paper}>
        <TextField
          value={value}
          className={classes.input}
          placeholder="Write a Comment"
          inputProps={{ "aria-label": "search" }}
          onChange={handleOnChange}
        />
      </Paper>

      <IconButton
        type="submit"
        aria-label="send-comment"
        onClick={handleClick}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}
