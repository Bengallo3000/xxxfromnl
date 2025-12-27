import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FromNL.pro - Premium Dutch Quality Products",
    short_name: "FromNL.pro",
    description: "Your trusted source for premium Dutch quality products. Direct from the Netherlands.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF6600",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
