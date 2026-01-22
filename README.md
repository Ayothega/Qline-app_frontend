# Qline App Frontend

A mobile application for the Qline Queue Management System, built with **Expo**, **React Native**, and **NativeWind**.

## 🚀 Features

- **Authentication**:
  - **Google OAuth**: Seamless "Continue with Google" flow using `expo-web-browser` and `expo-linking`.
  - **Local Auth**: Email/Password login and signup.
  - **Secure Storage**: Access tokens are securely stored on the device using `expo-secure-store`.
  - **Automatic Session**: API requests automatically include the `Authorization: Bearer` header.
- **UI/UX**:
  - **NativeWind**: Utility-first styling with Tailwind CSS classes.
  - **Modern Design**: Gradient branding, custom SVG logos, and polished components.
  - **File-based Routing**: Navigation managed by `expo-router`.

## 🛠️ Tech Stack

- **Core**: [Expo](https://expo.dev/) (SDK 52), [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for Native)
- **Auth**: `expo-auth-session`, `expo-secure-store`
- **Network**: Native `fetch` with auto-IP detection for backend connectivity.

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   The app automatically detects your backend URL:
   - **Physical Devices**: Attempts to connect to your computer's LAN IP via the Expo host configuration (must be on same Wi-Fi).
   - **Android Emulator**: Defaults to `10.0.2.2`.
   - **iOS Simulator**: Defaults to `localhost`.
   
   To override this, create a `.env` file (renaming `.env.example` if available) and set:
   ```env
   EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:8000
   ```

## 📱 Running the App

Start the development server:

```bash
npx expo start -c
```

- Press `a` for Android Emulator.
- Press `i` for iOS Simulator.
- Scan the QR code with **Expo Go** on your physical device.

## 🔧 Key Configurations

- **Deep Linking**: The app uses the `appfrontend://` scheme for OAuth redirects (e.g. `appfrontend://auth/callback`).
- **Google Auth Flow**:
  1. App opens system browser to Backend (`/auth/google`).
  2. Backend redirects to Google.
  3. Google redirects back to Backend (`/auth/google/callback`).
  4. Backend parses state, sees mobile request, and redirects to `appfrontend://auth/callback?token=XYZ`.
  5. App captures URL, extracts token, and saves it to SecureStore.
