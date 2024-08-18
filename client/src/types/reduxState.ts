import { User } from "../../../types/User";
import { Post } from "../../../types/Post";

export interface ReduxState {
  mode: string;
  user: User | null;
  friendsData: Friend[] | null;
  tokens: Token | null;
  posts: Post[] | [];
  isAuth: boolean;
}

export interface Token {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  picturePath: string;
}

export interface UserWithFriendData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  token?: string | undefined;
  friends: Friend[];
  location?: string;
  occupation?: string;
  viewedProfile: number;
  impressions: number;
}
