import { CreateChatCompletionRequest } from 'openai';
import { ChatGateway } from '../infrastructure/chatGateway';
import { OpenaiFeature } from '@/backend/application/features/openaiFeature';

export class OpenaiChatsService {
  private _chatsGateway: ChatGateway;
  private _openaiFeature: OpenaiFeature;
  constructor() {
    this._chatsGateway = new ChatGateway();
    this._openaiFeature = new OpenaiFeature();
  }

  async run(
    uid: string,
    threadId: string,
    chatContent: CreateChatCompletionRequest,
    resWrite: (text: string) => void,
    resEnd: () => void
  ) {
    try {
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

      console.log('chatContent', chatContent);

      // Todo：引数にコールバック関数を渡さずに、pipeで結果を取得するなどして責務で分離すべき
      const result = await this._openaiFeature.createChatCompletion({
        model: model,
        messages: messages,
        temperature: temperature,
        top_p: top_p,
        n: n,
        stream: true,
        stop: stop,
        max_tokens: max_tokens,
        presence_penalty: presence_penalty,
        frequency_penalty: frequency_penalty,
        logit_bias: logit_bias,
        user: user,
        resWrite: resWrite,
        resEnd: resEnd,
      });
      chatContent.messages.push({ role: 'assistant', content: result });
      await this._chatsGateway.create(uid, threadId, chatContent);
    } catch (error) {
      console.error(error);
      // 2023/07/14 streamでエラーが発生した場合、Promiseと競合してエラーが出る。解消難しいので、一旦放置
    }
  }
}
