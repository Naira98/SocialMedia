import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Search,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import FlexBetween from "./styledComponents/FlexBetween";
import { setMode } from "../redux/authSlice";
import UserImage from "./UserImage";
import { useLogout } from "../hooks/auth/useLogout";
import { ReduxState } from "../types/reduxState";
import { ThemeWithPalette } from "../types/ThemeWithPalette";

const Nvabar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modeStorage = localStorage.getItem("mode");
  const user = useSelector((state: ReduxState) => state.user);
  const tokens = useSelector((state: ReduxState) => state.tokens);
  const mode = useSelector((state: ReduxState) => state.mode) && modeStorage;
  const isMobileScreen = useMediaQuery("(max-width: 1126px)");
  const {logout} = useLogout()

  const theme = useTheme() as ThemeWithPalette;
  const neutralLight = theme.palette.neutral.light;
  const neutralMediumMain = theme.palette.neutral.mediumMain;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div style={{ position: "sticky", top: "0", left: "0", zIndex: "99" }}>
      <FlexBetween
        style={{
          padding: "1rem 6%",
          backgroundColor: alt,
        }}
      >
        <FlexBetween gap="4rem">
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
          {!isMobileScreen && (
            <FlexBetween
              style={{
                padding: "0.1rem 1.5rem",
                backgroundColor: neutralLight,
                gap: "3rem",
                borderRadius: "9px",
              }}
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        <FlexBetween gap="2rem">
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
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "light" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {user && (
            <Link to={`/profile/${user._id}`}>
              <IconButton>
                <UserImage image={user?.picturePath} size="40px" />
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
              {tokens && (
                <MenuItem
                  sx={{ gap: "0.75rem" }}
                  onClick={() => logout()}
                >
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
