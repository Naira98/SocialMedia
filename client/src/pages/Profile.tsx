import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import toast from "react-hot-toast";

import UserWidget from "../components/widgets/UserWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import AdvertiseWidget from "../components/widgets/AdvertiseWidget";
import Spinner from "../components/Spinner";
import { useProfileUser } from "../hooks/users/useProfileUser";
import { ReduxState } from "../types/reduxState";
import { User } from "../../../types/User";

const Profile = () => {
  const { userId } = useParams() as { userId: string };

  const currentUser = useSelector((state: ReduxState) => state.user)!;

  const { data, isPending, error } = useProfileUser(userId);

  let profile: User;
  if (userId === currentUser._id) {
    profile = data.user;
  } else {
    profile = data;
  }
  const isMobileScreen = useMediaQuery("(max-width: 1200px)");

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <Box
      width="100%"
      gap="1.5rem"
      padding="2rem 6%"
      display="flex"
      justifyContent="space-between"
      sx={
        isMobileScreen ? { flexDirection: "column" } : { flexDirection: "row" }
      }
    >
      {profile && userId && (
        <>
          <Box flexBasis="26%">
            <UserWidget
              user={profile}
              key={profile._id}
              isMobileScreen={isMobileScreen}
            />
          </Box>
          <Box flexBasis="64%">
            <PostsWidget
              userId={profile._id.toString()}
              key={profile._id.toString()}
              isProfile={true}
            />
          </Box>
          {!isMobileScreen && (
            <Box flexBasis="26%">
              <AdvertiseWidget />
              <FriendListWidget userId={userId} key={profile._id.toString()} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
