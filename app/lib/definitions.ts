export type GifObject = {
  id: string;
  url: string;
  title: string;
  images: {
    downsized_medium: { url: string };
    original: { url: string; webp: string };
  };
  username: string;
  import_datetime: string;
  user: User | null;
  rating: string;
  trending_datetime: string;
};

type User = {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
};
