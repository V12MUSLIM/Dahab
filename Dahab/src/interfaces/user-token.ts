import { Role } from "../models/user-model";
export interface UserToken {
  id: string;
  email: string;
  role: Role; 
}
