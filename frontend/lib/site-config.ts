export const siteConfig = {
  name: "Serendib Adventures",
  logo: "/assets/logo.png",
  tagline: "Explore deeply. Travel light.",
  description:
    "Small-group river, rainforest, and mountain day tours in Kitulgala and across Sri Lanka led by certified expert local guides.",
  social: {
    facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/SerendibAdventures/",
      handle: "SerendibAdventures",
    },
    instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/serendib_adventures/",
      handle: "@serendib_adventures",
    },
    youtube: {
      name: "YouTube",
      url: "https://www.youtube.com/@serendibadventures4636",
      handle: "@serendibadventures4636",
    },
  },
  contact: {
    address: "Kitulgala River Base, Sabaragamuwa, Sri Lanka",
    phone: "+94 77 006 6723",
    whatsapp: "+94 77 006 6723",
    email: "info@serendibadventures.com",
    hours: "Open Daily: 07:00 – 19:00",
  },
  hashtags: ["#SerendibAdventures", "#KitulgalaAdventures", "#VisitSriLanka", "#AdventureSriLanka"],
} as const;

export type SiteConfig = typeof siteConfig;
