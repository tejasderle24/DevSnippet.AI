export type AppTheme = {
  background: string;
  card: string;
  cardAlt: string;
  text: string;
  subText: string;
  mutedText: string;
  border: string;
  separator: string;
  input: string;
  primary: string;
  icon: string;
  success: string;
  danger: string;
  switchTrackOff: string;
  switchTrackOn: string;
  switchThumb: string;
};

export const darkTheme: AppTheme = {
  background: "#0A0A0C",
  card: "#121214",
  cardAlt: "#1C1C24",
  text: "#FFFFFF",
  subText: "#8E8E93",
  mutedText: "#636366",
  border: "#1C1C1E",
  separator: "#1C1C1E",
  input: "#121214",
  primary: "#5E5CE6",
  icon: "#A3A3A3",
  success: "#30D158",
  danger: "#FF453A",
  switchTrackOff: "#3A3A3C",
  switchTrackOn: "#5E5CE6",
  switchThumb: "#FFFFFF",
};

export const lightTheme: AppTheme = {
  background: "#F4F6FA",
  card: "#FFFFFF",
  cardAlt: "#EEF2FF",
  text: "#0F172A",
  subText: "#475569",
  mutedText: "#64748B",
  border: "#E2E8F0",
  separator: "#E2E8F0",
  input: "#FFFFFF",
  primary: "#5E5CE6",
  icon: "#64748B",
  success: "#16A34A",
  danger: "#DC2626",
  switchTrackOff: "#CBD5E1",
  switchTrackOn: "#5E5CE6",
  switchThumb: "#FFFFFF",
};
