import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.student.app',
  appName: 'Öğrenci+',
  webDir: 'dist',
  // YENİ EKLENEN BÖLÜM
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Açılış ekranı 3 saniye görünecek
      launchAutoHide: true,
      backgroundColor: "#1e1b4b", // Görsel yüklenemezse görünecek arkaplan rengi
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false, // Yükleniyor animasyonunu gizle
    }
  }
};

export default config;