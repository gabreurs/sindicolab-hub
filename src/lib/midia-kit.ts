export const CONTACTS = [
  { name: "Rafael", surname: "Bernardes", phone: "11 96084-1033", whatsapp: "5511960841033" },
  { name: "Mariana", surname: "Desimone", phone: "11 99155-8086", whatsapp: "5511991558086" },
] as const;

export const SITES = ["sindicolab.com", "condohuby.com.br"] as const;

export const waLink = (
  whatsapp: string,
  message = "Olá! Tenho interesse em patrocinar uma experiência CondoHuby.",
) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

export const mediaKitUrl =
  "https://drive.google.com/drive/folders/1lyJX7n5HCwv6zeYbxmcw9y8kC_rJAz0L?usp=sharing";
