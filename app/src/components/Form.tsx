import React, { useState } from 'react';

type FormProps = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

export const Form = (props: FormProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('A name was submitted: ', prompt);
    try {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      console.log('============', data);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      props.setResult(data.result);
      setPrompt('');
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-gray-900">
        Enter prompt
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Write your thoughts here..."
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <button
        className="text-grey-darkest rounded bg-amber-300 py-2 px-4 font-bold hover:bg-amber-400"
        type="submit"
      >
        <span>Submit</span>
      </button>
    </form>
  );
};
