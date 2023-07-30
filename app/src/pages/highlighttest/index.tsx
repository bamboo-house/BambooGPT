import hljs from 'highlight.js';
import React, { useState, useEffect } from 'react';
import 'highlight.js/styles/github.css';

export default function Home() {
  const [text, setText] = useState('function ()');
  const [badgeCode, setBadgeCode] = useState('function ()');

  useEffect(() => {
    hljs.highlightAll();
    // hljs.highlightAuto(code);
  });

  useEffect(() => {
    /**
    シンタックスハイライトしたいコード input フォームへの入力内容に応じて動的に変わる
    */
    setBadgeCode(
      `    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: ""
      };
    }
    ${text}`
    );
  }, [text]);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div>
      <main>
        <h1>Highlight sample</h1>

        <input type="text" value={text} onChange={handleChange} />

        <div>
          <pre style={{ width: '80vw' }}>
            <code className="js">{badgeCode}</code>
          </pre>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
