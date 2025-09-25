import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchGif, fetchTrendingGifs } from "~/api/giphy";

export const useGifs = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["trending", query],
    queryFn: ({ pageParam = 0 }) => {
      return fetchTrendingGifs(pageParam, query);
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination.offset + pagination.count >= pagination.total_count) {
        return undefined;
      }
      return pagination.nextOffset;
    },
    initialPageParam: 0,
    staleTime: 1000 * 3600,
  });
};

export const useGifDetails = (id: string) => {
  return useQuery({
    queryKey: ["gif", id],
    queryFn: () => fetchGif(id),
    enabled: !!id,
    staleTime: 1000 * 3600,
  });
};
