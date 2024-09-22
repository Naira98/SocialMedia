import { Box, IconButton, Typography, useTheme } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useAuth } from "../contexts/useAuth";
import { useFetchFriends } from "../hooks/users/useFetchFriends";
import { Friend } from "../types/User";
import { Palette } from "../types/ThemeWithPalette";
import FlexBetween from "./styledComponents/FlexBetween";
import { Link } from "react-router-dom";
import UserImage from "./UserImage";
import { useAddRemoveFriend } from "../hooks/users/useAddRemoveFriend";

const FriendListItem = ({ user }: { user: Friend }) => {
  const { _id: friendId, firstName, lastName, picturePath, occupation } = user;
  const { userId: currentUserId } = useAuth();

  const { friends } = useFetchFriends(currentUserId!);

  const isFriend = Boolean(friends?.find((f) => f._id === friendId));

  const { addRemoveFriend } = useAddRemoveFriend({
    friendId,
    currentUserId: currentUserId!,
  });

  const { palette } = useTheme() as { palette: Palette };
  const primaryLight = palette.primary.light;
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween mb="1rem">
      <FlexBetween gap="1rem">
        <Link to={`/profile/${friendId}`}>
          <UserImage image={picturePath} />
        </Link>
        <Box>
          <Link to={`/profile/${friendId}`} style={{ textDecoration: "none" }}>
            <Typography
              color={main}
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
          <Typography color={medium} fontSize="0.75rem">
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
