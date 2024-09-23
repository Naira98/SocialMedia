import { Typography } from "@mui/material";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { Friend, IUser } from "../../types/User";
import { useFetchFriends } from "../../hooks/users/useFetchFriends";
import FriendListItem from "../FriendListItem";
import useColors from "../../hooks/util/useColors";
import Spinner from "../Spinner";

const FriendListWidget = ({ user }: { user: IUser }) => {
  const { palette } = useColors();
  const { friends, isPending } = useFetchFriends(user._id);

  if (isPending) return <Spinner />;

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
