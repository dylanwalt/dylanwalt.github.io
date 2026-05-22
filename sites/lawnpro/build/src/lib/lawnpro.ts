export type LawnImage = {
  src: string
  alt: string
}

export type Treatment = {
  slug: string
  title: string
  signal: string
  description: string
  image: LawnImage
}

export type CatalogCategory = {
  slug: string
  title: string
  description: string
}

export type CatalogProduct = {
  slug: string
  title: string
  price: string
  category: string
  image?: string
}

const uploads = "/lawnpro/wp-content/uploads"

export const sourceImages = {
  logo: `${uploads}/2023/07/LawnPro-Logo.jpg`,
  panoramicHome: `${uploads}/2020/02/Lawnpro-slide-1.jpg`,
  panoramicGarden: `${uploads}/2020/02/Lawnpro-slide-3.jpg`,
  panoramicOasis: `${uploads}/2020/02/Lawnpro-slide-4.jpg`,
  moleCricket: `${uploads}/2020/07/Lawn-Pro-mole-crickets-slide.jpg`,
  termite: `${uploads}/2020/07/Lawn-Pro-Termintes-slide.jpg`,
  services: `${uploads}/2020/02/Lawnpro-services.jpg`,
  products: `${uploads}/2020/02/Lawnpro-products.jpg`,
  franchiseTrailer: `${uploads}/2020/02/Lawnpro-franchising-trailer.png`,
  seasonal: `${uploads}/2020/03/Lawnpro-seasonal-maintenance.jpg`,
  dressing: `${uploads}/2020/03/Lawnpro-lawn-dressing.jpg`,
  weeds: `${uploads}/2020/03/Lawnpro-lawn-weeds-treatment.jpg`,
  instant: `${uploads}/2020/03/Lawnpro-instant-lawn.jpg`,
  verticutting: `${uploads}/2020/03/Lawnpro-verticutting.jpg`,
  spiking: `${uploads}/2020/03/Lawnpro-spiking.jpg`,
  dying: `${uploads}/2020/03/Lawnpro-lawn-dying.jpg`,
  termitesService: `${uploads}/2020/07/Lawn-Pro-Services-Termintes.jpg`,
  moleService: `${uploads}/2020/07/Lawn-Pro-Services-Mole-Cricket.jpg`,
  seedlings: `${uploads}/2020/03/Lawnpro-seedlings-2.jpg`,
  seedlingsLawn: `${uploads}/2020/03/Lawnpro-seedlings.jpg`,
  antKit: `${uploads}/2020/03/Lawnpro-ant-kit.jpg`,
  frostGuard: `${uploads}/2020/03/Lawnpro-frost-guard-blankets.jpg`,
  fertiliser: `${uploads}/2020/03/Lawnpro-lawn-and-garden-fertilizer.jpg`,
  compost: `${uploads}/2020/03/Lawnpro-garden-composting.jpg`,
  winterOffer: `${uploads}/2026/04/lawnpro-winter-limited-time-offer.jpg`,
  winterWhy: `${uploads}/2026/04/lawnpro-why-winter-lawn-care-matters.jpg`,
  seedCynodon: `${uploads}/2020/03/Lawnpro-seeds-cynodon-dactylon.jpg`,
  seedKikuyu: `${uploads}/2020/03/Lawnpro-seeds-kikuyu-gold.jpg`,
  seedEvergreen: `${uploads}/2020/03/Lawnpro-seeds-evergreen-mix.jpg`,
  seedShade: `${uploads}/2020/03/Lawnpro-seeds-shade-mix.jpg`,
  seedBerea: `${uploads}/2020/03/Lawnpro-seeds-LM-or-Berea.jpg`,
  seedMooi: `${uploads}/2020/03/Lawnpro-seeds-mooirivier-mix.jpg`,
}

