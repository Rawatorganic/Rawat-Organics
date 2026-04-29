// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductTag = "spicy" | "sweet" | "earthy" | "aromatic";
export type ProductCategory = "whole-spices" | "powder-spices";
export type FilterTab = "all" | ProductTag;

export interface Product {
  productId: string;
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  longDescription: string;
  tags: ProductTag[];
  primaryImage: string;
  images: string[];
  color: string;
}

// ─── Brand ────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "Rawat Organic",
  fullName: "Rawat Organics",
  tagline: "Pure Organic Spices, Straight from the Farm",
  description:
    "Bringing the finest farm-fresh, chemical-free spices from Indian soil directly to your table.",
  email: "hello@rawatorganics.com",
  copyright: "© 2024 Rawat Organics. Pure Spices, Honest Farming.",
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Whole Spices", href: "/whole-spices" },
  { label: "Powder Spices", href: "/powder-spices" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "/contact" },
] as const;

export const NAV_CTA = "Inquire" as const;

// ─── Hero Section ─────────────────────────────────────────────────────────────

export const HERO = {
  eyebrow: "100% Organic & Farm-Fresh Spices",
  titleStart: "Pure.",
  titleHighlight: "Natural.",
  titleEnd: "Organic.",
  subtitle:
    "Experience spices the way nature intended — hand-harvested, sun-dried, and completely free from chemicals. From Indian farms straight to your kitchen.",
  primaryCTA: "Explore Spices",
  secondaryCTA: "Our Story",
  scrollLabel: "Scroll to explore",
} as const;

// ─── Marquee ──────────────────────────────────────────────────────────────────

export const MARQUEE_TEXT =
  "Whole Spices ✦ Powder Spices ✦ Heritage Seeds ✦ 100% Organic ✦ Farm Fresh ✦ No Chemicals ✦ Hand‑Harvested ✦ Chemical Free ✦ Regenerative Farming ✦ Direct from Farm ✦";

// ─── Story Section ────────────────────────────────────────────────────────────

export const STORY = {
  eyebrow: "Our Legacy",
  heading: "The Rawat Story: Three Decades of Pure Spices",
  paragraphs: [
    "Founded over 30 years ago, Rawat Organics has been a trusted name in pure, chemical-free spices. From our farms in India, we grow, harvest, and deliver spices that carry the true aroma and potency nature intended.",
    "Every spice we produce is a result of our commitment to organic farming — no pesticides, no artificial preservatives, no shortcuts. We believe great food starts with great spices, and great spices start with healthy, honest soil.",
  ],
  cta: "Discover Our Story",
} as const;

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  {
    value: 1,
    suffix: "+",
    label: "Years of Heritage",
    sub: "More than one year cultivating trust",
    icon: "history",
  },
  {
    value: 100,
    suffix: "%",
    label: "Organic Certified",
    sub: "Every product, every single batch",
    icon: "verified",
  },
  {
    value: 50,
    suffix: "+",
    label: "Spice Varieties",
    sub: "From rare heirloom varietals",
    icon: "grass",
  },
  {
    value: 0,
    suffix: "",
    label: "Chemicals Used",
    sub: "Purely by nature's design",
    icon: "eco",
  },
];

// ─── Collection Section ───────────────────────────────────────────────────────

export const COLLECTION_SECTION = {
  eyebrow: "Our Collections",
  headingStart: "Our Spice",
  headingHighlight: "Collections",
  viewAll: "View All Products",
} as const;

export const CATEGORIES = [
  {
    title: "Whole Spices",
    description:
      "Unground and aromatic, our whole spices are preserved in their natural form — offering intense, authentic flavors and maximum shelf life.",
    imgSrc: "/products/coriander.png",
    imgAlt: "Organic coriander whole spices",
    badge: "Best Sellers",
    badgeIcon: "star",
    href: "/whole-spices",
    bg: "bg-amber-950/10",
  },
  {
    title: "Powder Spices",
    description:
      "Finely ground, vibrant, and potent — our spice powders blend seamlessly to create bold color and deep flavor in every dish.",
    imgSrc: "/products/turmeric.png",
    imgAlt: "Turmeric and powder spices",
    badge: "Premium",
    badgeIcon: "workspace_premium",
    href: "/powder-spices",
    bg: "bg-yellow-950/10",
  },
  {
    title: "Seeds & Grains",
    description:
      "Heirloom seeds harvested at peak potency — rich in nutrition and bursting with the earthy vitality of regenerative soil.",
    imgSrc: "/products/fennel.png",
    imgAlt: "Fennel seeds and heritage grains",
    badge: "Heritage",
    badgeIcon: "eco",
    href: "/product",
    bg: "bg-green-950/10",
  },
  {
    title: "Blends & Mixes",
    description:
      "Expertly crafted spice blends born from generations of culinary tradition, balanced for perfection in every pinch.",
    imgSrc: "/products/spice-mix.png",
    imgAlt: "Curated spice blends and mixes",
    badge: "New Arrival",
    badgeIcon: "new_releases",
    href: "/product",
    bg: "bg-rose-950/10",
  },
];

// ─── Process Section ──────────────────────────────────────────────────────────

