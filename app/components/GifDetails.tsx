import type { JSX } from "react";
import { Link } from "react-router";
import type { GifObject } from "~/lib/definitions";
import { formatDate, onGifDownload } from "~/lib/utils";

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

function GifDetails({ gifData }: { gifData: GifObject }) {
  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-lg shadow-lg ">
      <img
        src={gifData.images.original.webp}
        alt={gifData.title}
        className="rounded-md w-full"
        width={gifData.images.original.width}
        height={gifData.images.original.height}
      />

      <div className="px-4 py-6">
        <h1 className=" text-2xl font-bold">{gifData.title || "Untitled"}</h1>

        <div className="flex flex-col space-y-2 mt-4">
          {getDescriptions(gifData).map((desc) => {
            return <DescriptionRow key={desc.label} {...desc} />;
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to={gifData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline"
          >
            View on Giphy
          </Link>

          <button
            onClick={() => {
              const downloadUrl = gifData.images.original.url;
              const fileName = `${gifData.title || "gif"}-${gifData.id}.gif`;
              onGifDownload(downloadUrl, fileName);
            }}
            className="cursor-pointer mt-4 inline-block text-blue-500 hover:underline"
          >
            Download GIF
          </button>
        </div>
      </div>
    </div>
  );
}

export default GifDetails;

type DescriptionRowProps = {
  label: string;
  value: string | JSX.Element;
};

const DescriptionRow: React.FC<DescriptionRowProps> = ({ label, value }) => {
  return (
    <p className="text-gray-400 flex items-center gap-2 text-lg ">
      <span className="font-bold">{label}:</span>
      {value}
    </p>
  );
};