export const treatments: Treatment[] = [
  {
    slug: "lawn-dressing",
    title: "Lawn dressing",
    signal: "Root-zone reset",
    description:
      "Level, feed, and prepare tired turf so new growth has a healthier surface and soil relationship.",
    image: { src: sourceImages.dressing, alt: "Lawn dressing being worked into turf" },
  },
  {
    slug: "lawn-weed-treatment",
    title: "Weed treatment",
    signal: "Competing growth",
    description:
      "Treat weeds as a symptom in the lawn diagnosis, not just something to hide for a weekend.",
    image: { src: sourceImages.weeds, alt: "Lawn weed treatment close-up" },
  },
  {
    slug: "instant-lawn",
    title: "Instant lawn",
    signal: "Fast establishment",
    description:
      "Choose and establish a greener surface when the site needs a more immediate lawn transformation.",
    image: { src: sourceImages.instant, alt: "Instant lawn service image" },
  },
  {
    slug: "verticutting",
    title: "Scarifying and verticutting",
    signal: "Open the canopy",
    description:
      "Reduce excess thatch and create the air, light, and contact that denser turf needs.",
    image: { src: sourceImages.verticutting, alt: "Verticutting treatment on a lawn" },
  },
  {
    slug: "spiking",
    title: "Spiking and aeration",
    signal: "Relieve compaction",
    description:
      "Improve the route for water, oxygen, and nutrients through lawns that have become compacted.",
    image: { src: sourceImages.spiking, alt: "Spiking treatment on turf" },
  },
  {
    slug: "mole-crickets",
    title: "Mole cricket control",
    signal: "Pest pressure",
    description:
      "Inspect damaging underground activity and direct treatment before patches spread.",
    image: { src: sourceImages.moleService, alt: "Mole cricket service image" },
  },
  {
    slug: "termite-control",
    title: "Termite control",
    signal: "Hidden damage",
    description:
      "Address lawn pests that can turn healthy-looking ground into a brittle problem zone.",
    image: { src: sourceImages.termitesService, alt: "Termite lawn service image" },
  },
  {
    slug: "lawn-painting",
    title: "Lawn painting and dyeing",
    signal: "Winter colour",
    description:
      "Use seasonal colour support when dormant lawn presentation matters as much as care planning.",
    image: { src: sourceImages.dying, alt: "Lawn dyeing service image" },
  },
]

export const seasonalPrograms = [
  {
    title: "Fertilise",
    season: "Growth window",
    description: "Nourish lawn and garden areas with the right seasonal feeding path.",
    image: sourceImages.fertiliser,
  },
  {
    title: "Compost",
    season: "Soil structure",
    description: "Use garden composting to support richer soil, water retention, and growth.",
    image: sourceImages.compost,
  },
  {
    title: "Inspect pests",
    season: "Pressure watch",
    description: "Watch for mole crickets, termites, weeds, and disease before damage compounds.",
    image: sourceImages.moleCricket,
  },
  {
    title: "Winter prepare",
    season: "Dormant season",
    description: "Condition, protect, and monitor lawns so spring starts with intent.",
    image: sourceImages.winterWhy,
  },
]

export const seedFamilies = [
  { title: "Cynodon Dactylon", image: sourceImages.seedCynodon },
  { title: "Kikuyu Gold", image: sourceImages.seedKikuyu },
  { title: "Evergreen Mix", image: sourceImages.seedEvergreen },
  { title: "Shade Mix", image: sourceImages.seedShade },
  { title: "LM or Berea", image: sourceImages.seedBerea },
  { title: "MooiRiver Mix", image: sourceImages.seedMooi },
]

