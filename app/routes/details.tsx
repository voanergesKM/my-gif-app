import type { LoaderFunctionArgs, MetaArgs } from "react-router";
import { Details } from "~/pages/details";
import { fetchGif } from "~/api/giphy";
import { QueryClient } from "@tanstack/react-query";
import type { GifObject } from "~/lib/definitions";

type LoaderData = {
  title: string;
};

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id } = params;
  if (!id) throw new Response("Not Found", { status: 404 });

  const queryClient = new QueryClient();
  const gif = (await fetchGif(id)) as GifObject;

  await queryClient.prefetchQuery({
    queryKey: ["gif", id],
    queryFn: () => gif,
  });

  return { title: gif.title };
}

export function meta({ data }: MetaArgs<typeof loader>) {
  return [
    { title: data?.title || "Gif not found" },
    { name: "description", content: "Gif Details" },
  ];
}

export default function DetailsPage() {
  return <Details />;
}
