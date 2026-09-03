import type { Farm, SeasonField } from "../types";

export const T = "+02:00"; // Europe/Amsterdam, CEST

// ── Farms & fields ───────────────────────────────────────────────────────────

export const farms: Farm[] = [
  { farmId: "bijovira-synthetic", name: "bi-jovira (synthetic)" },
  { farmId: "demo-acres", name: "Demo Acres (synthetic)" },
  { farmId: "noorderhof-synthetic", name: "Noorderhof (synthetic)" },
];

export const seasonFields: SeasonField[] = [
  {
    id: 1,
    farmId: "bijovira-synthetic",
    jaar: 2026,
    name: "de pompoen",
    cropNl: "pompoen",
  },
  {
    id: 2,
    farmId: "bijovira-synthetic",
    jaar: 2026,
    name: "uien noord",
    cropNl: "uien",
  },
  {
    id: 3,
    farmId: "bijovira-synthetic",
    jaar: 2026,
    name: "achter oost",
    cropNl: "wortelen",
  },
  {
    id: 4,
    farmId: "bijovira-synthetic",
    jaar: 2026,
    name: "voedselbos",
    cropNl: "fruitbos",
  },
  {
    id: 5,
    farmId: "bijovira-synthetic",
    jaar: 2026,
    name: "wegendijk",
    cropNl: "witlof",
  },
  {
    id: 11,
    farmId: "demo-acres",
    jaar: 2026,
    name: "veld A",
    cropNl: "aardappelen",
  },
  {
    id: 12,
    farmId: "demo-acres",
    jaar: 2026,
    name: "veld B",
    cropNl: "suikerbieten",
  },
  {
    id: 13,
    farmId: "demo-acres",
    jaar: 2026,
    name: "perceel 7",
    cropNl: "uien",
  },
  {
    id: 14,
    farmId: "demo-acres",
    jaar: 2026,
    name: "hommelhoek",
    cropNl: "boomteelt",
  },
  {
    id: 21,
    farmId: "noorderhof-synthetic",
    jaar: 2026,
    name: "noordvang",
    cropNl: "tarwe",
  },
  {
    id: 22,
    farmId: "noorderhof-synthetic",
    jaar: 2026,
    name: "zuidvang",
    cropNl: "gerst",
  },
  {
    id: 23,
    farmId: "noorderhof-synthetic",
    jaar: 2026,
    name: "bij het woonhuis",
    cropNl: "groente",
  },
  {
    id: 24,
    farmId: "noorderhof-synthetic",
    jaar: 2026,
    name: "achter de schuur",
    cropNl: "klaver",
  },
];
