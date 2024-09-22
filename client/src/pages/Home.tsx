import { Box, useMediaQuery } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserWidget from "../components/widgets/UserWidget";
import AddPostWidget from "../components/widgets/AddPostWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import AdvertiseWidget from "../components/widgets/AdvertiseWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/useAuth";
import { useGetMe } from "../hooks/auth/useGetMe";

const Home = () => {
  const { userId, setUserId } = useAuth();
  const { me, isPending, error } = useGetMe(userId, setUserId);
  const isMobileScreen = useMediaQuery("(max-width: 1200px)");
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);
  if (!me) return navigate("/");

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
      {userId && (
        <>
          <Box flexBasis="26%">
            <UserWidget
              userData={me}
              key={me._id}
              isMobileScreen={isMobileScreen}
            />
          </Box>
          <Box flexBasis="64%">
            <AddPostWidget picturePath={me.picturePath} />
            <PostsWidget key={me._id} isProfile={false} />
          </Box>
          {!isMobileScreen && (
            <Box flexBasis="26%">
              <AdvertiseWidget />
              <FriendListWidget user={me} key={me._id} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;
