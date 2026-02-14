"use client";

import { useState, useEffect } from "react";

export interface UserStats {
  totalGames: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
  lastCompletedDate?: string;
}

const DEFAULT_STATS: UserStats = {
  totalGames: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

export function useStats() {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    const savedStats = localStorage.getItem("acronymle-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem("acronymle-stats", JSON.stringify(newStats));
  };

  const recordGame = (date: string, isWin: boolean, guessCount: number) => {
    if (stats.lastCompletedDate === date) return;

    const newStats = { ...stats };
    newStats.totalGames += 1;
    newStats.lastCompletedDate = date;

    if (isWin) {
      newStats.wins += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.guessDistribution[guessCount] = (newStats.guessDistribution[guessCount] || 0) + 1;
    } else {
      newStats.currentStreak = 0;
    }

    saveStats(newStats);
  };

  return {
    stats,
    recordGame,
  };
}
