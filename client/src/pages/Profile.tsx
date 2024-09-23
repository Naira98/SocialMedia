import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import toast from "react-hot-toast";
import UserWidget from "../components/widgets/UserWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import AdvertiseWidget from "../components/widgets/AdvertiseWidget";
import Spinner from "../components/Spinner";
import { useProfileUser } from "../hooks/users/useProfileUser";
import { useAuth } from "../contexts/useAuth";
import AddPostWidget from "../components/widgets/AddPostWidget";

const Profile = () => {
  const { userId } = useParams() as { userId: string };
  const { profileUser, isPending, error } = useProfileUser(userId);
  const { userId: currentUserId } = useAuth();
  const isYou = userId === currentUserId;

  const isMobileScreen = useMediaQuery("(max-width: 1200px)");

  if (isPending)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
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
      {profileUser && userId && (
        <>
          <Box flexBasis="26%">
            <UserWidget
              userData={profileUser}
              key={profileUser._id}
              isMobileScreen={isMobileScreen}
            />
          </Box>
          <Box flexBasis="64%">
            {isYou && <AddPostWidget picturePath={profileUser!.picturePath} />}
            <PostsWidget key={profileUser._id.toString()} isProfile={true} />
          </Box>
          {!isMobileScreen && (
            <Box flexBasis="26%">
              <AdvertiseWidget />
              <FriendListWidget
                user={profileUser}
                key={profileUser._id.toString()}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
