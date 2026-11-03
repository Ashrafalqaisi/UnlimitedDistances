// EXPO_PUBLIC_* variables are inlined at build time. On a physical device use the PC's LAN address,
// for example EXPO_PUBLIC_API_URL=http://192.168.1.10:3000 in apps/mobile/.env
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
