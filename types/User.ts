export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  picturePath: string;
  token?: string | undefined;
  friends: string[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}
