export type ReqCreateThread = {
  uid: string;
};

export type ResCreateThread = {
  body?: {
    threadId: string;
  };
  error?: {
    message: string;
  };
};
