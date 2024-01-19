export interface VentModel {
  message: string;
  result: VentResult[];
}

export interface VentResult {
  id: string;
  vent_content: string;
  owner: string;
  create_at: AteAt;
  update_at: AteAt;
  is_delete: boolean;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}
