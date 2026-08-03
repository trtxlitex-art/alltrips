// Edit this list to change what's for sale. `image` points at the real photo
// to display, under images/ (drop a file there with the matching name).
// `emoji` is only used as an automatic fallback — shown if `image` is
// missing or fails to load — so the page never breaks while photos are
// still being added.
//
// `variants` lists the types a shopper can pick from the "select options"
// popup (opened by clicking the product image). Each variant has its own
// price; mark exactly one `default: true` so the popup has a sensible
// starting selection. `price`/`compareAt` on the product itself are only
// used as the "from" price shown on the product card.
const PRODUCTS = [
  {
    id: "Nic Vapes",
    name: " geek bar - elfbar - lost Mary",
    category: "Smoke",
    price: 25.0,
    compareAt: 30.0,
    rating: { value: 5.0, count: 96 },
    image: "images/lostmary.jpg",
    
    color: "#2b2f36",
     variants: [
      
      { id: "40l", label: "lost-mary flavor", price: 25.0, default: true },
     
    ],
  },
  {
    id: "Crystal meth",
    name: "Crystal meth",
    category: "Crystals",
    price: 50.0,
    compareAt: 60.0,
    rating: { value: 4.9, count: 89 },
    image: "images/meth2.jpg",
  
    color: "#3a5a78",
       variants: [
      { id: "set-4", label: "1 gram", price: 50.0, default: true },
      
    ],
  },
  {
    id: "Crystal-molly",
    name: "Crystal-molly",
    category: "Crystals",
    price: 80.0,
    compareAt: 96.0,
    rating: { value: 5.0, count: 86 },
    image: "images/crystal molly.jpg",
    emoji: "🛏️",
    color: "#6b4f8a",
    description: "molly",
    variants: [
      { id: "grey", label: "Crystal molly 1g", price: 8.0, default: true },
      
    ],
  },
  {
    id: "buzzballs",
    name: "Buzzballs",
    category: "Drinks",
    price: 30.0,
    compareAt: 35.0,
    rating: { value: 4.8, count: 142 },
   image: "images/download.webp",
    color: "#1f6f5c",
    description: "buzzballs drink.",
    variants: [
      { id: "compact", label: "Buzzballs ", price: 30.0, default: true },
  
    ],
  },
  {
    id: "Beatbox",
    name: "Beatbox",
    category: "Drinks",
    price: 30.0,
    compareAt: 38.0,
    rating: { value: 5.0, count: 84 },
    image: "images/download.webp",
    emoji: "🥤",
    color: "#8a4b3a",
    description: " drinks.",
    variants: [
      { id: "18oz", label: "18oz", price: 30.0 },
     
    ],
  },
  {
    id: "Smirnnoff ICE",
    name: "Smirnnoff ICE",
    category: "Drinks",
    price: 30.0,
    compareAt: 34.0,
    rating: { value: 4.9, count: 57 },
    image: "images/shopping.webp",
    
    color: "#5a5a3a",
    description: "drinks",
    variants: [
     
      { id: "black", label: "smirnoff ice", price: 30.0 },

    ],
  },
  {
    id: "chocolate",
    name: "Chocolate",
    category: "Eddies",
    price: 30.0,
    compareAt: 33.0,
    rating: { value: 4.9, count: 63 },
    image: "images/chocolte.webp",
    emoji: "🧴",
    color: "#3a6b6b",
    description: "Chocolate",
    variants: [
      { id: "standard", label: "Standard", price: 30.0, default: true },
      { id: "large", label: "Large", price: 50.0 },
    ],
  },
  {
    id: "Gummies",
    name: "Gummies",
    category: "Eddies",
    price: 30.0,
    compareAt: 36.0,
    rating: { value: 4.7, count: 118 },
    image: "images/gummies.webp",
    emoji: "🔋",
    color: "#4a4a55",
    description: "Pocket-sized fast charger with USB-C and USB-A output.",
    variants: [
      { id: "10000", label: "Gummies", price: 30.0, default: true },
       ],
  },
];

// Shared markup for any product image slot (product card, options popup,
// cart line). Renders the real photo on top of the emoji fallback; if the
// photo is missing or fails to load, it hides itself and the emoji/color
// behind it shows through instead.
function productImageInnerHtml(p) {
  return `
    <span class="product-image-fallback">${p.emoji}</span>
    <img class="product-image-photo" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'" />`;
}
