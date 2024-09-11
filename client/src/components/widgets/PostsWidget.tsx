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
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Palette } from "../../types/ThemeWithPalette";
import WidgetWrapper from "../styledComponents/WidgetWrapper";

const PostsWidget = ({
  userId,
  isProfile,
}: {
  userId: string;
  isProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme() as { palette: Palette };

  const posts = useSelector((state: ReduxState) => state.posts);
  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (!refreshToken) navigate("/");
  }, [navigate, refreshToken]);

  const { feed, isPending, error } = useGetFeed(
    refreshToken,
    userId,
    isProfile
  );

  useEffect(() => {
    if (feed) dispatch(setPosts({ posts: feed }));
  }, [dispatch, feed]);

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);

  if (!posts || !posts.length)
    return (
      <WidgetWrapper palette={palette} style={{ textAlign: "center", padding: '3rem' }}>
        <Typography color={palette.neutral.medium} fontSize="1.5rem">
          No posts to show
        </Typography>
      </WidgetWrapper>
    );

  return posts.map((post, i) => (
    <PostWidget
      key={`${post._id.toString()}-${i}`}
      post={post}
      isProfile={isProfile}
      i={i}
    />
  ));
};

export default PostsWidget;
