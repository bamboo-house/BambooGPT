export type ReqCreateThread = {};

export type ResGetThreads = {
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

export type ResGetThread = {
  body?: {
    threadId: string;
    name: string;
  };
  error?: {
    message: string;
  };
};
