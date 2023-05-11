import { Box, useMediaQuery } from "@mui/material";
import { useGetPostsQuery } from "features/posts/postsApiSlice";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import { useSelector } from "react-redux";
import AdvertWidget from "scenes/Widgets/AdvertWidget";
import FriendsListWidget from "scenes/Widgets/FriendsListWidget";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import UserWidget from "scenes/Widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isExtraLargeScreens = useMediaQuery("(min-width: 1400px");
  const isXXLScreens = useMediaQuery("(min-width: 1600px");
  const { isLoading } = useGetUsersQuery("usersList", {
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const user = useSelector((state) => state.auth.user);
  // const { post } = useGetPostsQuery("postsList", {
  //   selectFromResult: ({ data }) => ({
  //     post: data?.entities[postId],
  //   }),
  // });

  if (isLoading) {
    return <p>is Loading...</p>;
  }

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
        width="100%"
        padding={isNonMobileScreens ? "2rem 6%" : "2rem 0.75rem"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="30%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendsListWidget />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
