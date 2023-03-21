import { Box, useMediaQuery } from "@mui/material";
import { selectAllPosts, useGetPostsQuery } from "features/posts/postsApiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdvertWidget from "scenes/Widgets/AdvertWidget";
import FriendsListWidget from "scenes/Widgets/FriendsListWidget";
import PostWidget from "scenes/Widgets/PostWidget";
import UserWidget from "scenes/Widgets/UserWidget";

const ProfilePage = () => {
  const { id: userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isExtraLargeScreens = useMediaQuery("(min-width: 1400px");
  const isXXLScreens = useMediaQuery("(min-width: 1600px");
  const { data } = useGetPostsQuery("postsList");
  const { ids, entities } = data;

  const userPosts = ids.filter((id) => entities[id].userId === userId);

  return (
    <Box
      width={
        isXXLScreens
          ? "70vw"
          : isExtraLargeScreens
          ? "90vw"
          : isNonMobileScreens
          ? "100vw"
          : "90vw"
      }
      sx={{ m: "auto" }}
    >
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-evenly"
        p="1rem 0"
      >
        <Box>
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined} mb="2rem">
            <UserWidget userId={userId} />
          </Box>
          <Box>
            <FriendsListWidget />
          </Box>
        </Box>

        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          {userPosts.map((id) => (
            <PostWidget key={id} postId={id} />
          ))}
        </Box>

        <Box flexBasis="30%">
          <AdvertWidget />
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
