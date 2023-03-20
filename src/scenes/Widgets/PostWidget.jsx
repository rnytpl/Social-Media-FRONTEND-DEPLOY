import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import {
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
  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(post.likes[user._id]);
  // const primaryLight = palette.primary.main;
  const main = palette.neutral.main;
  const [likePostMutation] = useLikePostMutation();

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
            <Box key={comment._id} mt="1rem">
              <FlexBetween sx={{ justifyContent: "flex-start" }}>
                <CommentUserImage userId={comment.userId} />
                <Typography
                  sx={{
                    color: main,
                    m: "0.5rem",
                    pl: "1rem",
                  }}
                >
                  {comment.comment}
                </Typography>
              </FlexBetween>
            </Box>
          ))}
        </Box>
      )}
      <CommentBox userId={user._id} postId={postId} />
    </WidgetWrapper>
  );
};

export default PostWidget;
