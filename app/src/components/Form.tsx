import React, { useState } from 'react';

type FormProps = {
  onChangeResult: (str: string) => void;
};

export const Form = (props: FormProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('A name was submitted: ', message);
    setIsLoading(true);

    try {
      const response = await fetch('/api/openai/chat', {
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
        const result = await reader.read();
        // console.log('result', result);
        if (result.done) {
          break;
        }
        const dataString = decoder.decode(result.value);
        let data;
        try {
          data = JSON.parse(dataString);
        } catch (error) {
          console.error(error);
        }
        console.log(data);
        props.onChangeResult(data?.text || '');
      }
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
