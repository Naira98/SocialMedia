import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import UserWidget from "../components/widgets/UserWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import AdvertiseWidget from "../components/widgets/AdvertiseWidget";
import { useProfileUser } from "../hooks/users/useProfileUser";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { userId } = useParams() as { userId: string };

  const { profile, isPending, error } = useProfileUser(userId);

  // useEffect(() => {
  //   if (userId) {
  //     getProfileUser(userId, tokens, setUser);
  //   }
  // }, [tokens, userId]);

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <Box
      width="100%"
      gap="1.5rem"
      padding="2rem 6%"
      display="flex"
      justifyContent="space-between"
    >
      {profile && userId && (
        <>
          <Box flexBasis="26%">
            <UserWidget user={profile} key={profile._id.toString()} />
          </Box>
          <Box flexBasis="64%">
            <PostsWidget
              userId={userId}
              key={profile._id.toString()}
              isProfile={true}
            />
          </Box>
          <Box flexBasis="26%">
            <AdvertiseWidget />
            <FriendListWidget userId={userId} key={profile._id.toString()} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
