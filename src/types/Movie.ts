export interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  rating: number;
}

export type SortField = 'title' | 'genre' | 'releaseYear' | 'rating';
export type SortOrder = 'asc' | 'desc'; 