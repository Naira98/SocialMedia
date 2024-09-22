import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { Palette } from "../../types/ThemeWithPalette";
import { Friend, IUser } from "../../types/User";
import { useFetchFriends } from "../../hooks/users/useFetchFriends";
import FriendListItem from "../FriendListItem";

const FriendListWidget = ({ user }: { user: IUser }) => {
  const { palette } = useTheme() as { palette: Palette };
  const { friends } = useFetchFriends(user._id);

  return (
    <WidgetWrapper
      palette={palette}
      style={{
        position: "sticky",
        top: "27.5rem",
        left: "0",
        zIndex: "99",
        overflow: "scroll",
        height: "19.75rem",
      }}
    >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List of {user.firstName}
      </Typography>

      {friends &&
        friends.length > 0 &&
        friends.map((friend: Friend, i: number) => (
          <FriendListItem key={i} user={friend} />
        ))}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
