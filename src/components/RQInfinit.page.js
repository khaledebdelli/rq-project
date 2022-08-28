import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/colors?_limit=10&_page=${pageParam}`);
};
export const RQInfinitPage = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 14) return pages.length + 1;
      else return undefined;
    }
  });

  if (isLoading) {
    return <h2>...loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div style={{ padding: "20px 20px", width: "50%", margin: "0 auto" }}>
      <h2>React Query Pagination Page</h2>
      {data?.pages.map((group, i) => {
        return (
          <div key={i}>
            {group.data.map((color) => {
              return <div style={{ backgroundColor: color.hex, color: "white" }} key={color.id}>
                {color.id}
              </div>
            })}
          </div>
        );
      })}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      <div>{isFetching && !isFetchingNextPage ? "fetching..." : null}</div>
    </div>
  );
};
