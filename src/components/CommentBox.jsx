import { Box, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { FlexBetween } from "./FlexBetween";
import { useCreateCommentMutation } from "features/posts/postsApiSlice";
import { useEffect, useState } from "react";

const CommentBox = ({ userId, postId }) => {
  const [comment, setComment] = useState("");
  const [createComment, { isSuccess }] = useCreateCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      setComment("");
    }
  }, [isSuccess]);

  const commentHandler = async (e) => {
    e.preventDefault();
    await createComment([userId, postId, comment]);
  };

  return (
    <Box width="100%" padding="0.5rem">
      <FlexBetween>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mr: "0.5rem" }}
          placeholder="Write your comment here"
          variant="standard"
          fullWidth
        />
        <IconButton onClick={commentHandler}>
          <Send />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};
export default CommentBox;
