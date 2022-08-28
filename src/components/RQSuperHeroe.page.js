import { useParams } from "react-router-dom";
import { useSuperHereoData } from "../hooks/useSuperHereoData";

export const RQSuperHeroePage = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useSuperHereoData(id);

  if (isLoading) {
    return <h2>...loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (<div className="box_content"><h2>{data?.data.name} - {data?.data.alterEgo}</h2></div>);
};
