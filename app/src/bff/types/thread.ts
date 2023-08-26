// POST
export type ReqCreateThread = {
  name: string;
};

export type ResPostThread = {
  body?: {
    id: number;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  error?: {
    message: string;
  };
};

// GET
export type ResGetThreads = {
  body?: {
    id: number;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  error?: {
    message: string;
  };
};

export type ResGetThread = {
  body?: {
    id: number;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
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
