export type ReqCreateThread = {};

export type ResGetThread = {
  body?: {
    threadId: string;
    name: string;
  }[];
  error?: {
    message: string;
  };
};

export type ResPostThread = {
  body?: {
    threadId: string;
    name: string;
  };
  error?: {
    message: string;
  };
};