export const PROCESS_SECTION = {
  eyebrow: "Our Process",
  headingStart: "From Earth",
  headingHighlight: "to Table",
  subtitle:
    "Every step is a deliberate act of care — from the seed we choose to the seal on your package.",
} as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    icon: "water_drop",
    title: "Sow",
    description:
      "Heirloom seeds are planted in mineral-rich, untreated soil under the open sky — no shortcuts, no synthetics.",
  },
  {
    number: "02",
    icon: "wb_sunny",
    title: "Grow",
    description:
      "Nurtured through natural rainfall and ancient rotational farming cycles that restore, not deplete, the land.",
  },
  {
    number: "03",
    icon: "front_hand",
    title: "Harvest",
    description:
      "Hand-picked at precise peak potency by skilled farmers who understand that timing is everything.",
  },
  {
    number: "04",
    icon: "package_2",
    title: "Deliver",
    description:
      "Cold-processed and sealed fresh at our facility, shipped directly to your door without compromise.",
  },
];

// ─── Values Section ───────────────────────────────────────────────────────────

export const VALUES_SECTION = {
  eyebrow: "Our Promise",
  heading: "Why Choose Rawat",
} as const;

export const VALUES = [
  {
    icon: "verified",
    title: "100% Organic",
    description:
      "Every product is certified to the highest global organic standards.",
  },
  {
    icon: "eco",
    title: "No Chemicals",
    description:
      "Zero synthetic pesticides or fertilizers, ever. Purely nature's design.",
  },
  {
    icon: "agriculture",
    title: "Farm Fresh",
    description:
      "Direct from our farms to your table — minimal handling, maximum freshness.",
  },
  {
    icon: "workspace_premium",
    title: "Trusted Quality",
    description:
      "A heritage of excellence spanning three decades of conscious cultivation.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS_SECTION = {
  eyebrow: "Voices",
  headingStart: "The Conscious",
  headingHighlight: "Voice",
} as const;

export const TESTIMONIALS = [
  {
    quote:
      "The aromatic quality of their heritage spices is unmatched. It's like cooking with the soul of the earth — every dish becomes a ceremony.",
    name: "Eleanor Vance",
    role: "Culinary Director",
    initial: "EV",
  },
  {
    quote:
      "Finding true organic authenticity is rare in today's market. Rawat Organics is my primary source for all botanical essentials, and I trust them completely.",
    name: "Julian Thorne",
    role: "Wellness Practitioner",
    initial: "JT",
  },
  {
    quote:
      "Their commitment to regenerative farming is genuinely inspiring. You can actually taste the difference — the grains are alive in a way that commercial brands simply aren't.",
    name: "Dr. Amara Singh",
    role: "Environmental Scientist",
    initial: "AS",
  },
  {
    quote:
      "I've sourced spices from across the world, but Rawat's coriander and fennel seeds are exceptional. Pure, potent, and perfectly packed.",
    name: "Marco Bellini",
    role: "Executive Chef",
    initial: "MB",
  },
  {
    quote:
      "As someone deeply invested in Ayurvedic practice, I demand purity. Rawat Organics delivers on every promise — no compromise, no shortcuts.",
    name: "Priya Nair",
    role: "Ayurvedic Practitioner",
    initial: "PN",
  },
];

// ─── CTA Section ──────────────────────────────────────────────────────────────

export const CTA_SECTION = {
  heading: "Stay in the Loop with Rawat Organics",
  subtitle:
    "Get updates on seasonal harvests, new spice arrivals, and recipes straight from our kitchen.",
  emailPlaceholder: "Your email address",
  submitLabel: "Subscribe",
  successMessage: "Thank you! We'll be in touch.",
} as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  brand: "Rawat Organics",
  description:
    "Farm-fresh organic spices, grown with care and delivered without compromise.",
  exploreLinks: ["Sustainability", "Press", "Legal", "Privacy"],
  connectLinks: ["Instagram", "LinkedIn", "Twitter"],
  location: [
    "The Highland Estates,",
    "Plot 12, Valley Route,",
    "Organic Meadows, UK",
  ],
  email: "hello@rawatorganics.com",
  copyright: "© 2024 Rawat Organics. Pure Spices, Honest Farming.",
  backToTop: "Back to top",
} as const;

// ─── Whole Spices Page ────────────────────────────────────────────────────────

export const WHOLE_SPICES_PAGE = {
  hero: {
    eyebrow: "Our Whole Spices",
    headingLine1: "Whole Spices,",
    headingHighlight: "Pure & Unaltered.",
    backLabel: "Back to Home",
  },
  collection: {
    eyebrow: "Rawat Organics",
    headingStart: "The",
    headingHighlight: "Collection",
    cardBadge: "Whole Spice",
    viewDetails: "View Details",
  },
  quote: {
    text: '"The journey of a thousand flavors begins with a single, unaltered whole spice."',
    attribution: "— The Rawat Philosophy",
    ctaLabel: "Inquire for Wholesale",
    ctaHref:
      "mailto:hello@rawatorganics.com?subject=Wholesale%20Inquiry%20%E2%80%94%20Whole%20Spices",
  },
} as const;

