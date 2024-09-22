import { getTokens } from "../util/helpers";
import apiReq from "./apiReq";

export async function addPost(
  post: string,
  image: File | null,
) {
  try {
    const formData = new FormData();
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
    }

    const res: Response = await apiReq(
      "POST",
      "/posts",
      undefined,
      formData,
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
  isProfile: boolean,
  userId: string | undefined,
) {
  try {
    const tokens = getTokens()
    if (!tokens.refreshToken || !tokens.accessToken) return null;

    let res: Response;
    if (!isProfile) {
      res = await apiReq(
        "GET",
        `/posts`,
        {
          "Content-Type": "application/json",
        },
        undefined,
      );
    } else {
      res = await apiReq(
        "GET",
        `/posts/${userId}`,
        {
          "Content-Type": "application/json",
        },
        undefined,
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

export async function patchLike(
  postId: string,
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/posts/${postId}`,
      {
        "Content-Type": "application/json",
      },
      undefined,
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
) {
  try {
    const res: Response = await apiReq(
      "POST",
      `/posts/${postId}`,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ comment }),
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

export async function deletePost(
  postId: string,
) {
  try {
    const res: Response = await apiReq(
      "DELETE",
      `/posts/${postId}`,
      {
        "Content-Type": "application/json",
      },
      undefined,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