export const categories: CatalogCategory[] = [
  {
    slug: "seeds",
    title: "Seeds",
    description: "Lawn seed mixes, fertiliser-coated Kikuyu, and spreading combos.",
  },
  {
    slug: "diy-products",
    title: "DIY products",
    description: "Targeted pest control, lawn paint, frost coverage, and lawn problem helpers.",
  },
  {
    slug: "gardening-accessories",
    title: "Gardening accessories",
    description: "Watering, storage, grow bags, tool care, and practical garden utility.",
  },
  {
    slug: "garden-lighting",
    title: "Garden lighting",
    description: "Solar and decorative lighting for the outdoor room after sunset.",
  },
  {
    slug: "other",
    title: "Combo deals",
    description: "Bundled lawn and garden paths surfaced from the LawnPro storefront.",
  },
  {
    slug: "miscellaneous",
    title: "Miscellaneous",
    description: "Garden finds that sit outside the core lawn clinic range.",
  },
  {
    slug: "festive-season",
    title: "Festive season",
    description: "Seasonal outdoor products from the current shop collection.",
  },
]

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "cool-shade-lawn-mixture-with-fertilizer-and-spreader-combo",
    title: "500gr Cool Shade Lawn Mixture With Fertilizer And Spreader Combo",
    price: "R590,00",
    category: "other",
    image: `${uploads}/2025/08/CSLM-COMBO-300x300.png`,
  },
  {
    slug: "green-all-year-lawn-seed-with-fertilizer-and-spreader-combo",
    title: "500gr Green All Year Lawn Seed With Fertilizer And Spreader Combo",
    price: "R590,00",
    category: "other",
    image: `${uploads}/2025/08/GAYLS-COMBO-300x300.png`,
  },
  {
    slug: "cool-shade-lawn-mixture-with-fertilizer-500gr",
    title: "500gr Cool Shade Lawn Mixture With Fertilizer and Spreader",
    price: "R328,49",
    category: "seeds",
    image: `${uploads}/2024/06/ECSLM500-Cool-Shade-Lawn-Mixture-with-fertilizer-500gr-1-300x300.jpg`,
  },
  {
    slug: "green-all-year-round-lawn-seed-with-fertilizer-500gr",
    title: "500gr Green All Year Round Lawn Seed With Fertilizer And Spreader",
    price: "R328,49",
    category: "seeds",
    image: `${uploads}/2024/06/EGALS500-Green-All-Year-Round-Lawn-Seed-with-Fertilizer-500gr-1-300x300.jpg`,
  },
  {
    slug: "kikuyu-fertilizer-coated-lawn-seed-500gr",
    title: "500gr Kikuyu Lawn Seed, Fertilizer Coated, With Spreader",
    price: "R1105,20",
    category: "seeds",
    image: `${uploads}/2024/06/EKSL500-Kikuyu-Coated-Lawn-Seed-500gr-1-300x300.jpg`,
  },
  {
    slug: "cool-shade-lawn-mixture-5kg",
    title: "5kg Cool Shade Lawn Mixture",
    price: "R2473,86",
    category: "seeds",
  },
  {
    slug: "green-all-year-lawn-seed-5kg",
    title: "5kg Green All Year Lawn Seed",
    price: "R2473,86",
    category: "seeds",
  },
  {
    slug: "kikuyu-fertilizer-coated-lawn-seed-1kg",
    title: "1kg Kikuyu Lawn Seed, Fertilizer Coated, With Spreader",
    price: "R1989,36",
    category: "seeds",
  },
  {
    slug: "kikuyu-fertilizer-coated-lawn-seed-100gr",
    title: "100gr Kikuyu Lawn Seed, Fertilizer Coated, With Spreader",
    price: "R225,49",
    category: "seeds",
  },
  {
    slug: "lawnpro-concentrated-lawn-paint-5l",
    title: "5L Lawnpro Concentrated Lawn Paint",
    price: "R1812,00",
    category: "diy-products",
    image: `${uploads}/2024/06/ELWNDYE-Lawnpro-Concentrated-Lawn-Paint-5L-1-300x300.jpg`,
  },
  {
    slug: "frost-guard-blanket-3m-x-5m",
    title: "Frost Guard Blanket 3m x 5m",
    price: "R75,00",
    category: "diy-products",
    image: `${uploads}/2024/06/EFGSEI-Frost-Guard-Blanket-3m-x-5m-1-300x300.jpg`,
  },
  {
    slug: "eco-trap-a-roach-5-off",
    title: "Eco Trap-A-Roach - 5 off",
    price: "R181,00",
    category: "diy-products",
    image: `${uploads}/2024/06/EETAR5-Eco-Trap-A-Roach--E2-80-93-5-off-1-300x300.jpg`,
  },
  {
    slug: "red-top-fly-trap-disposable",
    title: "Red Top Fly Trap Disposable",
    price: "R100,00",
    category: "diy-products",
    image: `${uploads}/2024/06/ERTFTD-Red-Top-Fly-Trap-Disposable-1-300x300.jpg`,
  },
  {
    slug: "fly-bait-100gr",
    title: "100gr Fly Bait - 1 off",
    price: "R130,00",
    category: "diy-products",
    image: `${uploads}/2024/07/ESFB100-Fly-Bait-100gr-1-300x300.jpg`,
  },
  { slug: "fly-catcher-pro-1-off", title: "Fly Catcher Pro", price: "R100,00", category: "diy-products" },
  { slug: "eco-snail-and-slug-trap-2-off", title: "Eco Friendly Snail And Slug Trap - 2 off", price: "R135,00", category: "diy-products" },
  { slug: "indoor-insecticide-fogger", title: "Indoor Insecticide Fogger", price: "R167,00", category: "diy-products" },
  { slug: "aerosol-refill-1-off-280ml", title: "280ml Aerosol Refill - 1 off", price: "R207,00", category: "diy-products" },
  { slug: "metered-automatic-aerosol-insecticide-dispenser-with-timer", title: "Metered/Automatic Aerosol Insecticide Dispenser With Timer", price: "R464,00", category: "diy-products" },
  {
    slug: "plant-support-garden-tape",
    title: "Plant Support Garden Tape",
    price: "R35,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/08/EPSNT-Plant-Support-Nylon-Tape-1-300x300.jpg`,
  },
  {
    slug: "easy-pour-watering-spout-2",
    title: "Easy Pour Watering Spout",
    price: "R40,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/08/EEWS-Easy-Watering-Spout-1-300x300.jpg`,
  },
  {
    slug: "garden-hose-roller-guide",
    title: "Garden Hose Roller Guide",
    price: "R100,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/08/EGHG-Garden-Hose-Guide-1-300x300.jpg`,
  },
  {
    slug: "garden-tool-hanger-organizer-with-roller-clips-and-hooks",
    title: "Garden Tool Hanger/Organizer With Roller Clips And Hooks",
    price: "R360,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/07/Garden-Tool-Hanger-Cover-300x300.png`,
  },
  {
    slug: "lawn-mower-garden-tool-blade-sharpener-1-off",
    title: "Lawn Mower/Garden Tool Blade Sharpener 1 off",
    price: "R100,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/07/Lawnpro-Garden-tool-blade-sharpener-4-300x300.jpg`,
  },
  {
    slug: "premium-extra-large-garden-waste-bag-500-liter",
    title: "Premium Extra Large Garden Waste Bag 500 Liter",
    price: "R360,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/07/Lawnpro-Garden-waste-bag-3-300x300.jpg`,
  },
  {
    slug: "portable-felt-strawberry-herb-grow-bag-and-watering-sprout-combo",
    title: "Portable Felt Strawberry/Herb Grow Bag And Watering Sprout Combo",
    price: "R220,00",
    category: "other",
    image: `${uploads}/2025/08/Strawberry-bag-300x300.jpg`,
  },
  { slug: "portable-felt-strawberry-herb-grow-bag-1-off", title: "Portable Felt Strawberry/Herb Grow Bag 1 off", price: "R199,00", category: "gardening-accessories" },
  {
    slug: "wall-hanging-growing-bag-9-pockets",
    title: "Wall Hanging Growing Bag - 9 Pockets",
    price: "R200,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/12/Wall-Hanging-Growing-Bag-COVER--E2-80-93-9-Pockets-300x300.png`,
  },
  {
    slug: "humming-bird-rain-gauge-copy",
    title: "Wall Hanging Growing Bag - 18 Pockets",
    price: "R350,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/12/Wall-Hanging-Growing-Bag-COVER-300x300.png`,
  },
  {
    slug: "high-pressure-spray-gun-with-foam-bottle",
    title: "High-Pressure Spray Gun With Foam Bottle",
    price: "R225,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/07/Lawnpro-High-pressure-car-wash-spray-1-300x300.jpg`,
  },
  {
    slug: "high-pressure-spray-gun-with-foam-bottle-with-heavy-duty-hose-holder-wall-mount",
    title: "High-Pressure Spray Gun And Heavy Duty Hose Holder Wall Mount Combo",
    price: "R307,00",
    category: "other",
    image: `${uploads}/2024/07/Lawnpro-High-pressure-car-wash-spray-1-300x300.jpg`,
  },
  {
    slug: "heavy-duty-hose-holder-wall-mount",
    title: "Heavy Duty Hose Holder Wall Mount",
    price: "R115,00",
    category: "gardening-accessories",
    image: `${uploads}/2024/07/Lawnpro-Heavy-duty-hose-holder-3-300x300.jpg`,
  },
  {
    slug: "decorative-small-led-kerosene-lamp",
    title: "Decorative Small Led Kerosene Lamp",
    price: "R65,00",
    category: "garden-lighting",
    image: `${uploads}/2024/08/ELKLMP-Charming-Led-Kerosene-Lamp-1-300x300.jpg`,
  },
  {
    slug: "solar-led-meteor-shower-lights",
    title: "Solar LED Meteor Shower Lights",
    price: "R340,00",
    category: "garden-lighting",
    image: `${uploads}/2024/08/ELMLT-LED-Meteor-Light-1-300x300.jpg`,
  },
  {
    slug: "multicolor-firefly-solar-garden-lights-6-leds",
    title: "Multicolor Firefly Solar Garden LED Lights",
    price: "R130,00",
    category: "garden-lighting",
    image: `${uploads}/2024/08/EFFSGLMC-Multi-Color-LED-Firefly-Lights-6-piece-1-300x300.jpg`,
  },
  {
    slug: "pack-firefly-solar-garden-lights-12-leds-1-off",
    title: "Firefly Solar Garden Lights 12 LEDs - 1 off",
    price: "R150,00",
    category: "garden-lighting",
    image: `${uploads}/2024/07/Lawnpro-firefly-solar-garden-lights-7-300x300.jpg`,
  },
  {
    slug: "solar-powered-motion-detector-wall-lights-led-1-off",
    title: "Solar Powered Motion Detector Wall Light LED - 1 off",
    price: "R100,00",
    category: "garden-lighting",
    image: `${uploads}/2024/07/Lawnpro-Solar-wall-light-2-300x300.jpg`,
  },
  {
    slug: "solar-chistmas-tree-4pc",
    title: "Solar Christmas Tree - 4pc",
    price: "R800,00",
    category: "festive-season",
    image: `${uploads}/2024/10/Solar-Christmas-Tree-Cover-300x300.png`,
  },
  {
    slug: "bird-feeder-including-seed-starter-pack",
    title: "Bird Feeder Starter Pack",
    price: "R70,00",
    category: "miscellaneous",
    image: `${uploads}/2024/08/EHBFDR-Hanging-Bird-Feeder-1-300x300.jpg`,
  },
  {
    slug: "humming-bird-rain-gauge",
    title: "Humming Bird Rain Gauge",
    price: "R400,00",
    category: "miscellaneous",
    image: `${uploads}/2024/11/Humming-Bird-Rain-Gauge-with-dimensions-300x300.jpg`,
  },
  {
    slug: "rock-secret-spare-key-holder",
    title: "Rock Secret Spare Key Holder",
    price: "R70,00",
    category: "miscellaneous",
    image: `${uploads}/2024/07/Lawnpro-Rock-secret-spare-key-3-300x300.jpg`,
  },
  { slug: "flower-pot-self-watering-birds-set-of-2", title: "Flower Pot Self Watering Birds Set Of 2", price: "R90,00", category: "miscellaneous" },
]

export const proofPoints = [
  {
    value: "14",
    title: "Point lawn analysis",
    description: "A diagnostic entry path before treatment suggestions.",
  },
  {
    value: "1992",
    title: "Source operating claim",
    description: "The franchise page anchors LawnPro's system history here.",
  },
  {
    value: "Root → tip",
    title: "Lawn doctor view",
    description: "Surface colour, soil, pests, season, and products connect.",
  },
  {
    value: "DIY + service",
    title: "Two care paths",
    description: "Professional treatments meet browsable lawn essentials.",
  },
]

export function productsForCategory(slug: string) {
  return catalogProducts.filter((product) => product.category === slug)
}

export function findProduct(slug: string) {
  return catalogProducts.find((product) => product.slug === slug)
}

export function categoryTitle(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function productImage(product: CatalogProduct) {
  return product.image ?? sourceImages.products
}
