export const spiralImages = {
  logo: "/spiral-of-hope/logo.png",
  hero: "/spiral-of-hope/hero-table.jpg",
  table: "/spiral-of-hope/table-detail.jpg",
  story: "/spiral-of-hope/story-craft.jpg",
  home: "/spiral-of-hope/home-decor.jpg",
  makers: "/spiral-of-hope/makers.jpg",
  bags: "/spiral-of-hope/bags.jpg",
};

export const spiralNavigation = [
  { href: "/our-story", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/become-a-reseller", label: "Reseller" },
  { href: "/contact", label: "Contact" },
];

export const spiralCollections = [
  {
    href: "/table-and-kitchen-decor",
    title: "Table & Kitchen",
    image: spiralImages.hero,
    body: "Vibrant locally made table softs and kitchen décor with African flair.",
  },
  {
    href: "/home-decor",
    title: "Home Décor",
    image: spiralImages.home,
    body: "Cushions, runners, throws, and patterns made to warm living spaces.",
  },
  {
    href: "/bags-and-accessories",
    title: "Bags & Accessories",
    image: spiralImages.bags,
    body: "Travel and daily bags built from canvas, cotton, leather, and printed character.",
  },
  {
    href: "/new-designs",
    title: "New Designs",
    image: spiralImages.table,
    body: "Fresh source-design energy kept visible as the textile spiral turns.",
  },
];

export type SpiralPage = {
  title: string;
  eyebrow: string;
  lead: string;
  image: string;
  sections: { title: string; body: string; tags?: string[] }[];
};

export const spiralPages: Record<string, SpiralPage> = {
  "our-story": {
    title: "Hope printed, cut, stitched, and shared.",
    eyebrow: "Our Story",
    lead: "The source story traces a Covid-era pivot into bags, tableware softs, and home décor designed, printed, and made in South Africa.",
    image: spiralImages.makers,
    sections: [
      {
        title: "A creative pivot",
        body: "When plush-toy plans met a tourism slowdown, printing fabric and making bags opened a new direction for the business.",
      },
      {
        title: "Local opportunity",
        body: "The source story says Spiral of Hope employs people from surrounding Pretoria areas and uses creativity and craft to build opportunity.",
      },
      {
        title: "What we make",
        body: "The range now spans kitchen décor, table softs, home décor, bags, and accessories.",
        tags: ["Designed locally", "Printed in South Africa", "Made in South Africa"],
      },
    ],
  },
  collections: {
    title: "Collections that carry pattern into living.",
    eyebrow: "Collections",
    lead: "Table, kitchen, home, bags, accessories, and new designs form the source collection map.",
    image: spiralImages.hero,
    sections: [
      {
        title: "Table and kitchen décor",
        body: "Dining pieces foreground vibrant patterns and function in the same scene.",
      },
      {
        title: "Home décor",
        body: "Cushions, runners, throws, colour, and locally printed marks make interiors feel personal.",
      },
    ],
  },
  "table-and-kitchen-decor": {
    title: "Set the table with a handmade rhythm.",
    eyebrow: "Collection",
    lead: "Table and kitchen décor celebrates patterned pieces built for dining scenes and gifts.",
    image: spiralImages.table,
    sections: [{ title: "Source signal", body: "The source collection page focuses on vibrant African flair, craft, and everyday function." }],
  },
  "home-decor": {
    title: "Soft pattern for rooms that need warmth.",
    eyebrow: "Collection",
    lead: "Home décor keeps cushions, runners, throws, and local pattern in the centre of the room.",
    image: spiralImages.home,
    sections: [{ title: "Source signal", body: "The source copy highlights locally designed and printed pieces that bring personality to home spaces." }],
  },
  "bags-and-accessories": {
    title: "Carry the print beyond the table.",
    eyebrow: "Collection",
    lead: "Bags and accessories extend the brand into travel, daily use, and a mix of recycled canvas, cotton, and leather.",
    image: spiralImages.bags,
    sections: [{ title: "Source signal", body: "The collection centres South African making, wildlife and floral design energy, and useful bag forms." }],
  },
  "new-designs": {
    title: "New designs orbit the same hopeful craft.",
    eyebrow: "Collection",
    lead: "This rebuild preserves the source new-designs route as a visual swatch wall for current collection energy.",
    image: spiralImages.hero,
    sections: [{ title: "Browse collections", body: "Use the collection routes or contact Spiral of Hope for current range availability." }],
  },
  "become-a-reseller": {
    title: "Bring Spiral of Hope to a new shelf.",
    eyebrow: "Reseller",
    lead: "The source site includes a reseller path. This static route directs interest to the business rather than inventing trade terms.",
    image: spiralImages.makers,
    sections: [{ title: "Reseller interest", body: "Contact the team with your store, region, and collection interest to confirm current reseller requirements." }],
  },
  contact: {
    title: "Reach the makers.",
    eyebrow: "Contact",
    lead: "Email, Pretoria phone routes, collections, and reseller interest all converge here.",
    image: spiralImages.story,
    sections: [{ title: "Contact", body: "Email info@spiralofhope.co.za or call +27 12 803 0643. The source footer also lists mobile contact numbers." }],
  },
  faq: {
    title: "FAQ route, kept honest.",
    eyebrow: "FAQ",
    lead: "The source FAQ route remains represented without fabricating shipping, stock, or product-policy answers.",
    image: spiralImages.table,
    sections: [{ title: "Current answers", body: "Use Spiral of Hope contact routes for current product, reseller, policy, and availability answers." }],
  },
  policies: {
    title: "Policies",
    eyebrow: "Policies",
    lead: "The source policy route remains visible in this static rebuild.",
    image: spiralImages.home,
    sections: [{ title: "Static rebuild note", body: "Use the original business site for current policy language that governs purchases or account activity." }],
  },
  "login-register": {
    title: "Login and register",
    eyebrow: "Account route",
    lead: "This public rebuild keeps the source account route informational and does not create customer accounts.",
    image: spiralImages.bags,
    sections: [{ title: "Account access", body: "Use the original Spiral of Hope site for live login, registration, and order-account actions." }],
  },
};
