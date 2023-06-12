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
      <div className="mx-3 mb-24">
        <div className="relative mx-auto my-2 flex w-full max-w-3xl flex-row rounded-xl py-3 pl-3 dark:bg-gpt-gray2">
          <textarea
            id="promptTextAreaId"
            rows={1}
            tabIndex={0}
            placeholder="Send a message."
            onKeyDown={(e) => {
              handleTextareaKeydown(e);
            }}
            onInput={resizeTextarea}
            className="m-0 max-h-52 w-full resize-none bg-transparent pr-12 focus:outline-none"
          ></textarea>
          <button
            type="button"
            style={{ backgroundColor: 'rgb(25, 195, 125)' }}
            className="absolute bottom-2 right-4 rounded-md p-1"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="m-1 h-4 w-4"
              stroke-width="2"
            >
              <path
                d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
