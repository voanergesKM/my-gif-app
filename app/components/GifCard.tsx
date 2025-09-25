import { Link } from "react-router";
import type { GifObject } from "~/lib/definitions";

export default function GifCard({ gif }: { gif: GifObject }) {
  return (
    <div className="overflow-hidden shadow hover:shadow-lg transition border-1 border-gray-200 p-4 rounded-lg">
      <Link to={`details/${gif.id}`}>
        <img
          src={gif.images.downsized_medium.url}
          alt={gif.title}
          className="w-full object-cover"
        />
        <p className="mt-4 text-lg font-bold truncate">
          {gif.title || "Untitled"}
        </p>
      </Link>
    </div>
  );
}
