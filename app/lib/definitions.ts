export type GifObject = {
  id: string;
  url: string;
  title: string;
  images: {
    original: { url: string; webp: string; width: string; height: string };
    fixed_width: { url: string; width: string; height: string; webp: string };
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
