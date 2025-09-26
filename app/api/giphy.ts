import type { GifObject } from "~/lib/definitions";

const PROD = import.meta.env.VITE_PRODUCTION;
const BASE_URL = PROD
  ? `https://giphy-api-z6u6.onrender.com/api`
  : "http://localhost:3000/api";

const PAGE_LIMIT = 30;

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
  const res = await fetch(`${BASE_URL}/gif/${id}`);

  if (!res.ok) throw new Error("Failed to fetch GIF");

  const json = await res.json();

  return json.data as GifObject;
};
