import { Box } from "@mui/material";
import { selectUserById } from "features/users/usersApiSlice";
import { useSelector } from "react-redux";

const CommentUserImage = ({ image, userId, size = "25px" }) => {
  console.log(userId, "userId CommentUserImage");
  const commentOwner = useSelector((state) => selectUserById(state, userId));

  console.log(commentOwner, "commentOwner");
  return (
    <Box width={size} height={size} mb="0.5rem">
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={commentOwner.picturePath}
      />
    </Box>
  );
};

export default CommentUserImage;
