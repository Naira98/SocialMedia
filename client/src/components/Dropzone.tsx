import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FlexBetween from "./styledComponents/FlexBetween";
import useColors from "../hooks/util/useColors";

const Dropzone = ({
  picture,
  setFieldValue,
  setImage,
}: {
  picture: File | null;
  setFieldValue?: (key: string, value: File | null) => void;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const { primaryMain } = useColors();

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
          border={`2px dashed ${primaryMain}`}
          p="1rem"
          width="100%"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <input {...getInputProps()} />
          {!picture ? (
            <p style={{ textAlign: "center" }}>Add Image Here</p>
          ) : (
            <FlexBetween>
              <Typography>{picture.name}</Typography>
              <EditOutlinedIcon />
            </FlexBetween>
          )}
        </Box>
        {picture && (
          <IconButton
            onClick={onDelete}
            sx={{ marginX: "1rem", height: "50px", width: "50px" }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>
    </div>
  );
};

export default Dropzone;
