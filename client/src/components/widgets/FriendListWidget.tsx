import { Typography } from "@mui/material";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { Friend, IUser } from "../../types/User";
import { useFetchFriends } from "../../hooks/users/useFetchFriends";
import FriendListItem from "../FriendListItem";
import useColors from "../../hooks/util/useColors";
import Spinner from "../Spinner";

const FriendListWidget = ({ user }: { user: IUser }) => {
  const { neutralDark, palette } = useColors();
  const { friends, isPending } = useFetchFriends(user._id);

  if (isPending)
    return (
      <WidgetWrapper
        palette={palette}
        style={{
          position: "fixed",
          width: "279px",
          top: "29rem",
          bottom: "1rem",
          overflow: "scroll",
        }}
      >
        <Spinner />
      </WidgetWrapper>
    );

  return (
    <WidgetWrapper
      palette={palette}
      style={{
        position: "fixed",
        width: "279px",
        top: "29rem",
        bottom: "1rem",
        overflow: "scroll",
      }}
    >
      <Typography
        color={neutralDark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List of {user.firstName}
      </Typography>

      {friends &&
        friends.length > 0 &&
        friends.map((friend: Friend, i: number) => (
          <FriendListItem key={i} friend={friend} />
        ))}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
