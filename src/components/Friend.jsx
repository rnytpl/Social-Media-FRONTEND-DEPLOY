import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FlexBetween } from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { useAddFriendMutation } from "features/posts/postsApiSlice";
import { updateFriends } from "features/auth/authSlice";

const Friend = ({ name, location, userPicturePath, postId, postUserId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.auth.user.friends);
  const isFriend = Boolean(friends?.find((friend) => friend === postUserId));
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [addFriend] = useAddFriendMutation();
  const addFriendHandler = async () => {
    // postID to invalidate post to refetch the updated post info from backend
    // userId is the current user who wants to befriend the owner of the post
    // postUserId is the owner of the post
    // Token is necessary to authenticate that the user who wants to befriend the other is logged in
    const formattedFriends = await addFriend({
      postId: postId,
      id: _id,
      friendId: postUserId,
    }).unwrap();

    dispatch(updateFriends(formattedFriends));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage size="55px" image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${postUserId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      {postUserId !== _id && (
        <IconButton
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          onClick={addFriendHandler}
        >
          {!isFriend ? (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};
export default Friend;
