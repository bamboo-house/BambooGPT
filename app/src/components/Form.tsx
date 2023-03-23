import React, { useState } from 'react';

type FormProps = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

export const Form = (props: FormProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('A name was submitted: ' + prompt);
    try {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      console.log(data);
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
      <input
        type="text"
        name="prompt"
        placeholder="Enter an animal"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <input type="submit" value="Generate names" />
    </form>
  );
};
