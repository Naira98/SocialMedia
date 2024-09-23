import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PostCredentilas from "../PostCredentilas";
import SmallButton from "../SmallButton";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { usePatchLike } from "../../hooks/posts/usePatchLike";
import { useAddComment } from "../../hooks/posts/useAddComment";
import useColors from "../../hooks/util/useColors";
import { useAuth } from "../../contexts/useAuth";
import { IPost } from "../../types/Post";

const PostWidget = ({
  post,
  isProfile,
  i,
}: {
  post: IPost;
  isProfile: boolean;
  i: number;
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

  const { userId: loggedInUserId } = useAuth();
  const isLiked = likes.includes(loggedInUserId!);
  const likeCount = Object.keys(likes).length;

  const name = `${userData.firstName} ${userData.lastName}`;

  const { patchLike } = usePatchLike({ postCreatorId: userData._id });
  const { addComment } = useAddComment({
    postCreatorId: userData._id,
    setComment,
  });

  const {primaryMain, neutralMain, palette} = useColors()

  return (
    <WidgetWrapper palette={palette} m={isProfile && i === 0 ? "0" : "2rem 0"}>
      <PostCredentilas
        postedBy={userData}
        createdAt={createdAt}
        postId={postId.toString()}
        isProfile={isProfile}
      />
      <Typography color={neutralMain} sx={{ mt: "1rem" }}>
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
            <IconButton onClick={() => patchLike(postId.toString())}>
              {isLiked ? (
                <FavoriteOutlinedIcon sx={{ color: primaryMain }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>

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
            <SmallButton
              disabled={!comment}
              onClick={(e) => {
                e.preventDefault();
                addComment({ comment, postId: postId.toString() });
              }}
            >
              Add Comment
            </SmallButton>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
