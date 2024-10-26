import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Input, Typography } from "@mui/material";
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
import twitterImage from "../../assets/twitter.png";
import linkedinImage from "../../assets/linkedin.png";

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

  const { palette, neutralDark, neutralMed, neutralMain } = useColors();

  return (
    <WidgetWrapper
      palette={palette}
      style={
        isMobileScreen
          ? { display: "block" }
          : {
              position: "sticky",
              width: "279px",
              top: "7.5rem",
              justifySelf: "end",
            }
      }
    >
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <Link to={`/profile/${userData._id}`}>
            <UserImage image={userData.picturePath} />
          </Link>
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
            <Typography color={neutralMed}>
              {friends?.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        {userData._id === userId && (
          <IconButton onClick={() => setIsUpdate((u) => !u)}>
            <ManageAccountsOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>
      {isUpdate && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAccount({ userId: userId!, firstName, lastName });
          }}
        >
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
                <SmallButton disabled={!firstName && !lastName}>
                  Update
                </SmallButton>
              )}
            </FlexBetween>

            {!isMobileScreen && (
              <SmallButton disabled={!firstName && !lastName}>
                Update
              </SmallButton>
            )}
          </FlexBetween>
        </form>
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
        <Typography
          fontSize="1rem"
          color={neutralMain}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={twitterImage} alt="twitter" />
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
                      color: neutralMed,
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTwitter({ userId: userId!, link: twitterLink });
            }}
          >
            <FlexBetween gap="0.5rem" pb="1.1rem">
              <Input
                placeholder="@"
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
                style={{ width: "70%" }}
              />
              <SmallButton disabled={!twitterLink}>Add</SmallButton>
            </FlexBetween>
          </form>
        )}

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={linkedinImage} alt="linkedin" />
            <Box>
              <Typography color={neutralMain} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={neutralMed} fontSize="11px">
                {userData.linkedin ? (
                  <a
                    href={`http://linkedin.com/in/${userData.linkedin}`}
                    target="_blank"
                    style={{ color: neutralMed }}
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
            <IconButton
              onClick={() => {
                setIsLinkedin((l) => !l);
              }}
            >
              <ModeEditOutlinedIcon sx={{ color: neutralMain }} />
            </IconButton>
          )}
        </FlexBetween>
        {isLinkedin && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addLinkedin({ userId: userId!, link: linkedinLink });
            }}
          >
            <FlexBetween gap="0.5rem" mt="0.5rem">
              <Input
                placeholder="/in/"
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                style={{ width: "70%" }}
              />
              <SmallButton disabled={!linkedinLink}>Add</SmallButton>
            </FlexBetween>
          </form>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
