export type InputParams = {
  pincode: string;
  landArea: number; // acres
  soilType: string;
  season: string;
  budget: number; // INR
};

export type Recommendation = {
  topCrops: string[]; // length up to 5
  estimatedBudget: string; // formatted range or value
  pesticide: string;
  advisories: string[];
};

// Dataset (5 sets)
const DATASET: Array<{ key: InputParams; value: Recommendation }> = [
  {
    key: { pincode: "682001", landArea: 1.5, soilType: "Laterite", season: "Monsoon", budget: 30000 },
    value: {
      topCrops: ["Rice (Paddy)", "Banana", "Coconut", "Tapioca", "Turmeric"],
      estimatedBudget: "₹25,000 – ₹35,000",
      pesticide: "Neem oil + Chlorantraniliprole",
      advisories: [
        "Ensure proper drainage during peak monsoon to prevent root rot.",
        "Use organic mulching to retain moisture and control weeds.",
        "Soil test every season to fine-tune NPK application.",
      ],
    },
  },
  {
    key: { pincode: "695001", landArea: 2, soilType: "Alluvial", season: "Rabi", budget: 50000 },
    value: {
      topCrops: ["Vegetables (Okra)", "Maize", "Groundnut", "Chili", "Cucumber"],
      estimatedBudget: "₹45,000 – ₹55,000",
      pesticide: "Imidacloprid (as per label) + Beauveria bassiana",
      advisories: [
        "Adopt crop rotation to maintain soil fertility.",
        "Install yellow sticky traps for sucking pests.",
        "Irrigate in the morning to reduce fungal outbreaks.",
      ],
    },
  },
  {
    key: { pincode: "673001", landArea: 1, soilType: "Sandy Loam", season: "Kharif", budget: 20000 },
    value: {
      topCrops: ["Sesame", "Millets", "Green Gram", "Cowpea", "Chili"],
      estimatedBudget: "₹18,000 – ₹22,000",
      pesticide: "Spinosad + Neem-based biopesticide",
      advisories: [
        "Use drought-tolerant varieties suitable for sandy loam.",
        "Apply farmyard manure to improve water holding capacity.",
        "Practice line sowing for uniform plant spacing.",
      ],
    },
  },
  {
    key: { pincode: "680001", landArea: 3, soilType: "Clay", season: "Summer", budget: 80000 },
    value: {
      topCrops: ["Sugarcane", "Paddy (Summer)", "Banana", "Yam", "Elephant Foot Yam"],
      estimatedBudget: "₹75,000 – ₹90,000",
      pesticide: "Emamectin benzoate + Copper oxychloride (fungal)",
      advisories: [
        "Level fields and manage cracks to reduce moisture loss.",
        "Use mulch/cover crops to reduce evaporation.",
        "Schedule irrigation based on evapotranspiration.",
      ],
    },
  },
  {
    key: { pincode: "686001", landArea: 2.5, soilType: "Peat", season: "Monsoon", budget: 60000 },
    value: {
      topCrops: ["Coconut", "Rubber (nursery)", "Banana", "Ginger", "Turmeric"],
      estimatedBudget: "₹55,000 – ₹65,000",
      pesticide: "Azadirachtin + Carbendazim (fungal)",
      advisories: [
        "Improve aeration and avoid waterlogging in peat soils.",
        "Apply lime if soil test indicates high acidity.",
        "Monitor for stem borer post-monsoon.",
      ],
    },
  },
];

// Helpers for tolerant matching
function normStr(v: string) {
  return v.trim().toLowerCase();
}
function nearlyEqual(a: number, b: number, eps = 1e-6) {
  return Math.abs(a - b) <= eps;
}

// API: match dataset after normalizing whitespace/casing and numeric tolerance
export function getRecommendation(input: InputParams): Recommendation | null {
  const normalized = {
    pincode: input.pincode.trim(),
    landArea: Number(input.landArea),
    soilType: input.soilType.trim(),
    season: input.season.trim(),
    budget: Number(input.budget),
  } satisfies InputParams;

  const match = DATASET.find(({ key }) => {
    const pincodeOk = normStr(key.pincode) === normStr(normalized.pincode);
    const soilOk = normStr(key.soilType) === normStr(normalized.soilType);
    const seasonOk = normStr(key.season) === normStr(normalized.season);
    // Tolerances: landArea within 0.05 acres; budget within ₹1000
    const landOk = nearlyEqual(key.landArea, normalized.landArea, 0.05);
    const budgetOk = Math.abs(key.budget - normalized.budget) <= 1000;
    return pincodeOk && soilOk && seasonOk && landOk && budgetOk;
  });
  return match ? match.value : null;
}

export function getDatasetSamples(): Array<InputParams> {
  return DATASET.map((d) => d.key);
}
