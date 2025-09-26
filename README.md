# 🎥 Giphy Explorer (React + Vite)

A simple frontend application for searching and browsing GIFs from [Giphy API](https://developers.giphy.com/), featuring infinite scroll and a download option for GIFs.

## 🚀 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query/latest) — data fetching & caching
- [TailwindCSS](https://tailwindcss.com/) — styling
- [Lucide](https://lucide.dev/) — icons
- [React Router](https://reactrouter.com/) — navigation

## 📦 Installation

```bash
# clone the repo
git clone https://github.com/voanergesKM/my-gif-app.git
cd <your-repo>

# install dependencies
npm install
```

## 🔑 API Setup

⚠️ To keep the Giphy API key secure, requests are proxied through a simple backend (e.g., Express deployed on Render
or Vercel).

Create a small Node/Express proxy server (see giphy-proxy or example code in docs).

Add your GIPHY_API_KEY as an environment variable in Render (or any hosting).

Deploy and grab your backend URL, e.g.:

https://your-giphy-proxy.onrender.com

Frontend environment variables

Create a .env file in the root of your frontend project:

VITE_API_BASE_URL=https://your-giphy-proxy.onrender.com

## 🖥️ Development

Run the dev server:

npm run dev

Open http://localhost:5173
in your browser.

## 🏗️ Build

npm run build
npm run preview

## ✨ Features

🔍 Search GIFs via Giphy API

📈 Trending GIFs

⏬ Infinite scroll with Intersection Observer

📥 Download GIF button (with hover/always visible on mobile)

🎨 Responsive masonry layout with react-masonry-css

⚡ Optimized data fetching with TanStack Query

Made with ❤️ using React + Vite.
