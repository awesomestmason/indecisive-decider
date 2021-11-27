import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { fetchPostComment } from "../../ApiCalls";
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    padding: 16
  },
  paper: {
    // backgroundColor: "red",
    padding: "4px 16px",
    flexGrow: 1,
    marginLeft: 16
  },
  input: {
    // backgroundColor: "blue",
    width: "100%"
  },
  iconButton: {
    // backgroundColor: "green",
  },
  divider: {
    width: 1,
    height: 24
  }
}));

export default function SendComment({feedId, onCommentAdd}) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    fetchPostComment(feedId, value);
    onCommentAdd(value);
    setValue("");
    console.log("SEND COMMENT"); // do something
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
        className={classes.iconButton}
        aria-label="send-comment"
        onClick={handleClick}
        // size="small"
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}
