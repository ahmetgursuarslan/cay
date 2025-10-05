# Çay — Monorepo (Web + Expo Mobile)

Çay, güvenli flört için pratik araçlar sunan bir uygulamadır. Mobil deneyimi temel alan benzer bir arayüzle web sürümü de mevcuttur.

- `apps/web`: React Router + Vite tabanlı web uygulaması (Tailwind, lucide ikonlar)
- `apps/mobile`: Expo (React Native) mobil uygulaması (Android/iOS/Web)

Özellikler (TR):
- Hızlı arama: İsim, numara veya sosyal profillerle temel araştırma
- Ters görsel arama: Profil fotoğraflarının kaynağını kontrol etme
- Kimlik doğrulama: Kişilerin gerçekliğini doğrulama akışları
- Suç kaydı kontrolü: Güvenli buluşma için risk göstergeleri
- Güvenlik ipuçları: Daha güvenli çevrim içi flört rehberi

Features (EN):
- Quick lookup: Search by name, phone, or social profiles
- Reverse image: Check if profile photos are authentic
- Identity verification flows
- Criminal record indicators for safety-minded dating
- Safety tips for online dating

## Türkçe

### Geliştirme Gereksinimleri
- Node.js 20+
- Bun (web için önerilir): https://bun.sh
- Android/iOS geliştirme araçları (Expo dokümantasyonu)

### Kurulum ve Çalıştırma
- Web (Bun):
  - Dizin: `apps/web`
  - Bağımlılıklar: `bun install`
  - Geliştirme: `bun run dev`
- Mobil (npm):
  - Dizin: `apps/mobile
  - Bağımlılıklar: `npm install`
  - Başlat: `npm run start`
  - Android: `npm run android`
  - iOS (macOS): `npm run ios`

### Ortam Değişkenleri
- Web: `apps/web/.env` (örnek: `apps/web/.env.example` varsa onu temel alın)
- Mobil: `apps/mobile/.env` (örnek: `apps/mobile/.env.example`)

### CI
- GitHub Actions (`.github/workflows/ci.yml`) ile web ve mobil için tip kontrol ve test doğrulamaları çalışır.

## English

### Requirements
- Node.js 20+
- Bun for web (recommended): https://bun.sh
- Android/iOS tooling (see Expo docs)

### Setup & Run
- Web (Bun):
  - Dir: `apps/web`
  - Install: `bun install`
  - Dev: `bun run dev`
- Mobile (npm):
  - Dir: `apps/mobile`
  - Install: `npm install`
  - Start: `npm run start`
  - Android: `npm run android`
  - iOS (macOS): `npm run ios`

### Environment
- Web: `apps/web/.env`
- Mobile: `apps/mobile/.env`

### License
MIT (see `LICENSE`).

