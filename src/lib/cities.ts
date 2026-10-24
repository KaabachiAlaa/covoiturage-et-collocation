export interface TunisianCity {
  slug: string
  name: string
  governorate: string
  latitude: number
  longitude: number
}

/**
 * The backend searches rides by GPS coordinates (10 km radius around start and end),
 * so each city carries its approximate centre coordinates.
 */
export const TUNISIAN_CITIES: TunisianCity[] = [
  { slug: "tunis", name: "Tunis", governorate: "Tunis", latitude: 36.8065, longitude: 10.1815 },
  { slug: "ariana", name: "Ariana", governorate: "Ariana", latitude: 36.8625, longitude: 10.1956 },
  { slug: "ben-arous", name: "Ben Arous", governorate: "Ben Arous", latitude: 36.7531, longitude: 10.2189 },
  { slug: "la-marsa", name: "La Marsa", governorate: "Tunis", latitude: 36.8782, longitude: 10.3247 },
  { slug: "manouba", name: "La Manouba", governorate: "Manouba", latitude: 36.8101, longitude: 10.0956 },
  { slug: "bizerte", name: "Bizerte", governorate: "Bizerte", latitude: 37.2744, longitude: 9.8739 },
  { slug: "nabeul", name: "Nabeul", governorate: "Nabeul", latitude: 36.4561, longitude: 10.7376 },
  { slug: "hammamet", name: "Hammamet", governorate: "Nabeul", latitude: 36.4, longitude: 10.6167 },
  { slug: "zaghouan", name: "Zaghouan", governorate: "Zaghouan", latitude: 36.4029, longitude: 10.1429 },
  { slug: "beja", name: "Béja", governorate: "Béja", latitude: 36.7256, longitude: 9.1817 },
  { slug: "jendouba", name: "Jendouba", governorate: "Jendouba", latitude: 36.5011, longitude: 8.7802 },
  { slug: "tabarka", name: "Tabarka", governorate: "Jendouba", latitude: 36.9544, longitude: 8.7581 },
  { slug: "le-kef", name: "Le Kef", governorate: "Le Kef", latitude: 36.1742, longitude: 8.7049 },
  { slug: "siliana", name: "Siliana", governorate: "Siliana", latitude: 36.0849, longitude: 9.3708 },
  { slug: "sousse", name: "Sousse", governorate: "Sousse", latitude: 35.8256, longitude: 10.6084 },
  { slug: "monastir", name: "Monastir", governorate: "Monastir", latitude: 35.7643, longitude: 10.8113 },
  { slug: "mahdia", name: "Mahdia", governorate: "Mahdia", latitude: 35.5047, longitude: 11.0622 },
  { slug: "kairouan", name: "Kairouan", governorate: "Kairouan", latitude: 35.6781, longitude: 10.0963 },
  { slug: "kasserine", name: "Kasserine", governorate: "Kasserine", latitude: 35.1676, longitude: 8.8365 },
  { slug: "sidi-bouzid", name: "Sidi Bouzid", governorate: "Sidi Bouzid", latitude: 35.0382, longitude: 9.4849 },
  { slug: "sfax", name: "Sfax", governorate: "Sfax", latitude: 34.7406, longitude: 10.7603 },
  { slug: "gafsa", name: "Gafsa", governorate: "Gafsa", latitude: 34.425, longitude: 8.7842 },
  { slug: "tozeur", name: "Tozeur", governorate: "Tozeur", latitude: 33.9197, longitude: 8.1335 },
  { slug: "kebili", name: "Kébili", governorate: "Kébili", latitude: 33.7044, longitude: 8.969 },
  { slug: "gabes", name: "Gabès", governorate: "Gabès", latitude: 33.8815, longitude: 10.0982 },
  { slug: "medenine", name: "Médenine", governorate: "Médenine", latitude: 33.3549, longitude: 10.5055 },
  { slug: "djerba", name: "Djerba", governorate: "Médenine", latitude: 33.8076, longitude: 10.8451 },
  { slug: "zarzis", name: "Zarzis", governorate: "Médenine", latitude: 33.5039, longitude: 11.1122 },
  { slug: "tataouine", name: "Tataouine", governorate: "Tataouine", latitude: 32.9297, longitude: 10.4518 },
]

export function findCity(slug?: string | null) {
  if (!slug) return undefined
  return TUNISIAN_CITIES.find((city) => city.slug === slug)
}

export function findCityByName(value?: string | null) {
  if (!value) return undefined
  const normalized = value.trim().toLocaleLowerCase("fr")
  return TUNISIAN_CITIES.find(
    (city) =>
      city.slug === normalized ||
      city.name.toLocaleLowerCase("fr") === normalized ||
      city.name.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
        normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  )
}
