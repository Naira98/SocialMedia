import { JwtPayload } from "jwt-decode";

export interface jwtPayloadWithUser extends JwtPayload {
  userId: string;
}
