export const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Romance',
  'Adventure',
];

export const FILTER_GENRES = ['all', ...GENRES];

export type Genre = (typeof GENRES)[number];
