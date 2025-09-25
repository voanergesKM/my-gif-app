import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Gifs App" },
    { name: "description", content: "Welcome to My Gifs App!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
