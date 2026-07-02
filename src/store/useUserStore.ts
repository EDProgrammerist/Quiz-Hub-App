import {create} from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

const POINTS_PER_LOCAL_RANK = 50;

const getLocalRankingFromPoints = (points: number) =>
  Math.floor(points / POINTS_PER_LOCAL_RANK);

type UserStore = {
  name: string;
  username: string;
  avatarUrl: string;
  ranking: number;
  points: number;
  totalQuizzesTaken: number;
  averageScore: number;
  highestScore: number;
  notificationsEnabled: boolean;
  soundEffectsEnabled: boolean;
  themeMode: ThemeMode;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  recordQuizResult: (score: number) => void;
  addPoints: (amount: number) => void;
};

const useUserStore = create<UserStore>(set => ({
  name: 'Isha',
  username: '@isha',
  avatarUrl:
    'https://st.depositphotos.com/1008402/58769/i/450/depositphotos_587692484-stock-illustration-illustration-smiling-woman-cartoon-close.jpg',
  ranking: 0,
  points: 0,
  totalQuizzesTaken: 0,
  averageScore: 0,
  highestScore: 0,
  notificationsEnabled: true,
  soundEffectsEnabled: true,
  themeMode: 'system',
  setName: name => set({name}),
  setUsername: username => set({username}),
  setAvatarUrl: avatarUrl => set({avatarUrl}),
  setThemeMode: themeMode => set({themeMode}),
  setNotificationsEnabled: notificationsEnabled => set({notificationsEnabled}),
  setSoundEffectsEnabled: soundEffectsEnabled => set({soundEffectsEnabled}),
  recordQuizResult: score =>
    set(state => {
      const safeScore = Number.isFinite(score)
        ? Math.min(10, Math.max(0, score))
        : 0;
      const totalQuizzesTaken = state.totalQuizzesTaken + 1;
      const totalScore = state.averageScore * state.totalQuizzesTaken + safeScore;

      return {
        totalQuizzesTaken,
        averageScore: Number((totalScore / totalQuizzesTaken).toFixed(1)),
        highestScore: Math.max(state.highestScore, safeScore),
      };
    }),
  addPoints: amount =>
    set(state => {
      const safeAmount = Number.isFinite(amount)
        ? Math.max(0, Math.floor(amount))
        : 0;
      const points = state.points + safeAmount;

      return {
        points,
        ranking: getLocalRankingFromPoints(points),
      };
    }),
}));

export default useUserStore;
