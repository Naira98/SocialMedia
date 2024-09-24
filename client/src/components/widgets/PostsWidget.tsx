import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import PostWidget from "./PostWidget";
import Spinner from "../Spinner";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { useGetFeed } from "../../hooks/posts/useGetFeed";
import { IPost } from "../../types/Post";
import useColors from "../../hooks/util/useColors";

const PostsWidget = ({ isProfile }: { isProfile: boolean }) => {
  const { palette, neutralMed } = useColors();
  const { userId } = useParams();
  const { feed, isPending, error } = useGetFeed(isProfile, userId);

  if (isPending) return <Spinner />;
  if (error) toast.error(error.message);

  if (!feed || !feed.length)
    return (
      <WidgetWrapper
        palette={palette}
        style={{ textAlign: "center", padding: "3rem" }}
      >
        <Typography color={neutralMed} fontSize="1.5rem">
          No posts to show
        </Typography>
      </WidgetWrapper>
    );

  return feed.map((post: IPost, i: number) => (
    <PostWidget
      key={`${post._id.toString()}-${i}`}
      post={post}
      isProfile={isProfile}
      i={i}
    />
  ));
};

export default PostsWidget;
