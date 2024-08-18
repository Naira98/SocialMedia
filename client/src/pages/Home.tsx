import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import UserWidget from "../components/widgets/UserWidget";
import AddPostWidget from "../components/widgets/AddPostWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import AdvertiseWidget from "../components/widgets/AdvertiseWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import { ReduxState } from "../types/reduxState";

const Home = () => {
  const user = useSelector((state: ReduxState) => state.user);

  return (
    <Box
      width="100%"
      gap="1.5rem"
      padding="2rem 6%"
      display="flex"
      justifyContent="space-between"
    >
      {user && (
        <>
          <Box flexBasis="26%">
            <UserWidget user={user} key={user._id.toString()} />
          </Box>
          <Box flexBasis="64%">
            <AddPostWidget picturePath={user.picturePath} />
            <PostsWidget
              userId={user._id.toString()}
              key={user._id.toString()}
              isProfile={false}
            />
          </Box>
          <Box flexBasis="26%">
            <AdvertiseWidget />
            <FriendListWidget userId={user._id} key={user._id.toString()} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
