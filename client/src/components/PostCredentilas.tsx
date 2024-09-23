import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatDistanceToNow } from "date-fns";
import UserImage from "./UserImage";
import FlexBetween from "./styledComponents/FlexBetween";
import { useAddRemoveFriend } from "../hooks/users/useAddRemoveFriend";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import { useAuth } from "../contexts/useAuth";
import { PostCreator } from "../types/User";
import { useFetchFriends } from "../hooks/users/useFetchFriends";
import useColors from "../hooks/util/useColors";

const PostCredentilas = ({
  postedBy,
  createdAt,
  postId,
  isProfile = false,
}: {
  postedBy: PostCreator;
  createdAt: Date;
  postId: string;
  isProfile?: boolean;
}) => {
  const postCreatorId = postedBy._id;
  const { userId: currentUserId } = useAuth();

  const { friends } = useFetchFriends(currentUserId!);
  const isFriend = Boolean(
    friends?.find((friend) => friend._id === postCreatorId)
  );
  const { addRemoveFriend } = useAddRemoveFriend({
    friendId: postedBy._id,
    currentUserId: currentUserId!,
  });
  const { deletePost } = useDeletePost();
  const { primaryLight, primaryMain, primaryDark, neutralMain, neutralMed } =
    useColors();

  const date = formatDistanceToNow(createdAt);

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
              {`${postedBy.firstName} ${postedBy.lastName}`}
            </Typography>
          </Link>
          <Typography color={neutralMed} fontSize="0.75rem">
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
