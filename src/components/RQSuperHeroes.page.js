import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddSuperHeroData, useSuperHereosData } from "../hooks/useSuperHereosData";

const onSuccess = () => {
  console.log("after fetch data success effect");
};

const onError = () => {
  console.log("after error effect");
};

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState();
  const [alterEgo, setAlterEgo] = useState();

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHereosData(
    onSuccess,
    onError
  );
  const {
    mutate: addHero,
    isLoading: isAddHeroLoading,
    isError: isAddHeroError,
    error: addHeroError
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    addHero({ name, alterEgo });
  };

  if (isLoading || isFetching || isAddHeroLoading) {
    return <h2>...loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isAddHeroError) {
    return <h2>{addHeroError.message}</h2>;
  }

  return (
    <div className="box">
      <h2>React Query Super Heroes Page</h2>
      <fieldset>
        <legend>Choose your favorite monster</legend>

        <input type="text" id="name" placeholder="name" onChange={(e) => setName(e.target.value)} />
        <br />

        <input
          type="text"
          id="alterEgo"
          placeholder="alterEgo"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <br />
        <button onClick={handleAddHeroClick} disabled={!name || !alterEgo}>
          Add Hero
        </button>
      </fieldset>
      <div className="box_content">
        <button onClick={refetch}>Refetch Data</button>
        {data?.data.map((heroe) => {
          return (
            <div key={heroe.id}>
              <Link to={`/rq-super-heroes/${heroe.id}`}>{heroe.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
