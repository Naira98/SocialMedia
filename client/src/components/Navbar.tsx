import { Link } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLogut } from "../hooks/auth/useLogout";
import FlexBetween from "./styledComponents/FlexBetween";
import UserImage from "./UserImage";
import { useMode } from "../contexts/useMode";
import { useAuth } from "../contexts/useAuth";
import { useGetMe } from "../hooks/auth/useGetMe";
import Spinner from "./Spinner";
import useColors from "../hooks/util/useColors";

const Navbar = () => {
  const { mode, changeMode } = useMode();
  const { userId, setUserId } = useAuth();
  const { me, isPending } = useGetMe(userId, setUserId);
  const { logout } = useLogut(setUserId);

  const { neutralLight, backAlt } = useColors();

  if (isPending) return <Spinner />;

  const fullName = `${me!.firstName} ${me!.lastName}`;

  return (
    <div style={{ position: "sticky", top: "0", left: "0", zIndex: "99" }}>
      <FlexBetween
        style={{
          padding: "1rem 6%",
          backgroundColor: backAlt,
          gap: "1.5rem",
        }}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <FlexBetween style={{ gap: "15px" }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "55px", cursor: "pointer" }}
            />
            <Typography
              fontWeight="bold"
              fontSize="clamp(1.5rem, 2rem, 2.5rem)"
              color="primary"
              noWrap={true}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Social Media
            </Typography>
          </FlexBetween>
        </Link>

        <FlexBetween gap="2rem">
          <IconButton onClick={() => changeMode()}>
            {mode === "light" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {me && (
            <Link to={`/profile/${me._id}`}>
              <IconButton>
                <UserImage image={me!.picturePath} size="40px" />
              </IconButton>
            </Link>
          )}

          <FormControl variant="standard">
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              {me?._id && (
                <MenuItem sx={{ gap: "0.75rem" }} onClick={() => logout()}>
                  <LogoutOutlinedIcon /> Logout
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </FlexBetween>
      </FlexBetween>
    </div>
  );
};

export default Navbar;
