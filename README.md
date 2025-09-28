# Create Anything – Monorepo (Web + Expo Mobile)

Bu depo, iki uygulamadan oluşan bir monorepoyu barındırır:

- `apps/web`: React Router + Vite tabanlı web uygulaması (Bun ile geliştirme önerilir)
- `apps/mobile`: Expo (React Native) mobil uygulaması (Android/iOS/Web)

Aşağıda yerel geliştirme, ortam değişkenleri, scriptler ve GitHub’a paylaşım (CI dâhil) için gerekli tüm ayarlar ve talimatlar yer alır.

## Geliştirme Önkoşulları

- Node.js 20+
- Bun (web için tavsiye edilir): https://bun.sh
- Android/iOS geliştirmesi için gerekli SDK ve araçlar (Expo dokümantasyonuna bakın)

## Kurulum

- Web (Bun ile):
  - Dizin: `apps/web`
  - Bağımlılıklar: `bun install`
  - Geliştirme: `bun run dev`

- Mobile (npm ile):
  - Dizin: `apps/mobile`
  - Bağımlılıklar: `npm install`
  - Başlat: `npm run start`
  - Android: `npm run android`
  - iOS (macOS’ta): `npm run ios`

## Ortam Değişkenleri

- Web için `.env` dosyasını `apps/web/.env` yoluna koyun. Örnek için `apps/web/.env.example` dosyasına bakın.
- Mobile için `.env` gerekiyorsa `apps/mobile/.env` oluşturun (şablon eklenmiştir: `apps/mobile/.env.example`). Expo Config Plugins veya `expo-constants` ile kullanabilirsiniz.

## Scriptler

- Web:
  - `dev`: Geliştirme sunucusu
  - `typecheck`: Tip kontrolü ve route typegen
  - `test`: Vitest testleri çalıştırma (CI zaten çalıştırır)

- Mobile:
  - `start`: Expo başlat
  - `web`: Expo web
  - `android`: Android derleme/çalıştırma
  - `ios`: iOS derleme/çalıştırma

## CI (GitHub Actions)

- `.github/workflows/ci.yml` ile hem web hem mobile için tip kontrolü ve test/patche doğrulaması yapılır.
- Web job’ı Bun ile çalışır ve `typecheck` + `vitest` koşar.
- Mobile job’ı Node 20 ile `tsc --noEmit` ve `patch-package --check` çalıştırır.

## Paylaşım (GitHub’a gönderim)

1. Bu klasörde bir Git deposu başlatın (eğer yoksa) ve uzak repoyu ekleyin.
2. Değişiklikleri commit’leyip `main` dalına push’layın. CI otomatik tetiklenecektir.

## Lisans

MIT Lisansı (bkz. `LICENSE`).

*** Notlar
- Web tarafında `bun.lock` mevcut; CI da Bun kullanır. İsterseniz Node/NPM’e geçmek için scriptleri ve CI’ı uyarlayabilirsiniz.
- Expo için EAS veya store yayın süreçleri bu depoya dâhil değildir; ihtiyaç halinde ayrı bir CI/CD pipeline eklenebilir.