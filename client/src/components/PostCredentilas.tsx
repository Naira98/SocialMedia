import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatDistanceToNow } from "date-fns";
import UserImage from "./UserImage";
import FlexBetween from "./styledComponents/FlexBetween";
import { Palette } from "../types/ThemeWithPalette";
import { useAddRemoveFriend } from "../hooks/users/useAddRemoveFriend";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import { useAuth } from "../contexts/useAuth";
import { PostCreator } from "../types/User";
import { useFetchFriends } from "../hooks/users/useFetchFriends";

const PostCredentilas = ({
  postedBy,
  createdAt,
  postId,
  isProfile = false,
}: {
  postedBy: PostCreator;
  createdAt: Date | null;
  postId: string;
  isProfile?: boolean;
}) => {
  const name = `${postedBy.firstName} ${postedBy.lastName}`;
  const postCreatorId = postedBy._id;
  const { userId: currentUserId } = useAuth();
  
  const { friends } = useFetchFriends(currentUserId!);
  const isFriend = Boolean(friends?.find((friend) => friend._id === postCreatorId));
  const { addRemoveFriend } = useAddRemoveFriend({
    friendId: postedBy._id,
    currentUserId: currentUserId!,
  });
  const { deletePost } = useDeletePost();

  const { palette } = useTheme() as { palette: Palette };
  const primaryLight = palette.primary.light;
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const date = createdAt ? formatDistanceToNow(createdAt) : null;

  return (
    <FlexBetween mb="1rem">
      <FlexBetween gap="1rem">
        <Link to={`/profile/${postCreatorId}`}>
          <UserImage image={postedBy.picturePath} />
        </Link>
        <Box>
          <Link
            to={`/profile/${postCreatorId}`}
            style={{ textDecoration: "none" }}
          >
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
              {name}
            </Typography>
          </Link>
          <Typography color={medium} fontSize="0.75rem">
            {date + " ago"}
          </Typography>
        </Box>
      </FlexBetween>

      {/* ADD FRIEND */}
      {postedBy._id !== currentUserId && !isProfile && (
        <IconButton
          onClick={() => {
            addRemoveFriend(postedBy._id);
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

      {/* DELETE POST */}
      {postedBy._id === currentUserId && (
        <IconButton
          onClick={() => {
            deletePost(postId);
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <DeleteOutlineOutlinedIcon
            sx={{ color: primaryDark, fontSize: "20px" }}
          />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default PostCredentilas;
