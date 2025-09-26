import GifsList from "~/components/GifsList";
import SearchBar from "~/components/SearchBar";

export function HomePage() {
  return (
    <div>
      <div className="w-full flex flex-col items-center mb-4 sticky top-0 z-10 bg-gray-950 pt-4 pb-2">
        <h1 className="text-2xl font-bold mb-4">My GIFs</h1>

        <div className="mb-6 max-w-md sticky">
          <SearchBar />
        </div>
      </div>

      <GifsList />
    </div>
  );
}
