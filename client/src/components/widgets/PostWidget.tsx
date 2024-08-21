import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useTheme } from "@emotion/react";

import PostCredentilas from "../PostCredentilas";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { ReduxState } from "../../types/reduxState";
import { Post } from "../../../../types/Post";
import { palette } from "../../types/ThemeWithPalette";
import { usePatchLike } from "../../hooks/posts/usePatchLike";
import { useAddComment } from "../../hooks/posts/useAddComment";

const PostWidget = ({
  post,
  isProfile,
  i
}: {
  post: Post;
  isProfile: boolean;
  i: number
}) => {
  const {
    _id: postId,
    userId: userData,
    description,
    picturePath,
    likes,
    comments,
    createdAt,
  } = post;

  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const tokens = useSelector((state: ReduxState) => state.tokens);
  const { _id: loggedInUserId } = useSelector(
    (state: ReduxState) => state.user
  )!;
  const isLiked = Boolean(likes[loggedInUserId.toString()]);
  const likeCount = Object.keys(likes).length;
  const name = `${userData.firstName} ${userData.lastName}`;
  const { patchLike } = usePatchLike();
  const { addComment } = useAddComment(setComment);

  const { palette } = useTheme() as { palette: palette };
  const primatyMain = palette.primary.main;
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper palette={palette} m={isProfile && i === 0 ? "0": "2rem 0"}>
      <PostCredentilas
        user={userData}
        createdAt={createdAt}
        postId={postId.toString()}
        isProfile={isProfile}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}

      {/* LIKE POST */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {tokens && (
              <IconButton onClick={() => patchLike(postId.toString())}>
                {isLiked ? (
                  <FavoriteOutlinedIcon sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
            )}
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* VIEW COMMENTS */}
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments((c) => !c);
              }}
            >
              <CommentOutlinedIcon />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography p="0.15rem">{comment}</Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween style={{ marginTop: "0.5rem" }}>
            <Input
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: "70%" }}
            />
            <Button
              disabled={!comment}
              onClick={() => addComment({ comment, postId: postId.toString() })}
              sx={{
                color: palette.background.alt,
                backgroundColor: primatyMain,
                borderRadius: "3rem",
              }}
            >
              Add Comment
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
