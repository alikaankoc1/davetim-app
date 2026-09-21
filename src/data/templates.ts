export const TEMPLATE_CATEGORIES = [
  { id: "dugun" as const, label: "Düğün" },
  { id: "nisan" as const, label: "Nişan" },
  { id: "kina" as const, label: "Kına" },
  { id: "sunnet" as const, label: "Sünnet" },
  { id: "dogumgunu" as const, label: "Doğum Günü" },
];

export type TemplateCategoryId = (typeof TEMPLATE_CATEGORIES)[number]["id"];

export const TEMPLATE_STYLES = [
  { id: "minimal", label: "Minimal" },
  { id: "luxury", label: "Lüks" },
  { id: "floral", label: "Floral" },
  { id: "vintage", label: "Vintage" },
  { id: "boho", label: "Boho" },
  { id: "traditional", label: "Geleneksel" },
  { id: "modern", label: "Modern" },
  { id: "party", label: "Parti" },
] as const;

export type TemplateStyleId = (typeof TEMPLATE_STYLES)[number]["id"];

export type BgTextureId =
  | "none"
  | "marble"
  | "paper"
  | "dark-gold"
  | "watercolor"
  | "stars"
  | "neon"
  | "linen"
  | "damask"
  | "petals"
  | "hearts-scatter";

export type FrameId =
  | "none"
  | "gold-foil"
  | "floral-corners"
  | "henna"
  | "geometric"
  | "crown-stars"
  | "balloons"
  | "ornate"
  | "minimal-line"
  | "eucalyptus"
  | "neon-glow"
  | "hearts"
  | "heart-balloons"
  | "roses"
  | "peony-bloom"
  | "wildflowers"
  | "confetti-hearts";

export type HeadingFontId =
  | "great-vibes"
  | "alex-brush"
  | "cinzel"
  | "cormorant"
  | "playfair"
  | "montserrat";

export type BodyFontId = "cormorant" | "montserrat" | "outfit" | "cinzel";

export type ButtonStyleId = "pill-gold" | "pill-light" | "outline" | "neon";

export type InvitationTemplate = {
  id: string;
  title: string;
  category: TemplateCategoryId;
  style: TemplateStyleId;
  sampleNames: string;
  sampleDate: string;
  eventLabel: string;
  bgGradient: string;
  bgColor: string;
  bgTexture: BgTextureId;
  frame: FrameId;
  fontPairing: {
    heading: HeadingFontId;
    body: BodyFontId;
  };
  accentColor: string;
  textColor: string;
  mutedColor: string;
  buttonStyle: ButtonStyleId;
  overlayOpacity?: number;
};

/** Legacy editor theme ids → new template ids */
export const LEGACY_THEME_MAP: Record<string, string> = {
  minimal: "klasik-mermer",
  luks: "gece-luksu",
  floral: "cicekli-bahce",
  geometrik: "altin-geometri",
};

