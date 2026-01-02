
export interface DayData {
  date: Date;
  isWeekend: boolean;
  landscapeDescription: string;
  imageUrl: string;
}

export interface LandscapeInfo {
  title: string;
  description: string;
  imageUrl?: string;
}
