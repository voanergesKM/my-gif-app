import type { GifObject } from "~/lib/definitions";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = `https://api.giphy.com/v1/gifs`;

type Pagination = {
  total_count: number;
  count: number;
  offset: number;
  nextOffset: number;
};

export const fetchTrendingGifs = async (
  offset: number,
  searchTerm?: string
) => {
  const endpoint = searchTerm ? "search" : "trending";
  const url = new URL(`${BASE_URL}/${endpoint}`);

  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("limit", "20");
  url.searchParams.append("offset", offset.toString());

  if (searchTerm) {
    url.searchParams.append("q", searchTerm);
  }

  const res = await fetch(url.toString());

  if (!res.ok) throw new Error("Failed to fetch GIFs");

  const json = await res.json();

  return {
    gifs: json.data as GifObject[],
    pagination: {
      total_count: json.pagination.total_count,
      count: json.pagination.count,
      offset: json.pagination.offset,
      nextOffset: json.pagination.offset + json.pagination.count,
    } as Pagination,
  };
};

export const fetchGif = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch GIF");

  const json = await res.json();

  return json.data as GifObject;
};
