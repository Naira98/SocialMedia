import { useDropzone } from "react-dropzone";
import FlexBetween from "./styledComponents/FlexBetween";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Palette } from "../types/ThemeWithPalette";
import React, { useCallback } from "react";

const Dropzone = ({
  picture,
  setFieldValue,
  setImage,
}: {
  picture: File | null;
  setFieldValue?: (key: string, value: File | null) => void;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const { palette } = useTheme() as { palette: Palette };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (setFieldValue) {
        setFieldValue("picture", acceptedFiles[0]);
      } else if (setImage) {
        setImage(acceptedFiles[0]);
      }
    },
    [setFieldValue, setImage]
  );
  const onDelete = useCallback(() => {
    if (setFieldValue) {
      setFieldValue("picture", null);
    } else if (setImage) {
      setImage(null);
    }
  }, [setFieldValue, setImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <FlexBetween>
        <Box
          {...getRootProps()}
          border={`2px dashed ${palette.primary.main}`}
          p="1rem"
          width="100%"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <input {...getInputProps()} />
          {!picture ? (
            <p>Add Image Here</p>
          ) : (
            <FlexBetween>
              <Typography>{picture.name}</Typography>
              <EditOutlinedIcon />
            </FlexBetween>
          )}
        </Box>
        {picture && (
          <IconButton onClick={onDelete} sx={{ width: "15%" }}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>
    </div>
  );
};

export default Dropzone;
