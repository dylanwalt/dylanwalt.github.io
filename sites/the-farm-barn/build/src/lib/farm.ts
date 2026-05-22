export const farmImages = {
  logo: "/the-farm-barn/logo.png",
  map: "/the-farm-barn/map.png",
  feed: "/the-farm-barn/The_Farm_Barn_Animal_Feed_02.png",
  supplies: "/the-farm-barn/The_Farm_Barn_Farm_Supplies_02.png",
  hay: "/the-farm-barn/The_Farm_Barn_Hay_and_Lucerne_02.png",
  pets: "/the-farm-barn/The_Farm_Barn_Pet_Supplies_02.png",
  cafe: "/the-farm-barn/The_Farm_Barn_Cafe_02.png",
  vet: "/the-farm-barn/The_Farm_Barn_On-Site_Vet.png",
  play: "/the-farm-barn/The_Farm_Barn_Kids_Play_Area.png",
  cafePoster: "/the-farm-barn/Home_Awaits_Cafe_At_Farmbarn.png",
};

export const farmNavigation = [
  { href: "/about", label: "About" },
  { href: "/what-we-offer", label: "What We Offer" },
  { href: "/contact", label: "Contact" },
];

export const farmOffers = [
  { title: "Animal feed", image: farmImages.feed, body: "Feed for horses, livestock, pets, and daily animal care." },
  { title: "Farm supplies", image: farmImages.supplies, body: "Practical essentials for farm, yard, and animal routines." },
  { title: "Hay & lucerne", image: farmImages.hay, body: "A clear source category for stable and farm needs." },
  { title: "Pet supplies", image: farmImages.pets, body: "Products for pet owners and animal lovers in one stop." },
];

export type FarmPage = {
  title: string;
  eyebrow: string;
  lead: string;
  image: string;
  sections: { title: string; body: string; items?: string[] }[];
};

export const farmPages: Record<string, FarmPage> = {
  about: {
    title: "A local farm hub with country air built in.",
    eyebrow: "About The Farm Barn",
    lead: "The Farm Barn story starts in 2006 and stays practical: a Pretoria East supply stop for farmers, pet owners, and animal lovers.",
    image: farmImages.map,
    sections: [
      {
        title: "Who we are",
        body: "The source site describes a welcoming farm supply store where quality products and a relaxed setting sit together.",
      },
      {
        title: "A true farm experience",
        body: "Animals on the property, a countryside setting, and time to explore turn the stop into more than a shelf run.",
      },
      {
        title: "One-stop convenience",
        body: "Animal feed, pet products, farm essentials, Home Awaits Café, and on-site vet signals keep the visit useful.",
      },
    ],
  },
  "what-we-offer": {
    title: "Feed, supplies, tack, care, café, and room to visit.",
    eyebrow: "What We Offer",
    lead: "The source offer spans the things animals need and the things families enjoy while they are on the farm.",
    image: farmImages.feed,
    sections: [
      {
        title: "For animal routines",
        body: "Animal feed, pet supplies, hay and lucerne, animal care, tack, riding, and farm supplies form the practical retail core.",
        items: ["Animal feed", "Pet supplies", "Hay & lucerne", "Tack & riding", "Animal care"],
      },
      {
        title: "For the visit",
        body: "Home Awaits Café, the kids play area, and the farm setting give visitors reasons to stay past the shopping list.",
        items: ["Café", "Kids play area", "On-site vet", "Easy visit path"],
      },
    ],
  },
  contact: {
    title: "Call, WhatsApp, visit the farm.",
    eyebrow: "Contact",
    lead: "The Farm Barn makes contact practical with two phone numbers, Pretoria East directions, visible trading hours, and an email route.",
    image: farmImages.map,
    sections: [
      {
        title: "Reach the barn",
        body: "Call 074 922 2108 or 060 967 5393, email info@thefarmbarn.co.za, or visit Plot 1, Graham Road, Shere, Pretoria, 0081.",
      },
      {
        title: "Trading hours",
        body: "The public contact page lists Monday to Friday from 8:00 to 17:30, Saturday from 9:00 to 14:00, and Sunday closed.",
      },
    ],
  },
};
