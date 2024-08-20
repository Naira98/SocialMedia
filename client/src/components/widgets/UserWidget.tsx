import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
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
import { useState } from "react";
import { useUpdateAccount } from "../../hooks/users/useUpdateProfile";
import { useAddTwitter } from "../../hooks/users/useAddTwitter";
import { useAddLinkedin } from "../../hooks/users/useAddLinkedin";

const UserWidget = ({ user }: { user: User | null }) => {
  const currentUser = useSelector((state: ReduxState) => state.user)!;

  const [isUpdate, setIsUpdate] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);

  const [isTwitter, setIsTwitter] = useState(false);
  const [twitterLink, setTwitterLink] = useState(currentUser.twitter);

  const [isLinkedin, setIsLinkedin] = useState(false);
  const [linkedinLink, setLinkedinLink] = useState(currentUser.linkedin);

  const { updateAccount } = useUpdateAccount(setIsUpdate);
  const { addTwitter } = useAddTwitter(setIsTwitter);
  const { addLinkedin } = useAddLinkedin(setIsLinkedin);

  const { palette } = useTheme() as { palette: palette };
  const primatyMain = palette.primary.main;

  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  if (!currentUser || !user) {
    return null;
  }

  return (
    <WidgetWrapper
      palette={palette}
      style={{ position: "sticky", top: "6rem", left: "0", zIndex: "99" }}
    >
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
          <IconButton onClick={() => setIsUpdate((u) => !u)}>
            <ManageAccountsOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>
      {isUpdate && (
        <FlexBetween gap="0.5rem" pb="1.1rem" flexDirection="column">
          <FlexBetween gap="0.75rem">
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "70%" }}
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "70%" }}
            />
          </FlexBetween>

          <Button
            disabled={!firstName && !lastName}
            style={{ width: "60%", marginTop: "0.5rem" }}
            onClick={() =>
              updateAccount({ userId: user._id, firstName, lastName })
            }
            sx={{
              color: palette.background.alt,
              backgroundColor: primatyMain,
              borderRadius: "3rem",
            }}
          >
            Update
          </Button>
        </FlexBetween>
      )}

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
              <Typography color={medium} fontSize="11px">
                {user.twitter ? (
                  <a
                    href={`http://twitter.com/${user.twitter}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {user.twitter}
                  </a>
                ) : (
                  "Social Network"
                )}
              </Typography>
            </Box>
          </FlexBetween>
          {currentUser._id === user._id && (
            <IconButton onClick={() => setIsTwitter((t) => !t)}>
              <ModeEditOutlinedIcon sx={{ color: main }} />
            </IconButton>
          )}
        </FlexBetween>
        {isTwitter && (
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <Input
              placeholder="@"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
              style={{ width: "70%" }}
            />

            <Button
              disabled={!twitterLink}
              style={{ width: "40%", marginTop: "0.5rem" }}
              onClick={() =>
                addTwitter({ userId: user._id, link: twitterLink })
              }
              sx={{
                color: palette.background.alt,
                backgroundColor: primatyMain,
                borderRadius: "3rem",
              }}
            >
              Add
            </Button>
          </FlexBetween>
        )}

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../../../src/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium} fontSize="10px">
              {user.linkedin ? (
                  <a
                    href={`http://linkedin.com/in/${user.twitter}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {user.linkedin}
                  </a>
                ) : (
                  "Network Platform"
                )}
                
              </Typography>
            </Box>
          </FlexBetween>
          {currentUser._id === user._id && (
            <IconButton onClick={() => setIsLinkedin((l) => !l)}>
              <ModeEditOutlinedIcon sx={{ color: main }} />
            </IconButton>
          )}
        </FlexBetween>
        {isLinkedin && (
          <FlexBetween gap="0.5rem" mt='0.5rem'>
            <Input
              placeholder="/in/"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              style={{ width: "70%" }}
            />

            <Button
              disabled={!linkedinLink}
              style={{ width: "40%", marginTop: "0.5rem" }}
              onClick={() =>
                addLinkedin({ userId: user._id, link: linkedinLink })
              }
              sx={{
                color: palette.background.alt,
                backgroundColor: primatyMain,
                borderRadius: "3rem",
              }}
            >
              Add
            </Button>
          </FlexBetween>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
