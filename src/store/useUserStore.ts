import {create} from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

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
};

const useUserStore = create<UserStore>(set => ({
  name: 'Isha',
  username: '@isha',
  avatarUrl:
    'https://st.depositphotos.com/1008402/58769/i/450/depositphotos_587692484-stock-illustration-illustration-smiling-woman-cartoon-close.jpg',
  ranking: 358,
  points: 358,
  // Placeholder stats until a real quiz-completion flow records results.
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
        ? Math.min(100, Math.max(0, score))
        : 0;
      const totalQuizzesTaken = state.totalQuizzesTaken + 1;
      const totalScore = state.averageScore * state.totalQuizzesTaken + safeScore;

      return {
        totalQuizzesTaken,
        averageScore: Number((totalScore / totalQuizzesTaken).toFixed(1)),
        highestScore: Math.max(state.highestScore, safeScore),
      };
    }),
}));

export default useUserStore;
