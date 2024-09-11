import { useSelector } from "react-redux";
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
import { Friend, ReduxState } from "../types/reduxState";
import { useAddDeleteFriend } from "../hooks/users/useAddRemoveFriend";
import { useDeletePost } from "../hooks/posts/useDeletePost";

const PostCredentilas = ({
  user,
  createdAt,
  postId = null,
  isProfile = false,
}: {
  user: Friend; // post creator or in friend list
  createdAt: Date | null;
  postId?: string | null;
  isProfile?: boolean;
}) => {
  const name = `${user.firstName} ${user.lastName}`;
  const postCreatorId = user._id;
  const { friends, _id } = useSelector((state: ReduxState) => state.user)!;
  const tokens = useSelector((state: ReduxState) => state.tokens);
  const isFriend = friends.find((friend) => friend === user._id);
  const { addRemoveFriend } = useAddDeleteFriend({freindId: user._id});
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
          <UserImage image={user.picturePath} />
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
            {date ? date + ' ago' : user.occupation}
          </Typography>
        </Box>
      </FlexBetween>

      {/* ADD FRIEND */}
      {user._id !== _id && !isProfile && tokens && (
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
      {/* DELETE POST */}
      {postId && tokens && user._id === _id && (
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
