// Edit these values to match your store.
const STORE_CONFIG = {
  storeName: "Alltrip",
  tagline: "Gear up for your next trip",
  contactEmail: "alltrips.ltd@gmail.com",
  currencySymbol: "$",

  crypto: {
    enabled: true,
    network: "Bitcoin (BTC)",
    address: "bc1qzg7gn9jj35uvtzcmfctqn9yvjmgvh89t84pq8e",
  },

  giftCard: {
    enabled: true,
    // Demo-only codes for local testing. Real redemption still needs manual
    // confirmation since this site has no backend / payment processor.
    validCodes: ["ALLTRIP10", "WELCOME20"],
  },

  announcement:
    "Free shipping on orders over $50 • 30-day returns • Support: alltrips.ltd@gmail.com",

  pinnedNote: {
    title: "Alltrips Support",
    body: '📢Orders to the USA, Netherlands, Germany, UK, Switzerland & Australia ship same-day and arrive within 24 hours via our local runners. Tracking is emailed on dispatch. Questions? Reach us any time at <a href="mailto:alltrips.ltd@gmail.com">alltrips.ltd@gmail.com</a> or check the FAQ below.',
  },

  testimonials: [
    { initials: "KR", flag: "🇨🇦", date: "Dec 1, 2025", rating: 5, text: "Backpack arrived in 4 days, great quality. Will buy again!" },
    { initials: "TB", flag: "🇬🇧", date: "Dec 14, 2025", rating: 5, text: "Packing cubes are a game changer for carry-on trips." },
    { initials: "LW", flag: "🇺🇸", date: "Jan 8, 2026", rating: 5, text: "Fast shipping to Texas. Support answered my question same day." },
    { initials: "JD", flag: "🇬🇧", date: "Jan 20, 2026", rating: 5, text: "Adapter works perfectly across 3 countries so far. Solid build." },
  ],

  faqs: [
    { q: "What payment methods do you accept?", a: "We accept crypto payments (address + QR code shown at checkout) and gift cards. Enter your details on the checkout page after adding items to your cart." },
    { q: "Is a tracking number included?", a: "Yes — once your payment is confirmed, we email a tracking number for every order." },
    { q: "How long does shipping take?", a: "Most orders ship within 1–2 business days and arrive within 5–10 business days depending on destination." },
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Delivery times vary by country." },
    { q: "What's your return policy?", a: "Unused items in original packaging can be returned within 30 days. Email us to start a return." },
    { q: "Do you offer bulk or wholesale orders?", a: "Yes — contact us with the products and quantities you need and we'll send a quote." },
  ],
};
