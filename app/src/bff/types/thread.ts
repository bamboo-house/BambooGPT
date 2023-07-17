// POST
export type ReqCreateThread = {
  name: string;
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

// GET
export type ResGetThreads = {
  body?: {
    threadId: string;
    name: string;
  }[];
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

export type ResGetThreadListWithLatestChat = {
  body?: {
    threadId: string;
    name: string;
    chatId: string;
  }[];
  error?: {
    message: string;
  };
};
