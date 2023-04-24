type Chat = {
  model: string;
  message: ChatMessage[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: { [key: string]: number };
  user?: string;
};

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

export class ChatRecord {
  constructor(
    private _user: string,
    private _thread: string,
    private _chat: Chat,
    private _destroy: boolean,
    private _updatedAt: string,
    private _createdAt: string
  ) {}
}
