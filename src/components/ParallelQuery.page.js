import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};
export const RQParallelPage = () => {
  const { data: heroes } = useQuery('heroes', fetchHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      {heroes?.data.map((heroe) => {
        return (
          <div key={heroe.id}>
            <Link to={`/rq-super-heroes/${heroe.id}`}>{heroe.name}</Link>
          </div>
        );
      })}

      {friends?.data.map((friend) => {
        return (
          <div key={friend.id}>
            {friend.name}
          </div>
        );
      })}
    </>
  );
};
