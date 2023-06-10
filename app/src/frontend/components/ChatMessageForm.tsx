export const ChatMessageForm = () => {
  return (
    <div className="top-message-form h-40 border border-gpt-gray border-t-zinc-500 bg-gpt-gray">
      <form className="mx-3 mt-3">
        <div className="mx-auto flex w-full max-w-3xl flex-row">
          <textarea
            rows={1}
            placeholder="Send a message."
            className="m-0 w-full resize-none rounded-xl p-0 pl-3 pr-10 pt-2 dark:bg-gpt-gray2"
          ></textarea>
          <button>送信</button>
        </div>
      </form>
    </div>
  );
};
