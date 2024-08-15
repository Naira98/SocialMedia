import { User } from "../../../types/User";
import { Post } from "../../../types/Post";

export interface ReduxState {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[] | [];
}
