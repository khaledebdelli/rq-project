import axios from "axios";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";

const fetchHeroe = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export const DynamicQueryPage = ({ heroIds }) => {
  const [{ data: data1 }, { data: data2 }] = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: async () => fetchHeroe(id)
      };
    })
  );
  console.log("🚀 ~ file: DynamicQuery.page.js ~ line 18 ~ DynamicQueryPage ~ data1", data1);
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div key={data1?.data.id}>
        <Link to={`/rq-super-heroes/${data1?.data.id}`}>{data1?.data.name}</Link>
      </div>
      <div key={data2?.data.id}>
        <Link to={`/rq-super-heroes/${data2?.data.id}`}>{data2?.data.name}</Link>
      </div>
    </>
  );
};
