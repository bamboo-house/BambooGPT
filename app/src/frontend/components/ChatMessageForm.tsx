import { KeyboardEvent } from 'react';

export const ChatMessageForm = () => {
  const handleTextareaKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      console.log('key down cmd + Enter');
    }
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      console.log('Enter keydown');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className="top-message-form border border-gpt-gray border-t-zinc-500 bg-gpt-gray">
      <form className="mx-3 mb-16" onSubmit={handleSubmit}>
        <div className="mx-auto my-2 flex w-full max-w-3xl flex-row">
          <textarea
            id="prompt-textarea"
            rows={1}
            placeholder="Send a message."
            onKeyDown={(e) => {
              handleTextareaKeydown(e);
            }}
            className="m-0 h-40 max-h-52 w-full resize-none rounded-xl p-0 py-3 pl-3 pr-10 dark:bg-gpt-gray2"
          ></textarea>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
