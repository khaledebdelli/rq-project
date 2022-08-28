import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetchSuperHeroe = ({ queryKey }) => {
  const heroeId = queryKey[1];
  return request({ url: `/superheroes/${heroeId}` });
};
export const useSuperHereoData = (heroeId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroeId], fetchSuperHeroe, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((h) => h.id === parseInt(heroeId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    }
  });
};
