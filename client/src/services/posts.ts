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

    }

    const res: Response = await apiReq(
      "POST",
      "/posts",
      tokens,
      undefined,
      formData
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getFeed(
  tokens: Token | null,
  userId: string | null,
  isProfile: boolean
) {
  try {
    if (!tokens?.refreshToken) return null;

    let res: Response;
    if (!isProfile) {
      res = await apiReq(
        "GET",
        `/posts`,
        tokens,
        {
          "Content-Type": "application/json",
        },
        undefined
      );
    } else {
      res = await apiReq(
        "GET",
        `/posts/${userId}`,
        tokens,
        {
          "Content-Type": "application/json",
        },
        undefined
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

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

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addComment(
  comment: string,
  postId: string,
  tokens: Token
) {
  try {
    const res: Response = await apiReq(
      "POST",
      `/posts/${postId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ comment })
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // updatedPost with userId populated
    return data;
  } catch (err) {
    console.log(err);
    console.log(err);
    throw err;
  }
}

export async function deletePost(postId: string, tokens: Token | null) {
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
