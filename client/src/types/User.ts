export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  twitter: string;
  linkedin: string;
}

export type PostCreator = Pick<
  IUser,
  "_id" | "firstName" | "lastName" | "picturePath"
> & { friends: string[] };

export type Friend = Pick<
  IUser,
  "_id" | "firstName" | "lastName" | "picturePath" | "occupation"
>;