// ─── Powder Spices Page ───────────────────────────────────────────────────────

export const POWDER_SPICES_PAGE = {
  hero: {
    backgroundText: ["ARTISANAL", "SPICES"] as const,
    badge: "Premium Collection",
    headingStart: "Artisanal Powders:",
    headingHighlight: "Pure, Potent,",
    headingEnd: "& Ground with Care",
    backLabel: "Back to Home",
    exploreLabel: "Explore Collection",
  },
  collection: {
    eyebrow: "Rawat Organics",
    headingStart: "Finely Ground",
    headingHighlight: "Heritage",
    viewDetails: "View Details",
  },
  filterTabs: [
    { label: "All", value: "all" as FilterTab },
    { label: "Spicy", value: "spicy" as FilterTab },
    { label: "Sweet", value: "sweet" as FilterTab },
    { label: "Earthy", value: "earthy" as FilterTab },
    { label: "Aromatic", value: "aromatic" as FilterTab },
  ],
  journal: {
    eyebrow: "Stay Connected",
    headingStart: "The Spice",
    headingHighlight: "Journal",
    description:
      "Reach out for wholesale inquiries, custom blends, or to learn more about our sourcing practices and farm partnerships.",
    ctaLabel: "Get in Touch",
    ctaHref:
      "mailto:hello@rawatorganics.com?subject=Wholesale%20Inquiry%20%E2%80%94%20Powder%20Spices",
  },
} as const;

// ─── Product Images ───────────────────────────────────────────────────────────

const IMAGE_POOL = [
  "/products/spices-variety.png",
  "/products/coriander.png",
  "/products/turmeric.png",
  "/products/fennel.png",
  "/products/spice-mix.png",
  "/products/spices-display.png",
];

function img(i: number): string {
  return IMAGE_POOL[i % IMAGE_POOL.length];
}

function imgs(i: number): string[] {
  return [img(i), img(i + 1), img(i + 2)];
}

// ─── Whole Spices Products ────────────────────────────────────────────────────

