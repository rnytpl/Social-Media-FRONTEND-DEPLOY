import { store } from "store/store";
import { useEffect } from "react";
import { usersApiSlice } from "features/users/usersApiSlice";
import { postsApiSlice } from "features/posts/postsApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      postsApiSlice.util.prefetch("getPosts", "postsList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
