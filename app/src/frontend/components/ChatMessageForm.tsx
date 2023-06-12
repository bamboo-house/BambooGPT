import { KeyboardEvent } from 'react';

export const ChatMessageForm = () => {
  const handleTextareaKeydown = (e: any) => {
    const target = e.target;
    // もし、cmd + Enter なら、送信する
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      console.log('key down cmd + Enter');
    }

    // もし、Enterなら、heightを伸ばす
    if (e.key === 'Enter' || e.code === 'Enter') {
      console.log('Enter keydown');
    }

    // もし、backspaceで、改行を消すなら、heightを短くする
    if (e.key === 'Backspace' && target.value.substr(-1) === '\n') {
      console.log('key down backspace');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className="top-message-form border border-gpt-gray border-t-zinc-500 bg-gpt-gray">
      <div className="mx-3 mb-16">
        <div className="mx-auto my-2 flex w-full max-w-3xl flex-row">
          <textarea
            id="prompt-textarea"
            rows={1}
            placeholder="Send a message."
            onKeyDown={(e) => {
              handleTextareaKeydown(e);
            }}
            className="m-0 max-h-52 w-full resize-none rounded-xl p-0 py-3 pl-3 pr-10 dark:bg-gpt-gray2"
          ></textarea>
        </div>
        <button
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          送信
        </button>
      </div>
    </div>
  );
};
