export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface CDPDoc {
  platform: string;
  content: string;
  url: string;
}

export interface SearchResult {
  platform: string;
  content: string;
  score: number;
  url: string;
}