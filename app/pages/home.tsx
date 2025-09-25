import GifsList from "~/components/GifsList";
import SearchBar from "~/components/SearchBar";

export function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My GIFs</h1>

      <div className="mb-6 max-w-md">
        <SearchBar />
      </div>

      <GifsList />
    </div>
  );
}
