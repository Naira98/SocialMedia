import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, IconButton, Typography } from "@mui/material";
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

const PostWidget = ({ post, isProfile }: { post: Post, isProfile:boolean }) => {
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
  const tokens = useSelector((state: ReduxState) => state.tokens);
  const { _id: loggedInUserId } = useSelector(
    (state: ReduxState) => state.user
  )!;
  const isLiked = Boolean(likes[loggedInUserId.toString()]);
  const likeCount = Object.keys(likes).length;
  const name = `${userData.firstName} ${userData.lastName}`;
  const { patchLike } = usePatchLike();

  const { palette } = useTheme() as { palette: palette };
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper palette={palette} m="2rem 0">
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
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
