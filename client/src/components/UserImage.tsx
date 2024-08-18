import { Box } from "@mui/material";

const UserImage = ({
  image,
  size = "60px",
}: {
  image?: string;
  size?: string;
}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`http://localhost:3000/assets/${image}`}
        alt="user"
      />
    </Box>
  );
};

export default UserImage;
