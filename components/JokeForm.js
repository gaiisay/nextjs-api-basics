import styled from "styled-components";

function JokeForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const formattedData = { ...data, categories: data.categories.split(", ") };
    onSubmit(data);

    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your Joke:</label>
      <input id="text-input" type="text" name="text"></input>
      <label htmlFor="author-input">Author:</label>
      <input id="author-input" type="text" name="author"></input>
      <label htmlFor="categories-input">Categories:</label>
      <small>(Multiple categories must be seperated like this “category1, category2“)</small>
      <input id="categories-input" type="text" name="categories"></input>
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
