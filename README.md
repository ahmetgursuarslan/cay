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
 - Patch uyarıları: `apps/mobile/patches` içindeki patch’ler, bağımlılıklar minör/patche güncellendiğinde “version mismatch” uyarısı verebilir. Patch’ler doğru uygulanıyorsa sorun yoktur. Uyarıyı kaldırmak için:
   - İlgili paketi güncel sürüme karşı tekrar patch’leyin: `cd apps/mobile; npx patch-package <paket-adi>`
   - Alternatif: Patch dosya adını yeni sürüme göre yeniden adlandırın (içerik aynı kalır).

## Mobil Uygulama: Geçici "Manual Navigation" (expo-router bypass) Modu

Son yaşanan beyaz ekran / etkileşim kilitlenmesi sorunlarını izole etmek için `expo-router` şimdilik devre dışı bırakıldı ve aynı sağlayıcı (providers) zincirini kullanan manuel bir React Navigation kurulumuna geçildi.

### Mimari Özeti
```
apps/mobile/
  index.tsx            ← Giriş; USE_EXPO_ROUTER bayrağına göre yönlendiriyor
  src/manual/
    AppManual.tsx      ← Native Stack + Bottom Tabs (Home, Search vs.)
    ManualProviders.tsx← Fonts + Auth + Query + Splash gating
  src/app/             ← (expo-router dizin yapısı, şimdilik pasif)
```

### Geçiş Bayrağı
- `apps/mobile/index.tsx` içinde: `const USE_EXPO_ROUTER = false;`
- `false` iken manuel navigasyon (stabil mod) çalışır.
- `true` yapıldığında `expo-router/entry` tekrar yüklenir ve mevcut `src/app` yapısı devreye girer.

### Neden Bypass?
`expo-router` Stack aktif olduğunda (hatta minimum 1-2 ekranla) UI tamamen beyaza düşüyor, ancak hiçbir hata logsuz. Aynı ekranlar manuel React Navigation ile stabil çalıştığı için sorun router katmanında/entegrasyonında lokalize edildi.

### Manuel Modun Artıları
- Stabil ve etkileşim sorunları yok.
- Aynı auth / font / splash kontrol zincirini kullandığından iş mantığı değişmedi.
- Problemi kökten çözene kadar güvenli zemin sağlar.

### Router’ı Güvenli Şekilde Geri Getirme Planı
1. Bayrağı `true` yapın: `USE_EXPO_ROUTER = true`.
2. `src/app/_layout.(js|tsx)` dosyasında yalnızca tek bir ekran (ör: `index`) ve gerekirse boş bir tabs grubu bırakın.
3. Uygulamayı başlatın; beyaz ekran oluşursa hemen geri dönün ve aşağıdaki ek adımları deneyin.
4. Eğer render başarılıysa ikinci adım olarak `(tabs)` dizinini ekleyin fakat sadece 1 basit tab (ör: Home) bırakın.
5. Her ek ekranda (Search, Profile vb.) ekledikten sonra uygulamayı yeniden başlatıp test edin.
6. Sorun geri gelirse son eklenen ekranın bileşenlerini minimal (sadece `<View />`) hale getirerek hangi alt bileşenin tetiklediğini daraltın.

### Ek Tanılama İpuçları
- React 19 + expo-router 6 kombinasyonu henüz bazı kenar durumlarında sessiz rendering sorunları yaratabiliyor; kalıcı beyaz ekran sürerse geçici olarak React 18.2’e dönmeyi test edin.
- `expo start --clear` (veya metro cache temizliği) sonrasında tekrar deneyin.
- Patch’li paketlerin (özellikle `metro-runtime` veya jest transformları) router ile çakışmadığından emin olun. Bypass modunda çalışan ama router ile bozulan paketleri sırayla devre dışı bırakmayı deneyin.
- Global z-index / absolute overlay komponentleri (örn. tam ekran Pressable, GestureHandlerRootView yanlış konum) dokunmaları yutabilir; incremental geri ekleyin.

### Geri Bildirim / Sorun Kaydı
Router yeniden denenirken tespit edilen spesifik kombinasyon (ekran sayısı, yeni eklenen kütüphane, belirli bir hook vb.) beyaz ekran yaratıyorsa aşağıdaki bilgileri bir issue’da toplayın:
- Adımlar (hangi ekrandan sonra)
- Konsol log dizisi (boot sırası)
- Android logcat (varsa) / Xcode output
- React Native sürümü, Expo SDK, router sürümü

### Kalıcı Çözüm Hedefi
Router istikrarı sağlandığında:
1. Manuel dosyalar (`src/manual/*`) kaldırılabilir veya feature flag’li fallback olarak tutulabilir.
2. `USE_EXPO_ROUTER` bayrağı kalıcı olarak `true` yapılır ve isteğe bağlı olarak tamamen kaldırılır.
3. README’den bu bölüm “Tarihçe” altına taşınabilir.

---
Bu bölüm geçici debug / mimari kararların izlenebilirliğini sağlamak amacıyla eklendi. Sorun çözüldüğünde sadeleştirilebilir.