export const WHOLE_SPICES: Product[] = [
  {
    productId: "Whole_Spice_Cumin",
    id: "ws-cumin",
    slug: "cumin",
    name: "Cumin",
    category: "whole-spices",
    tagline: "The aromatic heartbeat of South Asian cuisine",
    description:
      "Warm, earthy seeds — the aromatic heartbeat of South Asian and Middle Eastern cuisine.",
    longDescription:
      "Sourced from sun-drenched fields at peak harvest, our whole cumin seeds carry an intensely warm, earthy aroma with a subtle citrus edge. Roast lightly to unlock their full depth, or temper in oil for a bold, fragrant base. Essential in dals, curries, and spice blends worldwide.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#B45309",
  },
  {
    productId: "Whole_Spice_Chilli",
    id: "ws-chilli",
    slug: "chilli",
    name: "Chilli",
    category: "whole-spices",
    tagline: "Sun-dried fire with vibrant depth",
    description:
      "Sun-dried whole chillies with rich, fiery heat and deeply vibrant red color.",
    longDescription:
      "These whole dried chillies deliver a bold, persistent heat alongside a rich, fruity depth that powders can never replicate. Ideal for tempering in hot oil, slow-simmering curries, and pickling brines. The seeds and membrane can be adjusted to control heat intensity.",
    tags: ["spicy"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#DC2626",
  },
  {
    productId: "Whole_Spice_Turmeric",
    id: "ws-turmeric",
    slug: "turmeric",
    name: "Turmeric",
    category: "whole-spices",
    tagline: "Golden rhizome with potent health benefits",
    description:
      "Golden rhizome roots with earthy depth, mild bitterness, and potent anti-inflammatory properties.",
    longDescription:
      "Our whole turmeric rhizomes are harvested at full maturity, delivering maximum curcumin content alongside a deep, earthy aroma and vivid golden hue. Use whole in milk infusions, pickling jars, and slow braises. Grate or slice fresh for the most vibrant flavor.",
    tags: ["earthy"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#D97706",
  },
  {
    productId: "Whole_Spice_Coriander",
    id: "ws-coriander",
    slug: "coriander",
    name: "Coriander",
    category: "whole-spices",
    tagline: "Light, citrusy seeds with a floral undertone",
    description:
      "Light, citrusy seeds with a delicate floral undertone and warming spice.",
    longDescription:
      "Whole coriander seeds offer a gentle warmth layered with citrus zest and subtle floral notes — a versatile spice that works beautifully in both sweet and savory preparations. Toast until fragrant and grind fresh, or add whole to spice-infused oils and marinades.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#92400E",
  },
  {
    productId: "Whole_Spice_Ginger",
    id: "ws-ginger",
    slug: "ginger",
    name: "Ginger",
    category: "whole-spices",
    tagline: "Warming dried roots with bright citrus notes",
    description:
      "Pungent dried roots with warming spice, bright citrus notes, and digestive benefits.",
    longDescription:
      "Whole dried ginger carries a concentrated, penetrating warmth far more complex than fresh ginger. The drying process transforms its flavor into a bold, spicy-sweet profile with lingering heat — ideal for chai blends, spice rubs, and slow-cooked dishes that benefit from deep ginger character.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#D97706",
  },
  {
    productId: "Whole_Spice_Fennel",
    id: "ws-fennel",
    slug: "fennel",
    name: "Fennel",
    category: "whole-spices",
    tagline: "Sweet anise-like seeds with refreshing aroma",
    description:
      "Sweet anise-like seeds with a refreshing, licorice-forward aroma and mild sweetness.",
    longDescription:
      "Our whole fennel seeds are sun-cured to preserve their essential oils, delivering a clean, sweet anise aroma and a cooling finish. Used across Italian, Indian, and Middle Eastern cuisines, they elevate sausages, breads, fish dishes, and digestive teas with effortless elegance.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#065F46",
  },
  {
    productId: "Whole_Spice_Fenugreek",
    id: "ws-fenugreek",
    slug: "fenugreek",
    name: "Fenugreek",
    category: "whole-spices",
    tagline: "Bitter-sweet seeds with a maple-like finish",
    description:
      "Bitter-sweet seeds packed with nutrients and a unique maple-like finish when roasted.",
    longDescription:
      "Fenugreek seeds are a nutritional powerhouse with a distinctive bitter edge that mellows beautifully when roasted, revealing a warm, maple-syrup sweetness. Central to South Asian pickles, curries, and spice blends, they add a characteristic depth that is unmistakably bold and complex.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#78350F",
  },
  {
    productId: "Whole_Spice_Ajwain",
    id: "ws-ajwain",
    slug: "ajwain",
    name: "Ajwain (Bishop's Weed)",
    category: "whole-spices",
    tagline: "Intensely thyme-like, digestive seeds",
    description:
      "Thyme-like, digestive seeds with intense, camphor-tinged heat — powerful in every pinch.",
    longDescription:
      "Often called Bishop's Weed, ajwain seeds carry a bold, thyme-like aroma with a sharp, peppery heat and hints of camphor. A staple in Indian flatbreads, fritters, and digestive preparations, they are transformatively powerful even in tiny quantities — an essential spice for bold cooking.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#57534E",
  },
  {
    productId: "Whole_Spice_Star_Anise",
    id: "ws-star-anise",
    slug: "star-anise",
    name: "Star Anise",
    category: "whole-spices",
    tagline: "Star-shaped pods with intense licorice aroma",
    description:
      "Star-shaped pods with a sweet, intense licorice and fennel aroma. Beautiful and bold.",
    longDescription:
      "These stunning, star-shaped pods deliver an assertive, sweet licorice depth that perfumes the entire dish. Whole star anise is indispensable in Chinese five-spice, Vietnamese pho, and Indian biryani. The whole pod releases flavor slowly over long cooking — ideal for braises and infused stocks.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#92400E",
  },
  {
    productId: "Whole_Spice_Black_Pepper",
    id: "ws-black-pepper",
    slug: "black-pepper",
    name: "Black Pepper",
    category: "whole-spices",
    tagline: "The universal spice — bold heat with woody depth",
    description:
      "The universal spice — bold heat with citrus and woody depth. The king of spices.",
    longDescription:
      "Our whole black peppercorns are harvested at peak ripeness from high-altitude estates, delivering a complex heat with citrus brightness, woody depth, and a lingering warmth. Freshly cracked in a grinder, they release aromatics that pre-ground pepper simply cannot match.",
    tags: ["spicy"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#374151",
  },
  {
    productId: "Whole_Spice_Mace_Nutmeg",
    id: "ws-mace-nutmeg",
    slug: "mace-nutmeg",
    name: "Mace & Nutmeg",
    category: "whole-spices",
    tagline: "Two-in-one aromatic from the same fruit",
    description:
      "Mace and nutmeg from the same fruit — warm, sweet, and deeply aromatic in their whole forms.",
    longDescription:
      "Mace is the lacy red aril that surrounds the nutmeg seed — both arise from a single tropical fruit, yet each offers a distinct character. Mace is lighter and more floral; nutmeg is deeper and spicier. Grate whole directly into dishes for the most vibrant, complex aromatics.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#EA580C",
  },
  {
    productId: "Whole_Spice_Dehydrated_Garlic",
    id: "ws-dehydrated-garlic",
    slug: "dehydrated-garlic",
    name: "Dehydrated Garlic",
    category: "whole-spices",
    tagline: "Concentrated garlic intensity without moisture",
    description:
      "Pungent, essential dried bulbs — the irreplaceable foundation of bold, savory flavors worldwide.",
    longDescription:
      "Our dehydrated garlic retains the full pungency and rich savory depth of fresh bulbs while offering long shelf life and effortless use. Reconstitute in water for a fresh-like intensity, or use dry in rubs, spice blends, and slow-cooked preparations where moisture is to be controlled.",
    tags: ["earthy"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#78716C",
  },
  {
    productId: "Whole_Spice_Dill_Seeds",
    id: "ws-dill-seeds",
    slug: "dill-seeds",
    name: "Dill Seeds",
    category: "whole-spices",
    tagline: "Herbal, anise-flavored seeds with a clean finish",
    description:
      "Herbal, slightly anise-flavored seeds with a clean, fresh, delicate finish.",
    longDescription:
      "Dill seeds carry a clean, herbal warmth with a mild anise undertone — lighter and more delicate than fennel, yet equally versatile. They are essential in pickling brines, Scandinavian breads, and Indian spice blends. The whole seeds hold their flavor beautifully in long infusions.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#4D7C0F",
  },
  {
    productId: "Whole_Spice_Clove",
    id: "ws-clove",
    slug: "clove",
    name: "Clove",
    category: "whole-spices",
    tagline: "Intensely aromatic buds with numbing warmth",
    description:
      "Intensely aromatic dried buds with numbing warmth, depth, and a bold floral note.",
    longDescription:
      "Our whole cloves are harvested at the exact moment of peak essential-oil content — before the flower opens — giving maximum eugenol concentration for a bold, numbing warmth and intensely floral aroma. Use sparingly in rice, curries, mulled wines, and spice blends; a little goes far.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#292524",
  },
  {
    productId: "Whole_Spice_Cassia",
    id: "ws-cassia",
    slug: "cassia",
    name: "Cassia",
    category: "whole-spices",
    tagline: "Thick bark with intense cinnamon-like warmth",
    description:
      "Thick, robust bark with intense cinnamon-like warmth and bold, lingering spice.",
    longDescription:
      "Cassia bark offers a bolder, more robust character than Ceylon cinnamon — thicker, harder, and with a penetrating, lingering spice that holds up beautifully in long-cooked dishes. An essential component of Indian garam masala and Chinese five-spice, it infuses deep, warming complexity.",
    tags: ["spicy", "sweet"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#78350F",
  },
  {
    productId: "Whole_Spice_Cinnamon",
    id: "ws-cinnamon",
    slug: "cinnamon",
    name: "Cinnamon",
    category: "whole-spices",
    tagline: "Ceylon's finest — delicate sweet quills",
    description:
      "Delicate, sweet quills with a refined, warm, and woody fragrance. Ceylon's finest.",
    longDescription:
      "True Ceylon cinnamon in its most refined form — tightly rolled, paper-thin quills with a delicate sweetness and a gentle warmth that is far more nuanced than cassia. Break into pieces for infused milk, use whole in biryanis and desserts, or grind fresh for the purest cinnamon experience.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#B45309",
  },
  {
    productId: "Whole_Spice_Asafoetida",
    id: "ws-asafoetida",
    slug: "asafoetida",
    name: "Asafoetida",
    category: "whole-spices",
    tagline: "Pungent resin that transforms when cooked",
    description:
      "Pungent resin with a powerful umami character that transforms completely when cooked.",
    longDescription:
      "Raw asafoetida carries a sharp, sulfurous intensity that may surprise — but once it hits hot oil, it undergoes a remarkable transformation into a deeply savory, onion-garlic depth that forms the invisible backbone of countless vegetarian dishes. A tiny pinch is all you need.",
    tags: ["aromatic"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#A16207",
  },
  {
    productId: "Whole_Spice_Green_Cardamom",
    id: "ws-green-cardamom",
    slug: "green-cardamom",
    name: "Green Cardamom",
    category: "whole-spices",
    tagline: "Royally fragrant pods with eucalyptus notes",
    description:
      "Floral, sweet pods with eucalyptus notes and bright, complex aromatics. Royally fragrant.",
    longDescription:
      'Often called the "Queen of Spices," our green cardamom pods are harvested from high-altitude estates and sun-dried to preserve their essential oils. Each pod bursts with a floral, camphor-like sweetness and a cooling eucalyptus finish — indispensable in chai, biryanis, and sweet preparations.',
    tags: ["sweet", "aromatic"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#065F46",
  },
  {
    productId: "Whole_Spice_Black_Cardamom",
    id: "ws-black-cardamom",
    slug: "black-cardamom",
    name: "Black Cardamom",
    category: "whole-spices",
    tagline: "Smoky, camphor-rich pods for slow cooking",
    description:
      "Smoky, camphor-rich pods — ideal for slow-cooked, deeply aromatic preparations.",
    longDescription:
      "Black cardamom is the bold, smoky sibling of green cardamom — fire-dried over charcoal to impart a distinctive smokiness alongside deep camphor and eucalyptus notes. It anchors the flavor of slow-cooked biryanis, meat curries, and robust spice blends with a grounding, earthy complexity.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#1F2937",
  },
];

// ─── Powder Spices Products ───────────────────────────────────────────────────

export const POWDER_SPICES: Product[] = [
  {
    productId: "Powder_Spice_Cumin",
    id: "ps-cumin",
    slug: "cumin-powder",
    name: "Cumin Powder",
    category: "powder-spices",
    tagline: "Deep, warm, smoky backbone for any dish",
    description:
      "Deep, warm, and smoky — adds earthy backbone to curries, dals, and marinades.",
    longDescription:
      "Cold-milled from premium whole cumin seeds at low temperature to preserve volatile oils, our cumin powder delivers a deep, complex smokiness that elevates every dish it touches. Its warm, earthy character builds the foundation of countless spice blends, marinades, and dry rubs.",
    tags: ["earthy"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#B45309",
  },
  {
    productId: "Powder_Spice_Chilli",
    id: "ps-chilli",
    slug: "chilli-powder",
    name: "Chilli Powder",
    category: "powder-spices",
    tagline: "Fiery, vibrant red with bold heat",
    description:
      "Fiery and vibrant red, delivering bold heat and rich color to any dish.",
    longDescription:
      "Ground from select sun-dried whole chillies, our chilli powder carries both fierce heat and a beautiful, vivid red color. The drying process concentrates the capsaicin while preserving fruity depth — perfect for adding fire and visual brilliance to curries, spice rubs, and marinades alike.",
    tags: ["spicy"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#DC2626",
  },
  {
    productId: "Powder_Spice_Turmeric",
    id: "ps-turmeric",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "powder-spices",
    tagline: "Brilliant golden, earthy, powerfully healthy",
    description:
      "Brilliant golden, earthy, and slightly bitter — a staple with powerful health benefits.",
    longDescription:
      "Our high-curcumin turmeric powder is cold-milled from mature rhizomes to deliver a vivid, deep golden hue and a complex earthy bitterness. Scientifically recognized for its anti-inflammatory properties, it is as potent medicinally as it is essential culinarily — a true botanical treasure.",
    tags: ["earthy"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#D97706",
  },
  {
    productId: "Powder_Spice_Coriander",
    id: "ps-coriander",
    slug: "coriander-powder",
    name: "Coriander Powder",
    category: "powder-spices",
    tagline: "Mild, citrusy, the gentle foundation of blends",
    description:
      "Mild, citrusy, and subtly sweet — the gentle foundation of most spice blends.",
    longDescription:
      "Ground from whole coriander seeds at their peak aroma, our powder carries a soft citrus sweetness and a warm floral undertone. As the gentle binding agent in most Indian spice blends, it rounds sharp edges and adds depth without overwhelming — the quiet backbone of great cooking.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#92400E",
  },
  {
    productId: "Powder_Spice_Celery",
    id: "ps-celery",
    slug: "celery-powder",
    name: "Celery Powder",
    category: "powder-spices",
    tagline: "Warm, slightly bitter with a distinctive boldness",
    description:
      "Small yet bold — a distinctive warm, slightly bitter flavor that elevates every dish.",
    longDescription:
      "Ground from premium celery seeds, this powder delivers a unique, warm bitterness with herbal and slightly salty undertones. A natural flavor enhancer often used in soups, stews, salad dressings, and spice blends, it adds a complex savory depth that is hard to pin down but immediately noticed.",
    tags: ["earthy"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#4D7C0F",
  },
  {
    productId: "Powder_Spice_Ginger",
    id: "ps-ginger",
    slug: "ginger-powder",
    name: "Ginger Powder",
    category: "powder-spices",
    tagline: "Sharp, warm, and bright in sweet and savory",
    description:
      "Sharp, warm, and bright — adds depth to both sweet and savory preparations.",
    longDescription:
      "Dried and ground from mature ginger rhizomes, our ginger powder has a distinctly sharper, more penetrating heat than fresh ginger, with a sweet-spicy warmth and lingering brightness. Equally at home in chai masala, gingerbread, marinades, and curries — a truly versatile spice.",
    tags: ["spicy"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#CA8A04",
  },
  {
    productId: "Powder_Spice_Curry_Leaf",
    id: "ps-curry-leaf",
    slug: "curry-leaf-powder",
    name: "Curry Leaf Powder",
    category: "powder-spices",
    tagline: "The nutty, aromatic soul of South India",
    description:
      "Nutty, aromatic, and distinctive — captures the soul of South Indian cooking.",
    longDescription:
      "Made from shade-dried curry leaves ground to a fine powder, this spice captures the irreplaceable, nutty-citrusy aroma that is the hallmark of South Indian cuisine. Add to chutneys, rice, lentil dishes, and coconut curries for an authentic, deeply aromatic character that is utterly distinctive.",
    tags: ["aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#4D7C0F",
  },
  {
    productId: "Powder_Spice_Fennel",
    id: "ps-fennel",
    slug: "fennel-powder",
    name: "Fennel Powder",
    category: "powder-spices",
    tagline: "Sweet, licorice-like and beautifully aromatic",
    description:
      "Sweet, licorice-like, and cool — beautifully aromatic in meat and vegetable dishes.",
    longDescription:
      "Ground from premium whole fennel seeds, this powder carries a sweet anise warmth and a refreshing, cooling quality that makes it incredibly versatile. It bridges the gap between sweet and savory with elegance — essential in Italian sausage, Indian spice blends, and Middle Eastern preparations.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#065F46",
  },
  {
    productId: "Powder_Spice_Fenugreek",
    id: "ps-fenugreek",
    slug: "fenugreek-powder",
    name: "Fenugreek Powder",
    category: "powder-spices",
    tagline: "Bitter-sweet complexity with a maple finish",
    description:
      "Bitter-sweet with a maple finish — a complex, nutrient-rich addition to blends.",
    longDescription:
      "Fenugreek powder offers a fascinating, complex bitterness that slowly gives way to a warm, maple-syrup sweetness on the palate. Rich in soluble fiber and minerals, it is both a nutritional powerhouse and an indispensable culinary ingredient in curries, spice blends, and digestive preparations.",
    tags: ["earthy"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#78350F",
  },
  {
    productId: "Powder_Spice_Black_Pepper",
    id: "ps-black-pepper",
    slug: "black-pepper-powder",
    name: "Black Pepper Powder",
    category: "powder-spices",
    tagline: "Sharp, hot, the most used spice in the world",
    description:
      "Sharp, hot, and universally essential — the most used spice in the world.",
    longDescription:
      "Cold-ground from premium whole peppercorns to preserve piperine and volatile aromatic compounds, our black pepper powder delivers a bold, citrusy heat with remarkable depth. Freshly milled character sets it apart from ordinary pre-ground pepper — use generously on anything and everything.",
    tags: ["spicy"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#374151",
  },
  {
    productId: "Powder_Spice_Mace",
    id: "ps-mace",
    slug: "mace-powder",
    name: "Mace Powder",
    category: "powder-spices",
    tagline: "Nutmeg's warmer, more delicate sister",
    description:
      "Nutmeg's warm, slightly sweeter sister — complex, aromatic, and delicately refined.",
    longDescription:
      "Mace powder, ground from the lacy aril surrounding the nutmeg seed, offers a warmer, sweeter, and more delicate character than nutmeg itself. Highly prized in European baking and Indian meat preparations, it adds an elusive floral complexity that elevates spice blends, béchamel, and desserts.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#EA580C",
  },
  {
    productId: "Powder_Spice_Nutmeg",
    id: "ps-nutmeg",
    slug: "nutmeg-powder",
    name: "Nutmeg Powder",
    category: "powder-spices",
    tagline: "Warm, sweet, transforms béchamel and desserts",
    description:
      "Warm, sweet, and deeply spicy — transforms béchamel, desserts, and festive drinks.",
    longDescription:
      "Freshly ground nutmeg has a vibrant warmth and a sweet, spicy depth that is utterly different from pre-packaged powder. Our cold-milled nutmeg preserves all the essential oils for a complex, layered character — indispensable in béchamel sauce, rice pudding, mulled wine, and festive baking.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#92400E",
  },
  {
    productId: "Powder_Spice_Greater_Galangal",
    id: "ps-greater-galangal",
    slug: "greater-galangal",
    name: "Greater Galangal",
    category: "powder-spices",
    tagline: "Sharp, citrusy with pine notes, Southeast Asian essential",
    description:
      "Sharp and citrusy with pine-like notes — essential to Southeast Asian cuisine.",
    longDescription:
      "Greater galangal powder carries a sharp, citrusy heat with distinctive pine and camphor notes that differentiate it clearly from regular ginger. An essential flavor in Thai curries, Indonesian rendang, and Malay spice blends, it adds a unique, complex warmth that no substitute can replicate.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#A16207",
  },
  {
    productId: "Powder_Spice_Garlic",
    id: "ps-garlic",
    slug: "garlic-powder",
    name: "Garlic Powder",
    category: "powder-spices",
    tagline: "Rich, savory, pure garlic without moisture",
    description:
      "Rich, savory, and concentrated — pure garlic intensity without the moisture.",
    longDescription:
      "Ground from premium dehydrated garlic bulbs, our garlic powder delivers concentrated, savory depth without the moisture or perishability of fresh garlic. It disperses evenly in dry rubs, spice blends, and sauces for a consistent, bold garlic character — essential in every well-stocked spice pantry.",
    tags: ["earthy"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#78716C",
  },
  {
    productId: "Powder_Spice_Dill_Seeds",
    id: "ps-dill-seeds",
    slug: "dill-seeds-powder",
    name: "Dill Seeds Powder",
    category: "powder-spices",
    tagline: "Fresh, herbal, brightens pickles and dressings",
    description:
      "Fresh, herbal, and anise-like — brightens pickling brines and salad dressings.",
    longDescription:
      "Ground from whole dill seeds, this powder captures a clean, herbal freshness with gentle anise warmth and a cooling finish. It disperses flavor more rapidly than whole seeds — ideal for quick pickle brines, compound butters, creamy sauces, and spice rubs where immediate flavor is needed.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#4D7C0F",
  },
  {
    productId: "Powder_Spice_Cinnamon",
    id: "ps-cinnamon",
    slug: "cinnamon-powder",
    name: "Cinnamon Powder",
    category: "powder-spices",
    tagline: "Warm, sweet, versatile from chai to desserts",
    description:
      "Warm, sweet, and delicately woody — versatile from chai to desserts.",
    longDescription:
      "Ground from true Ceylon cinnamon quills, our cinnamon powder has a delicate sweetness and a gentle warmth that is far more refined than cassia-based alternatives. This is the cinnamon that elevates rather than overwhelms — perfect for chai, oatmeal, cakes, tagines, and warming winter drinks.",
    tags: ["sweet"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#B45309",
  },
  {
    productId: "Powder_Spice_Clove",
    id: "ps-clove",
    slug: "clove-powder",
    name: "Clove Powder",
    category: "powder-spices",
    tagline: "Intensely aromatic, essential to garam masala",
    description:
      "Intensely aromatic with numbing warmth — complex and essential to garam masala.",
    longDescription:
      "Ground from premium whole clove buds, our clove powder carries a bold, numbing warmth and an intensely floral, almost sweet-spicy complexity. A cornerstone of garam masala and holiday spice blends, it adds a distinctive depth that is both warming and strangely cooling — a truly unique spice.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(4),
    images: imgs(4),
    color: "#292524",
  },
  {
    productId: "Powder_Spice_Cassia",
    id: "ps-cassia",
    slug: "cassia-powder",
    name: "Cassia Powder",
    category: "powder-spices",
    tagline: "Bold, robust cinnamon-like warmth",
    description:
      "Bold, robust cinnamon-like warmth with a deeper, more intense character.",
    longDescription:
      "Cassia powder delivers a bold, robust spiciness with a deep, lingering warmth that outlasts Ceylon cinnamon in long-cooked preparations. Its higher essential oil content makes it ideal for meat dishes, spice blends, mulled beverages, and any preparation where a powerful cinnamon character is desired.",
    tags: ["spicy", "sweet"],
    primaryImage: img(5),
    images: imgs(5),
    color: "#78350F",
  },
  {
    productId: "Powder_Spice_Asafoetida",
    id: "ps-asafoetida",
    slug: "asafoetida-powder",
    name: "Asafoetida Powder",
    category: "powder-spices",
    tagline: "Pungent raw, irreplaceable depth when cooked",
    description:
      "Pungent raw, transformative cooked — adds irreplaceable depth to vegetarian dishes.",
    longDescription:
      "Asafoetida powder disperses instantly in hot oil, releasing its remarkable umami depth — a savory, onion-garlic character that forms the invisible backbone of South Indian and Persian vegetarian cooking. The powder form provides consistent, even flavor with no chunks to bite into — just pure, transformative depth.",
    tags: ["aromatic"],
    primaryImage: img(0),
    images: imgs(0),
    color: "#A16207",
  },
  {
    productId: "Powder_Spice_Green_Cardamom",
    id: "ps-green-cardamom",
    slug: "cardamom-powder",
    name: "Green Cardamom Powder",
    category: "powder-spices",
    tagline: "Floral, sweet, the queen of spices ground fine",
    description:
      "Floral, sweet, and intensely aromatic — the queen of spices in its finest form.",
    longDescription:
      "Ground from hand-sorted, high-grade green cardamom pods, our cardamom powder bursts with a bright, floral sweetness and a complex eucalyptus-camphor finish. A tiny pinch transforms chai, sweets, biryanis, and coffee. Among the most aromatic spices in the world — use with intention and delight.",
    tags: ["sweet", "aromatic"],
    primaryImage: img(1),
    images: imgs(1),
    color: "#065F46",
  },
  {
    productId: "Powder_Spice_Ajwain",
    id: "ps-ajwain",
    slug: "ajwain-powder",
    name: "Ajwain Powder",
    category: "powder-spices",
    tagline: "Intense, thyme-like, powerful in small quantities",
    description:
      "Intense, thyme-like, and digestive — powerful in small quantities, deeply aromatic.",
    longDescription:
      "Ajwain powder concentrates the seed's bold, thyme-like intensity into an easily dispersible form. A classic digestive spice in Ayurveda, it adds a sharp, camphor-tinged heat to flatbreads, fritters, chutneys, and spice blends. Less is more — this is one of the most potent spices in the collection.",
    tags: ["spicy", "aromatic"],
    primaryImage: img(2),
    images: imgs(2),
    color: "#57534E",
  },
  {
    productId: "Powder_Spice_Bay_Leaves",
    id: "ps-bay-leaves",
    slug: "bay-leaves-powder",
    name: "Bay Leaves Powder",
    category: "powder-spices",
    tagline: "Herbal, floral, eucalyptus-like depth",
    description:
      "Herbal, slightly floral and eucalyptus-like — elevates slow-cooked broths and sauces.",
    longDescription:
      "Bay leaf powder disperses the herbal, eucalyptus-floral character of whole bay leaves instantly — no waiting for infusion, no removing the leaf at the end. It dissolves seamlessly into soups, stews, pasta sauces, and spice blends, imparting a subtle but distinctive Mediterranean herbal warmth.",
    tags: ["earthy", "aromatic"],
    primaryImage: img(3),
    images: imgs(3),
    color: "#166534",
  },
];

// ─── Aggregates & Helpers ─────────────────────────────────────────────────────

export const ALL_PRODUCTS: Product[] = [...WHOLE_SPICES, ...POWDER_SPICES];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return category === "whole-spices" ? WHOLE_SPICES : POWDER_SPICES;
}

export function getProductBySlug(
  category: ProductCategory,
  slug: string,
): Product | undefined {
  return getProductsByCategory(category).find((p) => p.slug === slug);
}

export function getProductById(productId: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.productId === productId);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const pool = getProductsByCategory(product.category).filter(
    (p) => p.slug !== product.slug,
  );
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
