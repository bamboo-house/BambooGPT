import { ChatGateway } from '../infrastructure/chatGateway';
import { OpenaiService } from '@/backend/application/features/openaiFeature';
import { ReqPostOpenaiChat } from '@/bff/types/openai/chats';

export class OpenaiChatsService {
  private _chatsGateway: ChatGateway;
  private _openaiService: OpenaiService;
  constructor() {
    this._chatsGateway = new ChatGateway();
    this._openaiService = new OpenaiService();
  }

  async run(reqBody: ReqPostOpenaiChat, resWrite: (text: string) => void, resEnd: () => void) {
    const { uid, threadId, chatContent } = reqBody;
    const {
      model,
      messages,
      temperature,
      top_p,
      n,
      stream,
      stop,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      logit_bias,
      user,
    } = chatContent;
    // Todo：引数にコールバック関数を渡さずに、pipeで結果を取得するなどして責務で分離すべき
    const result = await this._openaiService.createChatCompletion({
      model: model,
      messages: messages,
      stream: true,
      max_tokens: 16,
      resWrite: resWrite,
      resEnd: resEnd,
    });
    // このresultをfirestoreに保存する
    console.log('result: ', result);
    messages.push({ role: 'assistant', content: result });
    console.log('messagesだよ', messages);
  }
}
