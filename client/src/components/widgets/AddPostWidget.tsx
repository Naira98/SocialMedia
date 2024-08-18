import { useState } from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import VideocamIcon from "@mui/icons-material/Videocam";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";

import UserImage from "../UserImage";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { palette } from "../../types/ThemeWithPalette";
import { ReduxState, Token } from "../../types/reduxState";
import { useAddPost } from "../../hooks/posts/useAddPost";

type State = File | null;

const AddPostWidget = ({ picturePath }: { picturePath: string }) => {
  const [post, setPost] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<State>(null);
  const tokens: Token = useSelector((state: ReduxState) => state.tokens)!;
  const { location } = useSelector((state: ReduxState) => state.user)!;
  const { addPost } = useAddPost(setImage,setIsImage, setPost);

  const { palette } = useTheme() as { palette: palette };
  const main = palette.primary.main;
  const light = palette.neutral.light;
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper palette={palette} mb="1.5rem">
      <FlexBetween gap="1.5rem" mb="1rem">
        <UserImage image={picturePath} />
        <InputBase
          onChange={(e) => {
            setPost(e.target.value);
          }}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          placeholder="What's in your mind?"
        />
      </FlexBetween>

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlinedIcon />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ m: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="2rem">
          <FlexBetween gap="0.25rem" onClick={() => setIsImage((i) => !i)}>
            <IconButton>
              <CollectionsOutlinedIcon sx={{ color: mediumMain }} />
            </IconButton>
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <IconButton>
              <VideocamIcon sx={{ color: mediumMain }} />
            </IconButton>
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Live Video
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <IconButton>
              <MoodOutlinedIcon sx={{ color: mediumMain }} />
            </IconButton>
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Activity / Feeling
            </Typography>
          </FlexBetween>
        </FlexBetween>
        {tokens && (
          <Button
            disabled={!post}
            onClick={() => addPost({ post, image, location: location! })}
            sx={{
              color: palette.background.alt,
              backgroundColor: main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AddPostWidget;
