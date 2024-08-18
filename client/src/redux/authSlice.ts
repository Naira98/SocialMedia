import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../types/Post";
import { ReduxState } from "../types/reduxState";

const initialState: ReduxState = {
  mode: "light",
  user: null,
  friendsData: null,
  tokens: null,
  posts: [],
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      localStorage.setItem("mode", state.mode === "light" ? "dark" : "light");
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // payload = {user: {}, tokens: {}}
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuth = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User doesn't exists");
      }
    },
    setFriendsData: (state, action) => {
      state.friendsData = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    likePost: (state, action) => {
      const updatedPosts = state.posts.map((post: Post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      const updatedPosts = state.posts.filter(
        (post: Post) => post._id !== action.payload.postId
      );
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setFriendsData,
  setPosts,
  likePost,
  deletePost,
} = authSlice.actions;

export default authSlice.reducer;
