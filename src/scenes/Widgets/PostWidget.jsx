import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Edit,
  Check,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import {
  useEditCommentMutation,
  useGetPostsQuery,
  useLikePostMutation,
} from "features/posts/postsApiSlice";
import CommentBox from "components/CommentBox";
import { useSelector } from "react-redux";
import CommentUserImage from "components/CommentUserImage";

const PostWidget = ({ postId }) => {
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const [isComments, setIsComments] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState("");
  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(post.likes[user._id]);
  const main = palette.neutral.main;
  const [likePostMutation] = useLikePostMutation();
  const [editCommentMutation] = useEditCommentMutation();
  const editCommentHandler = (commentId) => {
    console.log(postId, "postId");
    setIsEdit(!isEdit);
    editCommentMutation([postId, commentId, editComment]);
  };

  return (
    <WidgetWrapper mb="1.25rem">
      <Friend
        name={`${post.firstName} ${post.lastName}`}
        location={post.location}
        userPicturePath={post.userPicturePath}
        postId={post._id}
        postUserId={post.userId}
      />
      <Box textAlign="center" p="1rem 0.25rem">
        {post.picturePath && (
          <img width="50%" height="auto" src={post.picturePath} alt="post" />
        )}
      </Box>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post.description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() =>
                likePostMutation({ postId: post._id, userId: user._id })
              }
            >
              {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>

            <Typography>{Object.keys(post.likes).length}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box>
          {post.comments.map((comment) => (
            <Box key={comment._id} mt="1rem" display="flex" width="100%">
              <CommentUserImage userId={comment.userId} />
              {user._id === comment.userId ? (
                <Box display="flex" justifyContent="space-between" width="100%">
                  {isEdit === comment._id ? (
                    <TextField
                      defaultValue={comment.comment}
                      size="small"
                      sx={{ ml: "0.5rem" }}
                      onChange={(e) => setEditComment(e.target.value)}
                      variant="standard"
                      multiline
                      fullWidth
                    />
                  ) : (
                    <Typography
                      sx={{
                        color: main,
                        m: "0.5rem",
                        pl: "1rem",
                      }}
                    >
                      {comment.comment}
                    </Typography>
                  )}
                  {isEdit === comment._id ? (
                    <IconButton onClick={() => editCommentHandler(comment._id)}>
                      <Check />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setIsEdit(comment._id)}>
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <Typography
                  sx={{
                    color: main,
                    m: "0.5rem",
                    pl: "1rem",
                  }}
                >
                  {comment.comment}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      <CommentBox userId={user._id} postId={postId} />
    </WidgetWrapper>
  );
};

export default PostWidget;
