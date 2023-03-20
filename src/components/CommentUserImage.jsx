import { Box } from "@mui/material";
import { selectUserById, useGetUsersQuery } from "features/users/usersApiSlice";
import { useSelector } from "react-redux";

const CommentUserImage = ({ image, userId, size = "25px" }) => {
  console.log(userId, "userId CommentUserImage");
  // const commentOwner = useSelector((state) => selectUserById(state, userId));
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data.entities[userId],
    }),
  });

  console.log(user, "commentOwner");
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
