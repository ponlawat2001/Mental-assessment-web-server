export interface AdminusersModel {
  message: string;
  result: AdminResult[];
}

export interface AdminResult {
  id: string;
  email: string;
  create_at: AteAt;
  update_at: AteAt;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}
