import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
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
import FlexBetween from "./FlexBetween";

import { setLogout, setMode } from "../redux/authSlice";
import { ReduxState } from "../types/reduxState";
import { ThemeWithPalette } from "../types/ThemeWithPalette";

const Nvabar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);
  const mode = useSelector((state: ReduxState) => state.mode);

  const theme = useTheme() as ThemeWithPalette;
  const neutralLight = theme.palette.neutral.light;
  const neutralMediumMain = theme.palette.neutral.mediumMain;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
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
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Social Media
          </Typography>
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
        </FlexBetween>

        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "light" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px", color: neutralMediumMain }} />
          <Notifications sx={{ fontSize: "25px", color: neutralMediumMain }} />
          <Help sx={{ fontSize: "25px", color: neutralMediumMain }} />

          <FormControl variant="standard" value={fullName}>
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
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Nvabar;
