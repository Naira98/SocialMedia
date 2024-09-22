import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLogut } from "../hooks/auth/useLogout";
import FlexBetween from "./styledComponents/FlexBetween";
import UserImage from "./UserImage";
import { ThemeWithPalette } from "../types/ThemeWithPalette";
import { useMode } from "../contexts/useMode";
import { useAuth } from "../contexts/useAuth";
import { useGetMe } from "../hooks/auth/useGetMe";
import Spinner from "./Spinner";

const Nvabar = () => {
  const navigate = useNavigate();
  const { mode, changeMode } = useMode();
  const { userId, setUserId } = useAuth();
  const { me, isPending } = useGetMe(userId, setUserId);
  console.log(me)
  const { logout } = useLogut(setUserId);

  const isMobileScreen = useMediaQuery("(max-width: 1200px)");

  const theme = useTheme() as ThemeWithPalette;
  const neutralLight = theme.palette.neutral.light;
  const neutralMediumMain = theme.palette.neutral.mediumMain;
  const alt = theme.palette.background.alt;

  if (isPending) return <Spinner />

  const fullName = `${me!.firstName} ${me!.lastName}`;

  return (
    <div style={{ position: "sticky", top: "0", left: "0", zIndex: "99" }}>
      <FlexBetween
        style={{
          padding: "1rem 6%",
          backgroundColor: alt,
          gap: "1.5rem",
        }}
      >
        <FlexBetween>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1.5rem, 2rem, 2.5rem)"
            color="primary"
            noWrap={true}
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Social Media
          </Typography>
        </FlexBetween>

        <FlexBetween gap="2rem">
          {!isMobileScreen && (
            <>
              <IconButton>
                <Message sx={{ fontSize: "25px", color: neutralMediumMain }} />
              </IconButton>
              <IconButton>
                <Notifications
                  sx={{ fontSize: "25px", color: neutralMediumMain }}
                />
              </IconButton>
              <IconButton>
                <Help sx={{ fontSize: "25px", color: neutralMediumMain }} />
              </IconButton>
            </>
          )}

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

export default Nvabar;
