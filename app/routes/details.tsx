import type { Route } from "./+types/home";
import { GifDetails } from "~/pages/details";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "My Gifs App" },
    { name: "description", content: "Welcome to My Gifs App!" },
  ];
}

export default function Details() {
  return <GifDetails />;
}
