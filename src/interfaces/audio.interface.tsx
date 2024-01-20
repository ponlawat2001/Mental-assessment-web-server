export interface AudioModel {
  message: string;
  result: AudioResult[];
}

export interface AudioResult {
  id: string;
  owner: string;
  audioUrl: string;
  create_at: AteAt;
  update_at: AteAt;
  is_delete: boolean;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}
