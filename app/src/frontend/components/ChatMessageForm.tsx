export const ChatMessageForm = () => {
  const handleTextareaKeydown = (e: any) => {
    // もし、cmd + Enter なら、送信する
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      console.log('key down cmd + Enter');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
  };

  const resizeTextarea = () => {
    // textarea要素
    const textarea: any = document.getElementById('promptTextAreaId');
    if (!textarea) {
      return;
    }
    // textareaそ要素のlineheight
    let lineHeight: any = getComputedStyle(textarea).lineHeight;
    // "19.6px" のようなピクセル値が返ってくるので、数字だけにする
    lineHeight = lineHeight.replace(/[^-\d\.]/g, '');

    // textarea要素に入力された値の行数
    const lines = (textarea.value + '\n').match(/\n/g)?.length;
    if (!lines) {
      return;
    }
    // 高さを再計算
    textarea.style.height = lineHeight * lines + 'px';
  };

  return (
    <div className="top-message-form border border-gpt-gray border-t-zinc-500 bg-gpt-gray">
      <div className="mx-3 mb-16">
        <div className="mx-auto my-2 flex w-full max-w-3xl flex-row rounded-xl p-0 py-3 pl-3 pr-10 dark:bg-gpt-gray2">
          <textarea
            id="promptTextAreaId"
            rows={1}
            tabIndex={0}
            placeholder="Send a message."
            onKeyDown={(e) => {
              handleTextareaKeydown(e);
            }}
            onInput={resizeTextarea}
            className="m-0 max-h-52 w-full resize-none bg-transparent focus:outline-none"
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
