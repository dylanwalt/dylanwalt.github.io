export const elmImages = {
  logo: "/elm-interiors/logo.png",
  hero: "/elm-interiors/hero-kitchen.jpg",
  living: "/elm-interiors/gallery-living.jpg",
  space: "/elm-interiors/gallery-space.jpg",
  decor: "/elm-interiors/gallery-decor.jpg",
  kitchen: "/elm-interiors/gallery-kitchen.jpg",
  room: "/elm-interiors/gallery-room.jpg",
};

export const elmNavigation = [
  { href: "/about", label: "Studio" },
  { href: "/treatments", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

export const elmServices = [
  {
    title: "Interior Design",
    copy: "Built-in elements, cabinetry, finishes, fittings, space planning, layouts, elevations, and realistic renders align the room with daily life.",
    signal: "Architecture + flow",
  },
  {
    title: "Interior Decorating",
    copy: "Furniture, fabric, artwork, lighting, rugs, wallpaper, curtains, blinds, and décor turn a refined plan into a warm home.",
    signal: "Texture + story",
  },
  {
    title: "Virtual Staging",
    copy: "3D staging and rendering help homeowners, developers, and estate agents see layouts and finishes before decisions become physical.",
    signal: "Preview + precision",
  },
];

export const elmPortfolio = [
  {
    slug: "home-b",
    title: "House B",
    image: elmImages.hero,
    note: "Warm cabinetry, honest grain, and a kitchen made to hold real routines.",
  },
  {
    slug: "home-t",
    title: "House T",
    image: elmImages.living,
    note: "Natural light, stone-soft neutrals, and deliberate sight lines.",
  },
  {
    slug: "home-m",
    title: "House M",
    image: elmImages.space,
    note: "A quiet room sequence built from wood, texture, and proportion.",
  },
  {
    slug: "project-name-one",
    title: "Refined Living",
    image: elmImages.kitchen,
    note: "Bespoke planning that balances design clarity and comfort.",
  },
];

export type ElmPage = {
  title: string;
  eyebrow: string;
  lead: string;
  sections: { title: string; body: string; bullets?: string[] }[];
};

export const elmPages: Record<string, ElmPage> = {
  about: {
    title: "A studio that reads the room before it draws it.",
    eyebrow: "About Elm",
    lead: "Elm Interiors designs Pretoria spaces around the people who use them, blending nature-led materials, practical planning, and tailored detail.",
    sections: [
      {
        title: "Nature, warmth, timelessness",
        body: "The source studio story centres spaces that reflect each client instead of chasing trends. Wood, stone, earthy textures, and layered comfort keep the result grounded.",
      },
      {
        title: "Owner-led clarity",
        body: "Melanie Stuart brings experience across shopfitting, residential interiors, and commercial spaces, with a process aimed at translating vision into function.",
      },
      {
        title: "Technology with craft",
        body: "The studio pairs 3D modelling and virtual previews with artists, craftsmen, suppliers, custom furniture, artwork, and smart-home considerations.",
      },
    ],
  },
  treatments: {
    title: "Design services staged from plan to atmosphere.",
    eyebrow: "Services",
    lead: "The public service menu moves through interior design, decorating, and virtual staging so a project can be considered before it is bought, built, or refreshed.",
    sections: [
      {
        title: "Interior design",
        body: "Site visits within the studio radius, moodboards, layouts, cabinetry, kitchens, vanities, furniture, lighting, plumbing, elevations, and renders form the planning layer.",
        bullets: ["New builds", "Major renovations", "Furniture layouts", "3D renders"],
      },
      {
        title: "Interior decorating",
        body: "Sourcing pulls the room together through art, décor, accessories, lighting, rugs, bespoke cabinetry, wallpaper, curtains, and blinds.",
        bullets: ["Décor refreshes", "Colour and texture", "Itemised sourcing"],
      },
      {
        title: "Virtual staging",
        body: "Detailed renders help property teams and homeowners preview layouts, finishes, and furnishings with less guesswork.",
        bullets: ["Developers", "Estate agents", "Decision previews"],
      },
    ],
  },
  portfolio: {
    title: "Portfolio rooms with a lived-in pulse.",
    eyebrow: "Portfolio",
    lead: "Source project pages become an editorial room index: spaces with different density, light, and material rhythm but one clear Elm signature.",
    sections: [
      {
        title: "Project language",
        body: "The portfolio uses kitchens, open-plan living spaces, dining moments, and textural room crops to show refined living in context.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    eyebrow: "Legal",
    lead: "This rebuild keeps the source privacy route visible. Contact Elm Interiors directly for the current policy text that governs the live business site.",
    sections: [
      {
        title: "Static rebuild note",
        body: "The public rebuild does not submit a project form or collect visitor data beyond whatever the static host records.",
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms and conditions",
    eyebrow: "Legal",
    lead: "This route preserves the source terms location while keeping the rebuild informational and non-transactional.",
    sections: [
      {
        title: "Business terms",
        body: "Use the original Elm Interiors site or contact the studio for current project, quotation, and service terms.",
      },
    ],
  },
};
