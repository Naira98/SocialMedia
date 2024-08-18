import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import UserImage from "../UserImage";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { palette } from "../../types/ThemeWithPalette";
import { ReduxState } from "../../types/reduxState";
import { User } from "../../../../types/User";

const UserWidget = ({ user }: { user: User | null }) => {
  const { palette } = useTheme() as { palette: palette };
  const currentUser = useSelector((state: ReduxState) => state.user);

  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  if (!currentUser || !user) {
    return null;
  }

  return (
    <WidgetWrapper palette={palette} style={{position: 'sticky', top:'6rem', left:'0', zIndex: '99'}}>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={user?.picturePath} />
          <Box>
            <Typography
              variant="h5"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${user?._id}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography color={medium}>
              {user?.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        {currentUser._id === user._id && (
          <IconButton>
            <ManageAccountsOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlinedIcon
            fontSize="large"
            sx={{ color: main, fontSize: "25px" }}
          />
          <Typography color={medium}>{user?.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlinedIcon
            fontSize="large"
            sx={{ color: main, fontSize: "25px" }}
          />
          <Typography color={medium}>{user?.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {user?.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {user?.impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* FORTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../../../src/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontSize="10px">
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          {currentUser._id === user._id && (
            <IconButton>
              <ModeEditOutlinedIcon sx={{ color: main }} />
            </IconButton>
          )}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../../../src/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium} fontSize="10px">
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          {currentUser._id === user._id && (
            <IconButton>
              <ModeEditOutlinedIcon sx={{ color: main }} />
            </IconButton>
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
