import { Box, IconButton, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useFetchFriends } from "../hooks/users/useFetchFriends";
import FlexBetween from "./styledComponents/FlexBetween";
import UserImage from "./UserImage";
import { useAddRemoveFriend } from "../hooks/users/useAddRemoveFriend";
import { Friend } from "../types/User";
import useColors from "../hooks/util/useColors";

const FriendListItem = ({ user }: { user: Friend }) => {
  const { _id: friendId, firstName, lastName, picturePath, occupation } = user;
  const { userId: currentUserId } = useAuth();

  const { friends } = useFetchFriends(currentUserId!);

  const isFriend = Boolean(friends?.find((f) => f._id === friendId));

  const { addRemoveFriend } = useAddRemoveFriend({
    friendId,
    currentUserId: currentUserId!,
  });

  const { primaryLight, primaryMain, primaryDark, neutralMain, neutralMed } = useColors();

  return (
    <FlexBetween mb="1rem">
      <FlexBetween gap="1rem">
        <Link to={`/profile/${friendId}`}>
          <UserImage image={picturePath} />
        </Link>
        <Box>
          <Link to={`/profile/${friendId}`} style={{ textDecoration: "none" }}>
            <Typography
              color={neutralMain}
              variant="h5"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {firstName + " " + lastName}
            </Typography>
          </Link>
          <Typography color={neutralMed} fontSize="0.75rem">
            {occupation}
          </Typography>
        </Box>
      </FlexBetween>

      {/* ADD FRIEND */}
      {friendId !== currentUserId && (
        <IconButton
          onClick={() => {
            addRemoveFriend(user._id);
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlinedIcon
              sx={{ color: primaryDark, fontSize: "20px" }}
            />
          ) : (
            <PersonAddOutlinedIcon
              sx={{ color: primaryMain, fontSize: "20px" }}
            />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default FriendListItem;
