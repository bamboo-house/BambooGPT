type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

export type ChatContent = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number | undefined;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: { [key: string]: number } | null;
  user?: string | undefined;
};

export class ChatRecord {
  constructor(
    private _user: string,
    private _thread: string,
    private _chatContent: ChatContent,
    private _destroy: boolean,
    private _updatedAt: string,
    private _createdAt: string
  ) {}
}
