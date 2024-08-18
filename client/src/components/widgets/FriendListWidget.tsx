import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import PostCredentilas from "../PostCredentilas";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { palette } from "../../types/ThemeWithPalette";
import { Friend, ReduxState } from "../../types/reduxState";
import { useFetchFriends } from "../../hooks/users/useFetchFriends";
import toast from "react-hot-toast";
import { setFriendsData } from "../../redux/authSlice";
import { getRefreshToken } from "../../util/helpers";
import Spinner from "../Spinner";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const { palette } = useTheme() as { palette: palette };
  const friendsData = useSelector((state: ReduxState) => state.friendsData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (!refreshToken) {
      navigate("/");
    }
  }, [navigate, refreshToken]);

  const { friends, isPending, error } = useFetchFriends(refreshToken, userId);

  useEffect(() => {
if (friends) dispatch(setFriendsData({ friends }));
  }, [dispatch, friends])

  if (isPending) return <Spinner />;

  if (error) toast.error(error.message);

  if (!friendsData) return null

  return (
    <WidgetWrapper
      palette={palette}
      style={{
        position: "sticky",
        top: "27.5rem",
        left: "0",
        zIndex: "99",
        overflow: "scroll",
        height: "20rem",
      }}
    >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>

      {friends &&
        friendsData.length > 0 &&
        friendsData.map((friend: Friend, i: number) => (
          <PostCredentilas key={i} user={friend} createdAt={null} />
        ))}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
