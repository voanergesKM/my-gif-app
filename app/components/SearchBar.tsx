import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        setSearchParams({ q: inputValue });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchParams]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="search" className="text-sm font-medium text-gray-700">
        Search GIFs
      </label>
      <input
        id="search"
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
