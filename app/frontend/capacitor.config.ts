import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mirrorduel.app',
  appName: 'Mirror Duel',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e293b',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'large',
      spinnerColor: '#3b82f6'
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1e293b'
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
