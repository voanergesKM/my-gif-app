import { Link } from "react-router";
import { Download } from "lucide-react";
import type { GifObject } from "~/lib/definitions";
import { onGifDownload } from "~/lib/utils";

export default function GifCard({ gif }: { gif: GifObject }) {
  const downloadUrl = gif.images.original.url;
  const fileName = `${gif.title || "gif"}-${gif.id}.gif`;

  return (
    <div className="relative overflow-hidden hover:shadow-xl hover:scale-105 transition bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg p-4 rounded-lg group">
      <Link to={`details/${gif.id}`}>
        <img
          src={gif.images.fixed_width.webp}
          alt={gif.title}
          width={gif.images.fixed_width.width}
          height={gif.images.fixed_width.height}
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
      aria-label="Download GIF"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onGifDownload(downloadUrl, fileName);
      }}
      className="
          absolute top-4 right-4 cursor-pointer
          bg-white text-gray-900 hover:text-white p-2 rounded-full shadow hover:bg-gray-600
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