export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: "gece-luksu",
    title: "Gece Lüksü",
    category: "dugun",
    style: "luxury",
    sampleNames: "Elif & Can",
    sampleDate: "12.09.2026",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(165deg, #1a0c0e 0%, #3d1a1f 42%, #1f1012 100%)",
    bgColor: "#2a1416",
    bgTexture: "dark-gold",
    frame: "gold-foil",
    fontPairing: { heading: "great-vibes", body: "cinzel" },
    accentColor: "#C9A36A",
    textColor: "#F6EEE3",
    mutedColor: "rgba(201,163,106,0.75)",
    buttonStyle: "pill-gold",
    overlayOpacity: 0.35,
  },
  {
    id: "cicekli-bahce",
    title: "Çiçekli Bahçe",
    category: "dugun",
    style: "boho",
    sampleNames: "Zeynep & Emre",
    sampleDate: "03.10.2026",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(180deg, #fbf3ea 0%, #f0d9c8 55%, #e8cbb8 100%)",
    bgColor: "#f7ebe0",
    bgTexture: "watercolor",
    frame: "floral-corners",
    fontPairing: { heading: "alex-brush", body: "cormorant" },
    accentColor: "#8B3A3A",
    textColor: "#3a241c",
    mutedColor: "rgba(139,58,58,0.7)",
    buttonStyle: "pill-light",
  },
  {
    id: "klasik-mermer",
    title: "Klasik Mermer",
    category: "dugun",
    style: "minimal",
    sampleNames: "Ali & Ayşe",
    sampleDate: "24.08.2026",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(160deg, #faf8f5 0%, #efe8df 50%, #e7ddd0 100%)",
    bgColor: "#f7f3ec",
    bgTexture: "marble",
    frame: "minimal-line",
    fontPairing: { heading: "cormorant", body: "montserrat" },
    accentColor: "#8B3A3A",
    textColor: "#2c221a",
    mutedColor: "rgba(44,34,26,0.55)",
    buttonStyle: "outline",
  },
  {
    id: "vintage-pembe",
    title: "Vintage Pembe",
    category: "dugun",
    style: "vintage",
    sampleNames: "Deniz & Ece",
    sampleDate: "18.07.2026",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(180deg, #f9f0ea 0%, #edd5d0 100%)",
    bgColor: "#f4e4de",
    bgTexture: "paper",
    frame: "ornate",
    fontPairing: { heading: "playfair", body: "cormorant" },
    accentColor: "#A45C5C",
    textColor: "#3d2a28",
    mutedColor: "rgba(164,92,92,0.7)",
    buttonStyle: "pill-light",
  },
  {
    id: "okaliptus-yesil",
    title: "Okaliptüs Yeşil",
    category: "nisan",
    style: "minimal",
    sampleNames: "Mert & Selin",
    sampleDate: "05.06.2026",
    eventLabel: "Nişan Töreni",
    bgGradient: "linear-gradient(165deg, #f4f7f2 0%, #e2ebe0 48%, #d4e0d2 100%)",
    bgColor: "#eef3ec",
    bgTexture: "linen",
    frame: "eucalyptus",
    fontPairing: { heading: "cormorant", body: "montserrat" },
    accentColor: "#5A7A5E",
    textColor: "#2a382c",
    mutedColor: "rgba(90,122,94,0.75)",
    buttonStyle: "outline",
  },
  {
    id: "altin-geometri",
    title: "Altın Geometri",
    category: "nisan",
    style: "modern",
    sampleNames: "Kaan & İrem",
    sampleDate: "21.06.2026",
    eventLabel: "Nişan Töreni",
    bgGradient: "linear-gradient(145deg, #f8f1e6 0%, #efe0c8 55%, #e8d4b0 100%)",
    bgColor: "#f3e8d6",
    bgTexture: "none",
    frame: "geometric",
    fontPairing: { heading: "cinzel", body: "montserrat" },
    accentColor: "#B8924A",
    textColor: "#2c2418",
    mutedColor: "rgba(184,146,74,0.8)",
    buttonStyle: "pill-gold",
  },
  {
    id: "sade-nisan",
    title: "Sade Nişan",
    category: "nisan",
    style: "minimal",
    sampleNames: "Burak & Duru",
    sampleDate: "14.05.2026",
    eventLabel: "Nişan Töreni",
    bgGradient: "linear-gradient(180deg, #fcfbf9 0%, #f5f0ea 100%)",
    bgColor: "#faf8f5",
    bgTexture: "paper",
    frame: "minimal-line",
    fontPairing: { heading: "playfair", body: "outfit" },
    accentColor: "#8B3A3A",
    textColor: "#2a221c",
    mutedColor: "rgba(42,34,28,0.5)",
    buttonStyle: "outline",
  },
  {
    id: "otantik-kirmizi",
    title: "Otantik Kırmızı",
    category: "kina",
    style: "traditional",
    sampleNames: "Melisa",
    sampleDate: "23.08.2026",
    eventLabel: "Kına Gecesi",
    bgGradient: "linear-gradient(160deg, #4a0e12 0%, #7a1c24 45%, #3a0c10 100%)",
    bgColor: "#5c141a",
    bgTexture: "damask",
    frame: "henna",
    fontPairing: { heading: "great-vibes", body: "cinzel" },
    accentColor: "#E8C07A",
    textColor: "#FBE8D0",
    mutedColor: "rgba(232,192,122,0.8)",
    buttonStyle: "pill-gold",
    overlayOpacity: 0.4,
  },
  {
    id: "kina-gulu",
    title: "Kına Gülü",
    category: "kina",
    style: "floral",
    sampleNames: "Defne",
    sampleDate: "11.09.2026",
    eventLabel: "Kına Gecesi",
    bgGradient: "linear-gradient(180deg, #f9ebe6 0%, #efcfc6 100%)",
    bgColor: "#f5ddd4",
    bgTexture: "watercolor",
    frame: "floral-corners",
    fontPairing: { heading: "alex-brush", body: "cormorant" },
    accentColor: "#9B2D3A",
    textColor: "#3a1c20",
    mutedColor: "rgba(155,45,58,0.7)",
    buttonStyle: "pill-light",
  },
  {
    id: "mavi-prens",
    title: "Mavi Prens",
    category: "sunnet",
    style: "modern",
    sampleNames: "Mehmet",
    sampleDate: "09.08.2026",
    eventLabel: "Sünnet Düğünü",
    bgGradient: "linear-gradient(165deg, #0c1a3a 0%, #1a3a6e 48%, #0e2248 100%)",
    bgColor: "#132850",
    bgTexture: "stars",
    frame: "crown-stars",
    fontPairing: { heading: "cinzel", body: "montserrat" },
    accentColor: "#E8D5A3",
    textColor: "#F0F4FF",
    mutedColor: "rgba(232,213,163,0.85)",
    buttonStyle: "pill-gold",
  },
  {
    id: "gokyuzu-cocuk",
    title: "Gökyüzü Çocuk",
    category: "sunnet",
    style: "boho",
    sampleNames: "Yusuf",
    sampleDate: "20.09.2026",
    eventLabel: "Sünnet Düğünü",
    bgGradient: "linear-gradient(180deg, #e8f2fb 0%, #cfe0f5 55%, #b8d0ef 100%)",
    bgColor: "#dceaf8",
    bgTexture: "watercolor",
    frame: "crown-stars",
    fontPairing: { heading: "cormorant", body: "montserrat" },
    accentColor: "#3A5F8A",
    textColor: "#1a2a40",
    mutedColor: "rgba(58,95,138,0.7)",
    buttonStyle: "pill-light",
  },
  {
    id: "neon-party",
    title: "Neon Party",
    category: "dogumgunu",
    style: "party",
    sampleNames: "Ada",
    sampleDate: "01.05.2026",
    eventLabel: "Doğum Günü",
    bgGradient: "linear-gradient(145deg, #12081f 0%, #2a1050 50%, #1a0830 100%)",
    bgColor: "#1a0a2e",
    bgTexture: "neon",
    frame: "neon-glow",
    fontPairing: { heading: "montserrat", body: "outfit" },
    accentColor: "#FF4FD8",
    textColor: "#FFFFFF",
    mutedColor: "rgba(120,255,220,0.85)",
    buttonStyle: "neon",
  },
  {
    id: "pastel-balonlar",
    title: "Pastel Balonlar",
    category: "dogumgunu",
    style: "party",
    sampleNames: "Lina",
    sampleDate: "08.04.2026",
    eventLabel: "Doğum Günü",
    bgGradient: "linear-gradient(180deg, #fff5f8 0%, #fde8f0 45%, #e8f4ff 100%)",
    bgColor: "#fdf0f5",
    bgTexture: "none",
    frame: "balloons",
    fontPairing: { heading: "great-vibes", body: "montserrat" },
    accentColor: "#D46A8C",
    textColor: "#3a2a32",
    mutedColor: "rgba(212,106,140,0.75)",
    buttonStyle: "pill-light",
  },
  {
    id: "minimalist-gold",
    title: "Minimalist Gold",
    category: "dogumgunu",
    style: "luxury",
    sampleNames: "Asya",
    sampleDate: "19.06.2026",
    eventLabel: "Doğum Günü",
    bgGradient: "linear-gradient(160deg, #1c1814 0%, #2e261e 50%, #1a1612 100%)",
    bgColor: "#221c16",
    bgTexture: "dark-gold",
    frame: "gold-foil",
    fontPairing: { heading: "cinzel", body: "montserrat" },
    accentColor: "#D4B06A",
    textColor: "#F5EDE0",
    mutedColor: "rgba(212,176,106,0.75)",
    buttonStyle: "pill-gold",
  },
  {
    id: "gokyuzu-pastel",
    title: "Gökkuşağı Pastel",
    category: "dogumgunu",
    style: "boho",
    sampleNames: "Kerem",
    sampleDate: "27.03.2026",
    eventLabel: "Doğum Günü",
    bgGradient:
      "linear-gradient(135deg, #fff0f3 0%, #fff5e6 35%, #eef8ff 70%, #f0fff4 100%)",
    bgColor: "#faf6f2",
    bgTexture: "watercolor",
    frame: "balloons",
    fontPairing: { heading: "alex-brush", body: "outfit" },
    accentColor: "#6B8FCE",
    textColor: "#2c2830",
    mutedColor: "rgba(107,143,206,0.75)",
    buttonStyle: "pill-light",
  },
  // —— ekstra çeşitler ——
  {
    id: "siyah-altin-gece",
    title: "Siyah Altın Gece",
    category: "dugun",
    style: "luxury",
    sampleNames: "Aylin & Baran",
    sampleDate: "15.11.2026",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(170deg, #0a0a0a 0%, #1a1612 50%, #0d0b09 100%)",
    bgColor: "#12100e",
    bgTexture: "dark-gold",
    frame: "gold-foil",
    fontPairing: { heading: "cinzel", body: "montserrat" },
    accentColor: "#D4AF37",
    textColor: "#F5F0E6",
    mutedColor: "rgba(212,175,55,0.75)",
    buttonStyle: "pill-gold",
    overlayOpacity: 0.3,
  },
  {
    id: "lavanta-ruya",
    title: "Lavanta Rüya",
    category: "dugun",
    style: "boho",
    sampleNames: "Melis & Arda",
    sampleDate: "22.05.2027",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(180deg, #f7f2fa 0%, #e8dcef 55%, #d9c8e4 100%)",
    bgColor: "#efe8f4",
    bgTexture: "watercolor",
    frame: "floral-corners",
    fontPairing: { heading: "great-vibes", body: "cormorant" },
    accentColor: "#7B5EA7",
    textColor: "#2e2438",
    mutedColor: "rgba(123,94,167,0.75)",
    buttonStyle: "pill-light",
  },
  {
    id: "sahil-sunset",
    title: "Sahil Sunset",
    category: "dugun",
    style: "vintage",
    sampleNames: "İpek & Ozan",
    sampleDate: "08.08.2027",
    eventLabel: "Düğün Daveti",
    bgGradient: "linear-gradient(160deg, #fff4ea 0%, #f5c9a8 45%, #e89b7a 100%)",
    bgColor: "#f8dcc8",
    bgTexture: "paper",
    frame: "ornate",
    fontPairing: { heading: "alex-brush", body: "montserrat" },
    accentColor: "#C45C3A",
    textColor: "#3a2418",
    mutedColor: "rgba(196,92,58,0.7)",
    buttonStyle: "pill-light",
  },
  {
    id: "nordic-beyaz",
    title: "Nordic Beyaz",
    category: "nisan",
    style: "minimal",
    sampleNames: "Ece & Emir",
    sampleDate: "12.03.2027",
    eventLabel: "Nişan Töreni",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #f4f6f8 100%)",
    bgColor: "#fafbfc",
    bgTexture: "linen",
    frame: "minimal-line",
    fontPairing: { heading: "montserrat", body: "outfit" },
    accentColor: "#4A5568",
    textColor: "#1a202c",
    mutedColor: "rgba(74,85,104,0.65)",
    buttonStyle: "outline",
  },
  {
    id: "bordo-kadife",
    title: "Bordo Kadife",
    category: "nisan",
    style: "luxury",
    sampleNames: "Selin & Kaan",
    sampleDate: "30.01.2027",
    eventLabel: "Nişan Töreni",
    bgGradient: "linear-gradient(165deg, #2c0e14 0%, #5c1a28 50%, #1f0a10 100%)",
    bgColor: "#3a121c",
    bgTexture: "dark-gold",
    frame: "ornate",
    fontPairing: { heading: "playfair", body: "cinzel" },
    accentColor: "#E0B87A",
    textColor: "#F8EDE0",
    mutedColor: "rgba(224,184,122,0.8)",
    buttonStyle: "pill-gold",
  },
  {
    id: "hint-isigi",
    title: "Hint Işığı",
    category: "kina",
    style: "traditional",
    sampleNames: "Zehra",
    sampleDate: "04.09.2026",
    eventLabel: "Kına Gecesi",
    bgGradient: "linear-gradient(150deg, #3d1808 0%, #8B3A1A 48%, #2a1006 100%)",
    bgColor: "#5a2410",
    bgTexture: "damask",
    frame: "henna",
    fontPairing: { heading: "alex-brush", body: "cinzel" },
    accentColor: "#F0C060",
    textColor: "#FFF0D8",
    mutedColor: "rgba(240,192,96,0.8)",
    buttonStyle: "pill-gold",
    overlayOpacity: 0.35,
  },
  {
    id: "gul-tozu",
    title: "Gül Tozu",
    category: "kina",
    style: "vintage",
    sampleNames: "Beren",
    sampleDate: "19.10.2026",
    eventLabel: "Kına Gecesi",
    bgGradient: "linear-gradient(180deg, #fdf6f4 0%, #f0d0cc 100%)",
    bgColor: "#f8e4e0",
    bgTexture: "paper",
    frame: "ornate",
    fontPairing: { heading: "great-vibes", body: "cormorant" },
    accentColor: "#B85C6A",
    textColor: "#3a2024",
    mutedColor: "rgba(184,92,106,0.75)",
    buttonStyle: "pill-light",
  },
  {
    id: "uzay-kahramani",
    title: "Uzay Kahramanı",
    category: "sunnet",
    style: "party",
    sampleNames: "Alp",
    sampleDate: "14.06.2027",
    eventLabel: "Sünnet Düğünü",
    bgGradient: "linear-gradient(160deg, #06061a 0%, #1a1040 50%, #0a0828 100%)",
    bgColor: "#100c2a",
    bgTexture: "stars",
    frame: "neon-glow",
    fontPairing: { heading: "montserrat", body: "outfit" },
    accentColor: "#7AE0FF",
    textColor: "#F0F8FF",
    mutedColor: "rgba(122,224,255,0.8)",
    buttonStyle: "neon",
  },
  {
    id: "orman-macera",
    title: "Orman Macera",
    category: "sunnet",
    style: "boho",
    sampleNames: "Deniz",
    sampleDate: "25.07.2027",
    eventLabel: "Sünnet Düğünü",
    bgGradient: "linear-gradient(165deg, #eef5e8 0%, #c8dbb8 55%, #a8c890 100%)",
    bgColor: "#d8e8c8",
    bgTexture: "linen",
    frame: "eucalyptus",
    fontPairing: { heading: "cormorant", body: "montserrat" },
    accentColor: "#4A6B3A",
    textColor: "#1e2e18",
    mutedColor: "rgba(74,107,58,0.75)",
    buttonStyle: "outline",
  },
  {
    id: "disco-glow",
    title: "Disco Glow",
    category: "dogumgunu",
    style: "party",
    sampleNames: "Ela",
    sampleDate: "11.12.2026",
    eventLabel: "Doğum Günü",
    bgGradient: "linear-gradient(135deg, #1a0530 0%, #4a1060 40%, #c02060 100%)",
    bgColor: "#2a0a40",
    bgTexture: "neon",
    frame: "neon-glow",
    fontPairing: { heading: "montserrat", body: "outfit" },
    accentColor: "#FFD060",
    textColor: "#FFFFFF",
    mutedColor: "rgba(255,208,96,0.85)",
    buttonStyle: "neon",
  },
  {
    id: "teddy-soft",
    title: "Teddy Soft",
    category: "dogumgunu",
    style: "vintage",
    sampleNames: "Mira",
    sampleDate: "03.02.2027",
    eventLabel: "Doğum Günü",
    bgGradient: "linear-gradient(180deg, #fffaf5 0%, #f5e6d4 100%)",
    bgColor: "#faf0e4",
    bgTexture: "paper",
    frame: "balloons",
    fontPairing: { heading: "great-vibes", body: "cormorant" },
    accentColor: "#C48A5A",
    textColor: "#3a2a1c",
    mutedColor: "rgba(196,138,90,0.75)",
    buttonStyle: "pill-light",
  },
];

export function getTemplateById(id: string | undefined | null) {
  if (!id) return INVITATION_TEMPLATES[0];
  const mapped = LEGACY_THEME_MAP[id] ?? id;
  return (
    INVITATION_TEMPLATES.find((template) => template.id === mapped) ??
    INVITATION_TEMPLATES[0]
  );
}

export function isTemplateId(value: string | undefined): value is string {
  if (!value) return false;
  const mapped = LEGACY_THEME_MAP[value] ?? value;
  return INVITATION_TEMPLATES.some((template) => template.id === mapped);
}

export function templatesByCategory(category: TemplateCategoryId) {
  return INVITATION_TEMPLATES.filter((template) => template.category === category);
}
