/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTheme = 'pastel' | 'brutalist';

export interface Project {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  category: 'trade' | 'collector' | 'service' | 'event' | 'guide';
  tags: string[];
  link: string;
  cutenessRating: number; // 1-5 hearts/stars
  iconName: string; // Lucide icon lookup name
  color: string; // Background color for the card accent
  status: 'completed' | 'ongoing' | 'idea';
}

export interface Skill {
  name: string;
  nameVi: string;
  level: number; // 0-100
  iconName: string;
  color: string;
  category: 'trading' | 'safety' | 'community' | 'business';
  cuteLabel: string;
  cuteLabelVi: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  avatarId: string; // e.g. "cat-1", "rabbit-2", "hamster-3"
  vibeEmoji: string; // e.g. "🌸", "⭐", "🐱", "✨"
  likes: number;
}
