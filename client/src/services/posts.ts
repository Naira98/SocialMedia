import { Token } from "../types/reduxState";
import apiReq from "./apiReq";

export async function addPost(
  post: string,
  image: File | null,
  tokens: Token,
  location: string
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
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getFeed(tokens: Token | null, userId: string) {
  try {
    if (!tokens?.refreshToken) return null;
    
    const res: Response = await apiReq(
      "GET",
      `/posts/${userId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't get feed!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function patchLike(postId: string, tokens: Token | null) {
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
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deletePostApi(postId: string, tokens: Token | null) {
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
    return data;
  } catch (err) {
    console.log(err);
  }
}
