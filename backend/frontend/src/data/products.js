// Central product data for Velcura - Official Doctor-Approved Data
export const products = [
  {
    id: 'oil-balance',
    slug: 'oil-balance',
    name: 'Oil Balance',
    fullName: 'Velcura Oil Balance Wipes',
    tagline: 'Makeup Removal + Sebum Control',
    skinType: 'Oily & Acne-Prone',
    keyIngredient: '4% Niacinamide',
    shortDesc: 'Regulates sebum production, reduces pore appearance, and calms inflammation.',
    description: "Doctor-approved formulation with 4% Niacinamide and Zinc PCA. Unlike traditional wipes that strip skin, Oil Balance actively regulates your skin's oil production while dissolving stubborn makeup. Perfect for maintaining a clear, matte complexion throughout the day.",
    benefits: [
      'Regulates sebum (oil) production',
      'Visibly reduces pore appearance',
      'Calms acne-related inflammation',
      'Non-comedogenic (won\'t clog pores)',
      'Infused with antibacterial Zinc PCA'
    ],
    formulation: [
      { name: 'Niacinamide', conc: '4%', role: 'Sebum regulation & oil control' },
      { name: 'Zinc PCA', conc: '0.5-1.0%', role: 'Antibacterial oil control booster' },
      { name: 'Witch Hazel Water', conc: '2%', role: 'Natural astringent & skin soothing' },
      { name: 'Panthenol (Pro-Vitamin B5)', conc: '1%', role: 'Moisturizing & soothing' }
    ],
    substrate: '70% Viscose / 30% Polyester Spunlace, 40 GSM',
    howToUse: 'Gently sweep across face, eyes, and lips using light circular motions. No rinsing required. Ideal for morning and evening routines.',
    image: '/oil-balance-v3.png',
    color: 'teal',
    accentColor: '#2D7D77',
    bgColor: '#EAF5F4',
    price: 499, // User to confirm
    mrp: 650,   // User to confirm
    count: 25,
    badge: 'Doctor Approved',
    tags: ['oily', 'niacinamide', 'acne'],
    rating: 5.0,
    reviews: 0,
  },
  {
    id: 'hydraglow',
    slug: 'hydraglow',
    name: 'HydraGlow',
    fullName: 'Velcura HydraGlow Wipes',
    tagline: 'Deep Hydration + Plumping',
    skinType: 'Dry & Dehydrated',
    keyIngredient: 'Hyaluronic Acid',
    shortDesc: 'Holds 1000x its weight in water for a dewy, plump feel.',
    description: "Formulated with 0.5% - 1% Hyaluronic Acid and Sweet Almond Oil. HydraGlow wipes provide deep dermal hydration while gently dissolving makeup. Leaving your skin feeling soft, nourished, and luminous — never dry or taut.",
    benefits: [
      'Provides immediate deep hydration',
      'Locks in moisture for a plump feel',
      'Nourishes with Sweet Almond Oil',
      'Alcohol-free and non-stripping',
      'Infused with antioxidant Vitamin E'
    ],
    formulation: [
      { name: 'Sodium Hyaluronate', conc: '0.5-1.0%', role: 'Deep hydration & plumping' },
      { name: 'Sweet Almond Oil', conc: '1%', role: 'Nourishing emollient' },
      { name: 'Panthenol', conc: '1%', role: 'Moisturizing & soothing' },
      { name: 'Glycerin', conc: '5%', role: 'Powerful humectant' }
    ],
    substrate: '70% Viscose / 30% Polyester Spunlace, 45 GSM',
    howToUse: 'Press gently against skin and sweep outward. Allow actives like HA to absorb. No need to rinse.',
    image: '/hydraglow-v3.png',
    color: 'cream',
    accentColor: '#8B6B3D',
    bgColor: '#FDF5E8',
    price: 499,
    mrp: 650,
    count: 25,
    badge: 'Hydration Hero',
    tags: ['dry', 'hyaluronic', 'glow'],
    rating: 5.0,
    reviews: 0,
  },
  {
    id: 'calm-skin',
    slug: 'calm-skin',
    name: 'Calm Skin',
    fullName: 'Velcura Calm Skin Wipes',
    tagline: 'Barrier Repair + Friction-Free',
    skinType: 'Sensitive & Reactive',
    keyIngredient: 'Ceramide Complex',
    shortDesc: 'Restores the lipid barrier and protects against environmental irritants.',
    description: "A minimalist, fragrance-free formula built on a foundation of Ceramide NP, AP, and EOP. Calm Skin wipes literally rebuild your skin's mortgage while cleansing. Designed to minimize friction and prevent redness.",
    benefits: [
      'Restores skin\'s natural lipid barrier',
      'Fragrance-Free & Alcohol-Free',
      'Soothes with Aloe and Licorice Root',
      'Minimalist formula (< 15 ingredients)',
      'Hypoallergenic & friction-free'
    ],
    formulation: [
      { name: 'Ceramide NP + AP + EOP', conc: '0.5-1.0%', role: 'Lipid barrier restoration' },
      { name: 'Aloe Leaf Juice', conc: '3%', role: 'Calming & soothing' },
      { name: 'Allantoin', conc: '0.5%', role: 'Skin repair & calming' },
      { name: 'Licorice Root Extract', conc: '0.5%', role: 'Anti-inflammatory' }
    ],
    substrate: '100% Viscose (Ultra-Soft), 40 GSM',
    howToUse: 'Gently press and glide — avoid rubbing. Specifically tested for use on highly sensitive skin around eyes and lips.',
    image: '/calm-skin-v3.png',
    color: 'lavender',
    accentColor: '#7B6B8A',
    bgColor: '#F4EFF8',
    price: 499,
    mrp: 650,
    count: 20,
    badge: 'Clinical Grade',
    tags: ['sensitive', 'ceramides', 'fragrance-free'],
    rating: 5.0,
    reviews: 0,
  }
];

export const ingredients = [
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    subtitle: 'Vitamin B3',
    description: "Doctor-approved for oil regulation. It interrupts pigment transfer, regulates sebaceous gland output, and stimulates natural ceramide synthesis.",
    scientificFact: 'Clinical studies show 4-5% Niacinamide reduces sebum excretion rate by up to 35% with regular use.',
    products: ['oil-balance'],
    icon: '⬡',
  },
  {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    subtitle: 'Sodium Hyaluronate',
    description: "A large sugar molecule that occurs naturally in skin tissues. Multi-weight HA provides hydration at different depths for a plumping effect.",
    scientificFact: 'Sodium Hyaluronate can hold up to 1000 times its own weight in water — the most effective humectant known in dermatology.',
    products: ['hydraglow'],
    icon: '◈',
  },
  {
    id: 'ceramide-complex',
    name: 'Ceramide Complex',
    subtitle: 'NP + AP + EOP',
    description: "Replenishing ceramides rebuilds the skin's mortgage (lipid pool), reducing transepidermal water loss and protecting against irritants.",
    scientificFact: 'Ceramides make up 50% of the skin\'s lipid matrix. Replenishing them is clinically validated to restore barrier function in reactive skin.',
    products: ['calm-skin'],
    icon: '⬜',
  }
];

export const reviews = [];
