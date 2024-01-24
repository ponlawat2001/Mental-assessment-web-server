export interface AssessmentModel {
  message: string;
  result: AssessmentResult[];
}

export interface AssessmentResult {
  id: string;
  name: string;
  description: string;
  type: string;
  questionnaire: Questionnaire[];
  answer: Answer[];
  scorerate: Scorerate[];
  advise: Advise[];
  create_at: AteAt;
  update_at: AteAt;
  is_delete: boolean;
}

export interface Advise {
  rate: number;
  advise: string;
  name: string;
}

export interface Answer {
  score?: number;
  name?: string;
  id?: number;
  choices?: Choice[];
}

export interface Choice {
  score: number;
  name: string;
}

export interface AteAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface Questionnaire {
  id: number;
  title: string;
  reversescore?: boolean;
}

export interface Scorerate {
  rate: Choice[];
  name: string;
  questionnairenumber: number[];
}
