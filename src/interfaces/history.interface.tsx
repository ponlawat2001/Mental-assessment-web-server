export interface HistoryModel {
  message: string;
  result: HistoryResult[];
}

export interface HistoryResult {
  id: string;
  owner: string;
  type: string;
  summary: Summary[];
  create_at: CreateAt;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface Summary {
  scorerate: Scorerate[];
  advise: string;
  name: string;
  totalscore: number;
  useranswer: Useranswer[];
}

export interface Scorerate {
  rate: string;
  name: string;
}

export interface Useranswer {
  score: number;
  questionId: number;
  question: string;
  answer: string;
}
