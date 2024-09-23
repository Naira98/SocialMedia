import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
import SmallButton from "../SmallButton";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { useUpdateAccount } from "../../hooks/users/useUpdateProfile";
import { useAddTwitter } from "../../hooks/users/useAddTwitter";
import { useAddLinkedin } from "../../hooks/users/useAddLinkedin";
import { useFetchFriends } from "../../hooks/users/useFetchFriends";
import useColors from "../../hooks/util/useColors";
import { useAuth } from "../../contexts/useAuth";
import { IUser } from "../../types/User";

const UserWidget = ({
  userData,
  isMobileScreen,
}: { 
  userData: IUser;
  isMobileScreen: boolean;
}) => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { friends } = useFetchFriends(userData._id);

  const [isUpdate, setIsUpdate] = useState(false);
  const [firstName, setFirstName] = useState(userData!.firstName);
  const [lastName, setLastName] = useState(userData!.lastName);

  const [isTwitter, setIsTwitter] = useState(false);
  const [twitterLink, setTwitterLink] = useState(userData!.twitter);

  const [isLinkedin, setIsLinkedin] = useState(false);
  const [linkedinLink, setLinkedinLink] = useState(userData!.linkedin);

  const { updateAccount } = useUpdateAccount(setIsUpdate);
  const { addTwitter } = useAddTwitter(setIsTwitter);
  const { addLinkedin } = useAddLinkedin(setIsLinkedin);

  const {palette,neutralDark, neutralMed, neutralMain} = useColors()

  return (
    <WidgetWrapper
      palette={palette}
      style={
        isMobileScreen
          ? { display: "block" }
          : { position: "sticky", top: "6rem", left: "0", zIndex: "99" }
      }
    >
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={userData.picturePath} />
          <Box>
            <Typography
              variant="h5"
              color={neutralDark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userData._id}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography color={neutralMed}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        {userData._id === userId && (
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
            {isMobileScreen && (
              <SmallButton
                disabled={!firstName && !lastName}
                onClick={() =>
                  updateAccount({ userId: userId!, firstName, lastName })
                }
              >
                Update
              </SmallButton>
            )}
          </FlexBetween>

          {!isMobileScreen && (
            <SmallButton
              disabled={!firstName && !lastName}
              onClick={() =>
                updateAccount({ userId: userId!, firstName, lastName })
              }
            >
              Update
            </SmallButton>
          )}
        </FlexBetween>
      )}

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlinedIcon
            fontSize="large"
            sx={{ color: neutralMain, fontSize: "25px" }}
          />
          <Typography color={neutralMed}>{userData.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlinedIcon
            fontSize="large"
            sx={{ color: neutralMain, fontSize: "25px" }}
          />
          <Typography color={neutralMed}>{userData.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={neutralMed}>Who's viewed your profile</Typography>
          <Typography color={neutralMain} fontWeight="500">
            {userData?.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={neutralMed}>Impressions of your post</Typography>
          <Typography color={neutralMain} fontWeight="500">
            {userData.impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* FORTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={neutralMain} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../../../src/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={neutralMain} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={neutralMed} fontSize="11px">
                {userData.twitter ? (
                  <a
                    href={`http://twitter.com/${userData.twitter}`}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {userData.twitter}
                  </a>
                ) : (
                  "Social Network"
                )}
              </Typography>
            </Box>
          </FlexBetween>
          {userData._id === userId && (
            <IconButton onClick={() => setIsTwitter((t) => !t)}>
              <ModeEditOutlinedIcon sx={{ color: neutralMain }} />
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
            <SmallButton
              disabled={!twitterLink}
              onClick={() => addTwitter({ userId: userId!, link: twitterLink })}
            >
              Add
            </SmallButton>
          </FlexBetween>
        )}

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../../../src/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={neutralMain} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={neutralMed} fontSize="10px">
                {userData.linkedin ? (
                  <a
                    href={`http://linkedin.com/in/${userData.linkedin}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {userData.linkedin}
                  </a>
                ) : (
                  "Network Platform"
                )}
              </Typography>
            </Box>
          </FlexBetween>
          {userData._id === userId && (
            <IconButton onClick={() => setIsLinkedin((l) => !l)}>
              <ModeEditOutlinedIcon sx={{ color: neutralMain }} />
            </IconButton>
          )}
        </FlexBetween>
        {isLinkedin && (
          <FlexBetween gap="0.5rem" mt="0.5rem">
            <Input
              placeholder="/in/"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              style={{ width: "70%" }}
            />
            <SmallButton
              disabled={!linkedinLink}
              onClick={() =>
                addLinkedin({ userId: userId!, link: linkedinLink })
              }
            >
              Add
            </SmallButton>
          </FlexBetween>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
