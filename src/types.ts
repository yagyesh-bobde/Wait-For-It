export interface Question {
  id: number;
  text: string;
  options: [string, string];
}

export interface Response {
  response_id: string;
  question_id: number;
  selected_option: string;
  user_name?: string;
  user_location?: string;
  timestamp: string;
}

export interface Statistics {
  [key: string]: number;
}
