import { useGetPostsQuery } from "features/posts/postsApiSlice";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(
    "postsList",
    {
      pollingInterval: 15000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  const { ids } = data;

  if (isLoading) {
    return <p>is Loading...</p>;
  }
  return (
    <>{ids.length && ids.map((id) => <PostWidget key={id} postId={id} />)}</>
  );
};
export default PostsWidget;
