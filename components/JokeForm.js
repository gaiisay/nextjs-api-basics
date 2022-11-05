import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

function JokeForm({ joke, onSubmit }) {
  const [text, setText] = useState(joke?.text);
  const [author, setAuthor] = useState(joke?.author);
  const [categories, setCategories] = useState(joke?.categories.join(", "));

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const formattedData = { ...data, categories: data.categories.split(", ") };

    onSubmit(formattedData);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your Joke:</label>
      <input id="text-input" type="text" name="text" value={text} onChange={(event) => setText(event.target.value)} />
      <label htmlFor="author-input">Author:</label>
      <input
        id="author-input"
        type="text"
        name="author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <label htmlFor="categories-input">Categories:</label>

      <input
        id="categories-input"
        type="text"
        name="categories"
        value={categories}
        onChange={(event) => setCategories(event.target.value)}
      />
      <small>(e.g.: “category1, category2“)</small>
      <br />
      <button type="submit">Submit</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  input {
    width: 100%;
  }

  button {
    width: 50%;
    align-self: center;
  }
`;

export default JokeForm;
