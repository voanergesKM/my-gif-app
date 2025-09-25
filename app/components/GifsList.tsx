import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useGifs } from "~/hooks/useGifs";
import GifCard from "./GifCard";

function GifsList() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useGifs(searchTerm);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isFetching && !isFetchingNextPage) {
    return <GifListSkeleton />;
  }

  return (
    <>
      {data && (
        <ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4  gap-4 space-y-4">
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.gifs.map((gif) => (
                <li key={gif.id}>
                  <GifCard gif={gif} />
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}

      <div ref={loadMoreRef} className="h-1" />

      <div className="text-center my-4">
        {isFetchingNextPage ? (
          <GifListSkeleton />
        ) : hasNextPage ? (
          "Load More"
        ) : (
          "Nothing more to load"
        )}
      </div>
    </>
  );
}

export default GifsList;

function GifListSkeleton() {
  return (
    <ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4  gap-4 space-y-4">
      {Array.from({ length: 20 }).map((_, idx) => (
        <li
          key={idx}
          className="overflow-hidden shadow border border-gray-200 rounded-lg p-4 animate-pulse h-64"
        >
          <div className="w-full h-6/7 bg-gray-300 rounded-md" />
          <div className="mt-4 h-6 bg-gray-300 rounded w-3/4" />
        </li>
      ))}
    </ul>
  );
}
