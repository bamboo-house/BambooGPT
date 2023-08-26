import { Role } from '@prisma/client';
import { capitalize } from 'lodash';
import { CreateChatCompletionRequest } from 'openai';
import { ChatGateway } from '../infrastructure/chatGateway';
import prisma from '../utils/prisma';
import { OpenaiFeature } from '@/backend/application/features/openaiFeature';

export class OpenaiChatsService {
  // private _chatsGateway: ChatGateway;
  private _openaiFeature: OpenaiFeature;
  constructor() {
    // this._chatsGateway = new ChatGateway();
    this._openaiFeature = new OpenaiFeature();
  }

  async run(
    threadId: string,
    chatContent: CreateChatCompletionRequest,
    resWrite: (text: string) => void,
    resEnd: () => void
  ) {
    try {
      /* openAIのapiにアクセスして、レスポンスを得る */
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

      /* チャット履歴を保存する */
      chatContent.messages.push({ role: 'assistant', content: result });
      const newMessages: { role: Role; content: string | undefined }[] = chatContent.messages.map(
        (message) => {
          return {
            role: (message.role.substring(0, 1).toUpperCase() + message.role.substring(1)) as Role,
            content: message.content,
          };
        }
      );
      await prisma.chat.create({
        data: {
          threadId: Number(threadId),
          model: model,
          temperature: temperature,
          topP: top_p,
          n: n,
          stream: stream,
          stop: stop?.toString(),
          maxTokens: max_tokens,
          presencePenalty: presence_penalty,
          frequencyPenalty: frequency_penalty,
          logitBias: logit_bias?.toString(),
          user: user,
          messages: {
            create: newMessages,
          },
        },
      });
    } catch (error) {
      console.error(error);
      // 2023/07/14 streamでエラーが発生した場合、Promiseと競合してエラーが出る。解消難しいので、一旦放置
    }
  }
}
