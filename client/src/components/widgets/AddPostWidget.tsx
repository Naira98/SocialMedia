import { useState } from "react";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { Box, IconButton, InputBase } from "@mui/material";
import UserImage from "../UserImage";
import Dropzone from "../Dropzone";
import SmallButton from "../SmallButton";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { useAddPost } from "../../hooks/posts/useAddPost";
import useColors from "../../hooks/util/useColors";
import { useAuth } from "../../contexts/useAuth";
import { Link } from "react-router-dom";

type State = File | null;

const AddPostWidget = ({ picturePath }: { picturePath: string }) => {
  const [post, setPost] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<State>(null);
  const { addPost } = useAddPost(setImage, setIsImage, setPost);
  const { userId } = useAuth();

  const { neutralLight, neutralMedMain, neutralMed, palette } = useColors();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPost({ post, image });
      }}
    >
      <WidgetWrapper palette={palette} mb="1.5rem">
        <FlexBetween gap="1rem" mb="1rem">
          <Link to={`/profile/${userId}`}>
            <UserImage image={picturePath} />
          </Link>
          <InputBase
            onChange={(e) => {
              setPost(e.target.value);
            }}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: neutralLight,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
            placeholder="What's in your mind?"
          />
          <IconButton onClick={() => setIsImage((i) => !i)}>
              <CollectionsOutlinedIcon sx={{ color: neutralMedMain }} />
            </IconButton>
            <SmallButton disabled={!post}>POST</SmallButton>
        </FlexBetween>

        {isImage && (
          <Box
            border={`1px solid ${neutralMed}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone picture={image} setImage={setImage} />
          </Box>
        )}

      </WidgetWrapper>
    </form>
  );
};

export default AddPostWidget;
