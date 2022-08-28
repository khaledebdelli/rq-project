import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: 'post', data: hero});
};
export const useSuperHereosData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
    onSuccess,
    onError
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data]
        };
      });
    }
  });
};
