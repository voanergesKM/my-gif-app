import { useParams } from "react-router";
import GifDetails from "~/components/GifDetails";
import { useGifDetails } from "~/hooks/useGifs";

export function Details() {
  const { id } = useParams();

  const { data: gif, isLoading } = useGifDetails(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (!gif) {
    return <div>Gif not found :(</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center mt-6 min-h-0">
      <GifDetails gifData={gif} />
    </div>
  );
}

const Loader = () => {
  return (
    <div className="mx-auto max-w-[534px]">
      <div className="animate-pulse border p-4 rounded-lg w-full">
        <div className="h-64 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-4 h-8 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-2 h-8 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-2 h-8 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-4 h-8 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
