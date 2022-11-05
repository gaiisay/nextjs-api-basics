import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import JokeForm from "../../../../components/JokeForm";
import { fetcher } from "../../../../helpers/api";

function EditJokes() {
  const router = useRouter();
  const { id } = router.query;

  const { data: joke, mutate } = useSWR(`/api/jokes/${id}`, fetcher);

  if (!joke) return <h1>Loading...</h1>;

  async function handleSubmit(joke) {
    await fetch(`/api/jokes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(joke),
    });

    mutate();
  }

  async function deleteJoke() {
    await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  }

  return (
    <main>
      <Link href="/">Go back ↩ </Link>
      <h1>{joke.text}</h1>
      <hr />
      <p>written by: {joke.author}</p>
      <p>categories: {joke.categories.join(", ")}</p>

      <button onClick={deleteJoke}>DELETE</button>
      <br />
      <h2>Here you can edit this joke:</h2>
      <JokeForm joke={joke} onSubmit={handleSubmit} />
    </main>
  );
}

export default EditJokes;
