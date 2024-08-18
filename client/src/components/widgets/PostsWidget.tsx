import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostWidget from "./PostWidget";
import { ReduxState } from "../../types/reduxState";
import { useGetFeed } from "../../hooks/posts/useGetFeed";
import { setPosts } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../../util/helpers";
import Spinner from "../Spinner";

const PostsWidget = ({
  userId,
  isProfile,
}: {
  userId: string;
  isProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state: ReduxState) => state.posts);
  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (!refreshToken) navigate("/");
  }, [navigate, refreshToken]);

  const { feed, isPending, error } = useGetFeed(refreshToken, userId);
  useEffect(() => {
    if (feed) dispatch(setPosts({ posts: feed }));
  }, [dispatch, feed]);

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);

  if (!posts || !posts.length) return <h1>No posts to show</h1>;

  return posts.map((post, i) => (
    <PostWidget
      key={`${post._id.toString()}-${i}`}
      post={post}
      isProfile={isProfile}
    />
  ));
};

export default PostsWidget;
