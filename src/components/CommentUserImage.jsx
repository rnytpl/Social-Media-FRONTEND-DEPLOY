import { Box } from "@mui/material";
import { useGetUsersQuery } from "features/users/usersApiSlice";

const CommentUserImage = ({ userId, size = "25px" }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data.entities[userId],
    }),
  });

  return (
    <Box width={size} height={size} mb="0.5rem">
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={user.picturePath}
      />
    </Box>
  );
};

export default CommentUserImage;
