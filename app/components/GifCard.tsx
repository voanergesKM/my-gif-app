import { Link } from "react-router";
import { Download } from "lucide-react";
import type { GifObject } from "~/lib/definitions";
import { handleDownload } from "~/lib/utils";

export default function GifCard({ gif }: { gif: GifObject }) {
  const downloadUrl = gif.images.original.url;
  const fileName = `${gif.title || "gif"}-${gif.id}.gif`;

  return (
    <div className="relative overflow-hidden shadow hover:shadow-lg transition border border-gray-200 p-4 rounded-lg group">
      <Link to={`details/${gif.id}`}>
        <img
          src={gif.images.downsized_medium.url}
          alt={gif.title}
          width={gif.images.downsized_medium.width}
          height={gif.images.downsized_medium.height}
          className="w-full object-cover rounded-md"
          loading="lazy"
        />
        <p className="mt-4 text-lg font-bold truncate">
          {gif.title || "Untitled"}
        </p>
      </Link>

      <DownloadButton downloadUrl={downloadUrl} fileName={fileName} />
    </div>
  );
}

const DownloadButton = ({
  downloadUrl,
  fileName,
}: {
  downloadUrl: string;
  fileName: string;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleDownload(downloadUrl, fileName);
      }}
      className="
          absolute top-4 right-4 cursor-pointer
          bg-gray-500 text-white p-2 rounded-full shadow hover:bg-gray-600
          transition-all duration-300 ease-out 
          transform
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          sm:translate-y-[-10px] sm:group-hover:translate-y-0
        "
    >
      <Download className="w-6 h-6" />
    </button>
  );
};
