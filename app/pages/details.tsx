import type { JSX } from "react";
import { Link, useParams } from "react-router";
import { useGifDetails } from "~/hooks/useGifs";
import type { GifObject } from "~/lib/definitions";
import { formatDate, handleDownload } from "~/lib/utils";

const getDescriptions = (gif: GifObject) => {
  return [
    {
      label: "Uploaded By",
      value: gif.user ? (
        <span className="flex items-center">
          <img
            src={gif.user.avatar_url}
            className="w-8 h-8 rounded-full mr-2"
          />
          {gif.user.display_name}
        </span>
      ) : (
        "Unknown"
      ),
    },
    { label: "Uploaded on", value: formatDate(gif.import_datetime) },
    { label: "Rating", value: gif.rating.toUpperCase() },
    { label: "Rating updated", value: formatDate(gif.trending_datetime) },
  ];
};

export function GifDetails() {
  const { id } = useParams();

  const { data: gif, isLoading } = useGifDetails(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (!gif) {
    return <div>Gif not found :(</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="border p-4 rounded-lg">
        <img
          src={gif.images.original.webp}
          alt={gif.title}
          className="rounded-md w-full"
        />

        <div className="px-4 py-6">
          <h1 className=" text-2xl font-bold">{gif.title || "Untitled"}</h1>

          <div className="flex flex-col space-y-2 mt-4">
            {getDescriptions(gif).map((desc) => {
              return <DescriptionRow key={desc.label} {...desc} />;
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link
              to={gif.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-500 hover:underline"
            >
              View on Giphy
            </Link>

            <button
              onClick={() => {
                const downloadUrl = gif.images.original.url;
                const fileName = `${gif.title || "gif"}-${gif.id}.gif`;
                handleDownload(downloadUrl, fileName);
              }}
              className="cursor-pointer mt-4 inline-block text-blue-500 hover:underline"
            >
              Download GIF
            </button>
          </div>
        </div>
      </div>
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

interface DescriptionRowProps {
  label: string;
  value: string | JSX.Element;
}

const DescriptionRow: React.FC<DescriptionRowProps> = ({ label, value }) => {
  return (
    <p className="text-gray-600 flex items-center gap-2">
      <span className="font-bold">{label}:</span>
      {value}
    </p>
  );
};
