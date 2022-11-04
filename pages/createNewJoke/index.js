import Link from "next/link";
import { useState } from "react";
import JokeForm from "../../components/JokeForm";

function CreateNewJoke() {
  const { error, setError } = useState(false);

  async function sendJoke(joke) {
    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(joke),
    });

    if (response.status !== 201) {
      setError(true);
    }
  }

  return (
    <>
      <Link href="/">Go back ↩ </Link>
      <h1>Here you can create new jokes</h1>
      {error && <h2>Oh shit an error</h2>}
      <JokeForm onSubmit={sendJoke} />
    </>
  );
}

export default CreateNewJoke;
