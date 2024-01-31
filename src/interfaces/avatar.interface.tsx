export interface AvatarModel {
  message: string;
  result: AvatarResult[];
}

export interface AvatarResult {
  id: string;
  email: string;
  avatar: string;
  create_at: AteAt;
  update_at: AteAt;
  favorite: boolean;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}
