export const ChatLog = () => {
  const mockData = [
    { role: 'system', content: 'You are a helpful assistant' },
    { role: 'user', content: 'こんにちは' },
    { role: 'assistant', content: 'こんにちは' },
    { role: 'user', content: 'jsでif文はどうかく？' },
    {
      role: 'assistant',
      content:
        'JavaScriptでの`if`文は、以下のような構文になります。```jsif (条件式) {  // 条件式が真の場合に実行される文} else {  // 条件式が偽の場合に実行される文}````else`節は必須ではなく、必要に応じて省略することができます。また、`else if`節を使って複数の条件分岐を行うこともできます。```jsif (条件式1) {  // 条件式1が真の場合に実行される文} else if (条件式2) {  // 条件式2が真の場合に実行される文} else {  // いずれの条件式も偽の場合に実行される文}```また、条件式には比較演算子や論理演算子を使って複雑な条件式を指定することができます。',
    },
  ];
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
        この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
      <div className="flex flex-col">
        {mockData.map((data, i) => {
          return (
            <div className="h-auto" key={i}>
              {data.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
