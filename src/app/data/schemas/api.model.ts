export interface ResultModel<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface ApiResponse {
  [key: string]: string;
  // films: string;
  // people: string;
  // planets: string;
  // species: string;
  // starships: string;
  // vehicles: string;
}
