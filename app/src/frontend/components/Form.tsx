import React, { useState } from 'react';

type FormProps = {
  onChangeResult: (str: string) => void;
};

export const Form = (props: FormProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openaiChats = async () => {
    const response = await fetch('/api/openai/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    if (!response.body) {
      throw new Error('Network response was not ok');
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      try {
        const dataString = decoder.decode(value);
        let text;

        // ここでdataStringが"{"text":"ダルビッシュ"}{"text":"影山"}"になっていた場合は、"ダルビッシュ影山"を保存する
        const counter = dataString.match(/text/g)?.length;
        if (counter && counter > 1) {
          const str = '[' + dataString.replace(/"}{"/g, '"},{"') + ']';
          const array = JSON.parse(str);
          text = array.map((obj: { text: string }) => obj.text).join('');
        } else {
          text = JSON.parse(dataString).text;
        }

        props.onChangeResult(text || '');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('A name was submitted: ', message);
    setIsLoading(true);

    try {
      await openaiChats();
    } catch (error) {
      console.error(error.name + ': ' + error.message);
      alert(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
        Enter message
      </label>
      <textarea
        id="message"
        rows={4}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Write your thoughts here..."
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="text-grey-darkest rounded bg-amber-300 py-2 px-4 font-bold hover:bg-amber-400"
        type="submit"
      >
        <span>Submit</span>
      </button>
      <div>{isLoading ? <div>Loading...</div> : <div>Content loaded</div>}</div>
    </form>
  );
};