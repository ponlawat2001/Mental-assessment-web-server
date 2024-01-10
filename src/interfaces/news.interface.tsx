export interface NewsModel {
  message: string;
  result: NewsResult[];
}

export interface NewsResult {
  id: string;
  title: string;
  intro: string;
  news_content: string;
  image_URL: string;
  create_at: AteAt;
  update_at: AteAt;
  is_delete: boolean;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}
