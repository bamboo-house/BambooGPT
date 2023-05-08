export type ReqCreateThread = {};

export type ResPostThread = {
  body?: {
    threadId: string;
    name: string;
  };
  error?: {
    message: string;
  };
};
