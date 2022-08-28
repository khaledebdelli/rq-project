import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=10&_page=${pageNumber}`);
};
export const RQPaginatedPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error } = useQuery(["colors", pageNumber], () =>
    fetchColors(pageNumber),
    {
      keepPreviousData: true
    }
  );

  if (isLoading) {
    return <h2>...loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div style={{ padding: "20px 20px", width: "50%", margin: "0 auto" }}>
      <h2>React Query Pagination Page</h2>
      {data?.data.map((color) => {
        return (
          <div style={{ backgroundColor: color.hex, color: 'white' }} key={color.id}>
            {color.id}
          </div>
        );
      })}
      <button onClick={() => setPageNumber((page) => page - 1)} disabled={parseInt(pageNumber) === 1}>
        Prev Page
      </button>
      <button onClick={() => setPageNumber((page) => page + 1)} disabled={parseInt(pageNumber) === 14}>
        Next Page
      </button>
    </div>
  );
};
