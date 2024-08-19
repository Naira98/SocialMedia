import { Dispatch } from "@reduxjs/toolkit";
import { likeCommentPost, setPosts, deletePost } from "../../redux/authSlice";
import { Token } from "../../types/reduxState";
import apiReq from "../../services/apiReq";

export async function getAddPost(
  post: string,
  image: File | null,
  dispatch: Dispatch,
  tokens: Token,
  location: string,
  setImage: (image: File | null) => void,
  setPost: (post: string) => void
) {
  try {
    const formData = new FormData();
    formData.append("location", location);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name.replaceAll(" ", "-"));
    }

    const res: Response = await apiReq(
      "POST",
      "/posts",
      tokens,
      undefined,
      formData
    );

    if (!res.ok) throw new Error("Can't post!");
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
    setImage(null);
    setPost("");
  } catch (err) {
    console.log(err);
  }
}

export async function getFeed(dispatch: Dispatch, tokens: Token | null) {
  try {
    const res: Response = await apiReq(
      "GET",
      "/posts",
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't get feed!");
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  } catch (err) {
    console.log(err);
  }
}

export async function getUserPosts(
  profileId: string,
  tokens: Token | null,
  dispatch: Dispatch
) {
  try {
    const res: Response = await apiReq(
      "GET",
      `/posts/${profileId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't get feed!");
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  } catch (err) {
    console.log(err);
  }
}

export async function getPatchLike(
  postId: string,
  tokens: Token | null,
  dispatch: Dispatch
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/posts/${postId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't get feed!");
    const data = await res.json();
    dispatch(likeCommentPost({ post: data }));
  } catch (err) {
    console.log(err);
  }
}

export async function deletePostApi(
  postId: string,
  tokens: Token | null,
  dispatch: Dispatch
) {
  try {
    const res: Response = await apiReq(
      "DELETE",
      `/posts/${postId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't delete post!");
    const data = await res.json();
    dispatch(deletePost(data));
  } catch (err) {
    console.log(err);
  }
}
