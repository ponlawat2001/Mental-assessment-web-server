export interface UserModel {
  message: string;
  result: UserResult[];
}

export interface UserResult {
  id: string;
  avatar: string;
  phone?: string;
  displayname?: string;
  email: string;
  password?: string;
  create_at: string;
  update_at: string;
  lastsignin_at: string;
}
